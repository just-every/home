#!/usr/bin/env node
/**
 * Renders public/og-image.png (1200x630) from the real hero of a running
 * server: the page's first screen at the card's proportions (the header's
 * logo, the hero's headline, button, lists, notes and landscape), with
 * motion reduced, after its fonts and the landscape have loaded.
 *
 *   npm run dev -- -p 3328            (or npm run preview -- --port 3328)
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
// 1440 wide, at the card's 1200:630 proportions: the hero fits its canvas
// to the room under the header, so the whole hero is in the frame.
const context = await browser.newContext({
  viewport: { width: 1440, height: 756 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
});
const page = await context.newPage();
await page.goto(`${base}/`, { waitUntil: 'load' });
await page.waitForSelector('[data-hero] h1');
await page.evaluate(async () => {
  document.querySelector('nextjs-portal')?.remove();
  await document.fonts.ready;
  const landscape = document.querySelector('[data-hero] picture img');
  if (landscape && !landscape.complete) {
    await new Promise(done => {
      landscape.onload = done;
      landscape.onerror = done;
    });
  }
});

const png = await page.screenshot({ type: 'png' });
await browser.close();

const out = join(root, 'public/og-image.png');
await sharp(png)
  .resize(1200, 630)
  .png({ compressionLevel: 9, palette: false })
  .toFile(out);
console.log(`og image: ${out} (1200x630)`);
