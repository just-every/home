#!/usr/bin/env node
/**
 * Renders public/og-image.png, the 1200x630 share image, from the real hero
 * of the built site: its dusk sky, the cloud raining dollar signs and coins
 * over "Your current stack", the sun over "To open source you own.", the
 * headline and the painted ground, as the page draws them (its own art,
 * rows, prices and fonts), with motion reduced so the weather is still.
 *
 * The page is laid out for the card before the shot (LAYOUT, below): the
 * header and the parts below the fold go, the wordmark joins the copy, and
 * the headline and the wordmark sit in the middle, so a square crop keeps
 * them. It is drawn at twice the card's size and scaled down.
 *
 *   npm run build
 *   node scripts/og-image.mjs                 (serves the build on a free port)
 *   node scripts/og-image.mjs --base <url>    (or uses a server already running)
 *   node scripts/og-image.mjs --out <file>    (writes somewhere else)
 */
import { execFileSync, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const require = createRequire(import.meta.url);
const sharp = require('sharp');

const args = process.argv.slice(2);
const arg = name => {
  const at = args.indexOf(name);
  return at >= 0 ? args[at + 1] : undefined;
};
const out = resolve(arg('--out') ?? join(root, 'public/og-image.png'));

/** The card, and the page width it is laid out at (the hero's wide layout). */
const CARD = { width: 1200, height: 630 };
const PAGE = { width: 1280, height: 672 };

/**
 * The hero laid out for the card, over its own styles (hero.module.css),
 * at PAGE's size. The shot below names each part it styles (data-og).
 */
const LAYOUT = String.raw`
header[data-og='header'],
[data-og='benefits'],
[data-og='note'],
[data-og='more'],
[data-og='reasons'] {
  display: none !important;
}

/* The hero's column fills the page less 24px a side, at its design's own
   sizes (a unit of 1px), down to the page's foot. */
section[data-og='top'] {
  --col: 1232px;
  --u: 1px;
  height: ${PAGE.height}px;
  padding-top: 0;
  overflow: hidden;
}

div[data-og='canvas'] {
  padding-top: 24px;
  column-gap: 30px;
}

div[data-og='intro'] {
  padding-top: 28px;
}

div[data-og='brand'] {
  --logo-h: 34px;
  margin-bottom: 46px;
  color: #27244d;
}

h1[data-og='heading'] {
  margin-bottom: 22px;
  font-size: 84px;
}

/* Eight rows a card, so both stand whole above the ground. */
[data-og='stack'] li:nth-child(n + 9),
[data-og='own'] li:nth-child(n + 9) {
  display: none;
}

/* The painted ground along the card's foot, under the cards. */
img[data-og='ground'] {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 240px;
  margin: 0;
}
`;

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

const freePort = () =>
  new Promise((done, fail) => {
    const probe = createServer();
    probe.on('error', fail);
    probe.listen(0, () => {
      const { port } = probe.address();
      probe.close(() => done(port));
    });
  });

/** Serves the existing build with `next start`, until it answers. */
async function serveBuild() {
  if (!existsSync(join(root, '.next/BUILD_ID')))
    throw new Error('No build found: run `npm run build` first.');
  const port = await freePort();
  const server = spawn(
    join(root, 'node_modules/.bin/next'),
    ['start', '-p', String(port)],
    { cwd: root, stdio: 'ignore' }
  );
  const base = `http://localhost:${port}`;
  for (let tries = 0; tries < 120; tries++) {
    if (server.exitCode !== null)
      throw new Error(`next start exited (${server.exitCode}).`);
    try {
      if ((await fetch(base)).ok) return { base, server };
    } catch {
      // Not listening yet.
    }
    await new Promise(done => setTimeout(done, 250));
  }
  server.kill();
  throw new Error('next start did not answer in 30 seconds.');
}

const served = arg('--base') ? null : await serveBuild();
const base = arg('--base') ?? served.base;

const { chromium } = await loadPlaywright();
const browser = await chromium
  .launch({ channel: 'chrome' })
  .catch(() => chromium.launch());

try {
  const context = await browser.newContext({
    viewport: PAGE,
    // Twice the card's pixels, scaled down below.
    deviceScaleFactor: (CARD.width * 2) / PAGE.width,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: 'load' });
  await page.waitForSelector('#hero-heading');
  await page.evaluate(css => {
    document.querySelector('nextjs-portal')?.remove();

    /** The hero's parts, found by its markup (Hero.tsx), each named for LAYOUT. */
    const need = (element, name) => {
      if (!element) throw new Error(`The hero has no ${name}.`);
      element.dataset.og = name;
      return element;
    };
    const top = need(
      document.querySelector('section[aria-labelledby="hero-heading"]'),
      'top'
    );
    const heading = need(top.querySelector('#hero-heading'), 'heading');
    const intro = need(heading.parentElement, 'intro');
    need(top.firstElementChild, 'canvas');
    // The description's first sentence, the one that says what the
    // switch is; its counts change with every release.
    const description = need(heading.nextElementSibling, 'description');
    description.textContent = description.textContent.match(/^.+?\./)[0];
    need(intro.querySelector(':scope > ul'), 'benefits');
    const stack = need(top.querySelector('#hero-stack'), 'stack');
    const own = need(
      top.querySelector('section[aria-labelledby="hero-own-heading"]'),
      'own'
    );
    need(stack.nextElementSibling, 'note');
    need(own.nextElementSibling, 'note');
    need(own.querySelector(':scope > a'), 'more');
    need(top.querySelector(':scope > ul'), 'reasons');
    need(top.querySelector(':scope > img'), 'ground');

    // The header's wordmark joins the copy, over the headline.
    const header = need(document.querySelector('header'), 'header');
    const brand = document.createElement('div');
    brand.dataset.og = 'brand';
    brand.append(
      need(
        header.querySelector('svg[aria-label="JustEvery"]'),
        'wordmark'
      ).cloneNode(true)
    );
    intro.prepend(brand);

    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
  }, LAYOUT);

  // Fonts, and the hero's art (it loads lazily), before the shot.
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = [...document.querySelectorAll('[data-og="top"] img')];
    for (const image of images) image.loading = 'eager';
    await Promise.all(
      images.map(image =>
        image.complete
          ? null
          : new Promise(done => {
              image.onload = done;
              image.onerror = done;
            })
      )
    );
  });

  const png = await page.screenshot({
    type: 'png',
    clip: { x: 0, y: 0, ...PAGE },
  });
  await sharp(png)
    .resize(CARD.width, CARD.height, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`og image: ${out} (${CARD.width}x${CARD.height})`);
} finally {
  await browser.close();
  served?.server.kill();
}
