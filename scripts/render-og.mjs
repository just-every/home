#!/usr/bin/env node
/**
 * Renders public/og-image.png (1200x630) from the real hero of a running
 * server: the page's own fonts, hero background, logo (the header's SVG, in
 * its own ink) and headline, "Every SaaS." over "For Free." in the muted ink,
 * with the box set's static render (public/landing/shelf/shelf-1440.webp,
 * made by scripts/render-shelf.mjs) on the right, sized to read at thumbnail
 * scale.
 *
 *   npm run dev -- -p 3328            (or next start -p 3328)
 *   node scripts/render-og.mjs [--base http://localhost:3328]
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const at = args.indexOf('--base');
const base = at >= 0 ? args[at + 1] : 'http://localhost:3328';

/** Playwright from the project, else from the global npm root (tooling only). */
async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    const globalRoot = execFileSync('npm', ['root', '-g'], {
      encoding: 'utf8',
    }).trim();
    for (const candidate of [
      join(globalRoot, 'playwright'),
      join(globalRoot, '@playwright/cli/node_modules/playwright'),
      join(globalRoot, '@playwright/test/node_modules/playwright'),
    ]) {
      if (existsSync(join(candidate, 'index.mjs')))
        return import(pathToFileURL(join(candidate, 'index.mjs')).href);
    }
    throw new Error(
      'Playwright not found: install it globally (npm i -g playwright) or in the project.'
    );
  }
}

const { chromium } = await loadPlaywright();
const sharp = require('sharp');
const browser = await chromium
  .launch({ channel: 'chrome' })
  .catch(() => chromium.launch());
const context = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
});
const page = await context.newPage();
await page.goto(`${base}/`, { waitUntil: 'load' });
// After hydration (the live shelf has drawn), so React leaves the card alone.
await page.waitForSelector('[data-shelf] [data-ready]', { timeout: 60000 });
await page.evaluate(() => document.fonts.ready);

// Keep the hero's own section (its background) and rebuild its contents as a
// card: the logo, the headline large, and the box set.
await page.evaluate(() => {
  const hero = document.querySelector('main section');
  const page = hero.closest('[id=top]');
  document.querySelector('nextjs-portal')?.remove();
  const heading = hero.querySelector('h1');
  const logo = document.querySelector('header a svg');
  const turn = heading.lastElementChild;

  const card = document.createElement('div');
  card.style.cssText = `position: fixed; inset: 0; z-index: 10; overflow: hidden;
    background: ${getComputedStyle(hero).backgroundImage};
    background-color: #f8f6fe;`;

  const mark = logo.cloneNode(true);
  mark.removeAttribute('class');
  mark.style.cssText = `position: absolute; left: 64px; top: 54px;
    height: 34px; width: auto; aspect-ratio: 800 / 151;
    color: ${getComputedStyle(logo).color};`;

  const title = document.createElement('div');
  title.innerHTML = 'Every SaaS.<br><span>For Free.</span>';
  title.setAttribute('aria-label', heading.textContent);
  title.style.cssText = `position: absolute; left: 60px; top: 220px;
    font-size: 100px; font-weight: 640; line-height: 1;
    letter-spacing: -0.035em; color: #17171d; white-space: nowrap;`;
  title.lastElementChild.style.color = getComputedStyle(turn).color;

  const shelf = document.createElement('img');
  shelf.src = '/landing/shelf/shelf-1440.webp';
  shelf.style.cssText = `position: absolute; left: 556px; top: 132px;
    width: 700px; height: auto;`;

  card.append(mark, title, shelf);
  // Inside the page wrapper, so the card inherits the page's fonts.
  page.append(card);
  return new Promise(done => (shelf.complete ? done() : (shelf.onload = done)));
});

const png = await page.screenshot({ type: 'png' });
await browser.close();

const out = join(root, 'public/og-image.png');
await sharp(png)
  .resize(1200, 630)
  .png({ compressionLevel: 9, palette: false })
  .toFile(out);
console.log(`og image: ${out} (1200x630)`);
