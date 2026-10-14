#!/usr/bin/env node
/**
 * Renders public/og-image.png (1200x630) from the real hero of a running
 * server: the page's own fonts, hero background, logo (the header's SVG, in
 * its own ink) and headline, "Unsubscribe from" over "just about
 * everything." in the muted ink, centred over the box set as the hero sets
 * it (the shelf's own room, plant and static render, made by
 * scripts/render-shelf.mjs), sized to read at thumbnail scale.
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
// card: the logo, the headline large and centred, and the box set below it.
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
    background-color: #f3f1fc;`;

  const mark = logo.cloneNode(true);
  mark.removeAttribute('class');
  mark.style.cssText = `position: absolute; left: 56px; top: 44px;
    height: 28px; width: auto; aspect-ratio: 800 / 151;
    color: ${getComputedStyle(logo).color};`;

  const title = document.createElement('div');
  title.innerHTML = 'Unsubscribe from<br><span>just about everything.</span>';
  title.setAttribute('aria-label', heading.textContent);
  title.style.cssText = `position: absolute; left: 0; right: 0; top: 84px;
    font-size: 86px; font-weight: 640; line-height: 1.02; text-align: center;
    letter-spacing: -0.035em; color: #17171d; white-space: nowrap;`;
  title.lastElementChild.style.color = getComputedStyle(turn).color;

  // The hero's shelf as it stands on the page (its room, plant and static
  // render), at the card's own size; the live scene is left out.
  const slot = 700;
  const shelf = hero.querySelector('[data-shelf]').cloneNode(true);
  shelf.querySelector('canvas')?.parentElement.remove();
  shelf.querySelector('ul')?.remove();
  shelf.style.cssText = `position: absolute; left: ${(1200 - slot) / 2 - 56}px;
    top: 278px; width: ${slot}px; --shelf-room: 140px;`;
  const poster = shelf.querySelector('img');
  poster.removeAttribute('srcset');
  poster.removeAttribute('sizes');
  poster.src = '/landing/shelf/shelf-1440.webp';
  poster.style.cssText = 'opacity: 1; visibility: visible;';

  card.append(mark, title, shelf);
  // Inside the page wrapper, so the card inherits the page's fonts.
  page.append(card);
  return new Promise(done =>
    poster.complete ? done() : (poster.onload = done)
  );
});

const png = await page.screenshot({ type: 'png' });
await browser.close();

const out = join(root, 'public/og-image.png');
await sharp(png)
  .resize(1200, 630)
  .png({ compressionLevel: 9, palette: false })
  .toFile(out);
console.log(`og image: ${out} (1200x630)`);
