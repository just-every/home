#!/usr/bin/env node
/**
 * Renders the three.js box set (src/components/variants/label/shelf3d) from a
 * running server with Playwright:
 *
 *   - the static render the component shows as its poster:
 *     public/variants/label/shelf3d/shelf-1440.webp (749x430 at 2x) and shelf-800.webp
 *   - growth shots at 14, 30 and 60 volumes, page shots at 1440, 768 and 390,
 *     and the 1440 render side by side with the approved art, into --shots
 *   - with --measure: time to first frame, frame cost, and that drawing stops
 *     offscreen and in a hidden tab
 *
 * The 30 and 60 sets are generated here, from the 14 real volumes plus
 * stand-ins, and injected into the review route; app code never makes them.
 *
 *   npm run dev -- -p 3327            (or next start -p 3327)
 *   node scripts/render-shelf.mjs [--base http://localhost:3327] [--page /v/label/shelf]
 *        [--shots DIR] [--only poster,growth,pages,measure] [--measure]
 *
 * --page may point at any page with the shelf in it (e.g. /v/label once the
 * hero uses it), so the poster matches the volumes that page passes.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const at = args.indexOf(`--${name}`);
  return at >= 0 && args[at + 1] && !args[at + 1].startsWith('--')
    ? args[at + 1]
    : fallback;
};
const base = flag('base', 'http://localhost:3327');
const pagePath = flag('page', '/v/label/shelf');
const shots = resolve(
  flag(
    'shots',
    join(
      process.env.HOME ?? '.',
      '.orchestrator/evidence/home/landing/shots/shelf3d'
    )
  )
);
const posterDir = join(root, 'public/variants/label/shelf3d');
const only = new Set(
  (
    flag('only', 'poster,growth,pages') +
    (args.includes('--measure') ? ',measure' : '')
  ).split(',')
);

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

async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    return chromium.launch();
  }
}

const browser = await launch();
mkdirSync(shots, { recursive: true });
mkdirSync(posterDir, { recursive: true });

const errors = [];
async function openPage({ width, height, reduced = true, inject = null }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  });
  if (inject)
    await context.addInitScript(spec => (window.__shelfReview = spec), inject);
  const page = await context.newPage();
  page.on('console', message => {
    if (message.type() === 'error')
      errors.push(`${width}px: ${message.text()}`);
  });
  page.on('pageerror', error => errors.push(`${width}px: ${error.message}`));
  return { context, page };
}

async function waitForShelf(page, count) {
  await page.waitForFunction(
    expected =>
      window.__ready === true &&
      (!expected || window.__shelf?.count === expected),
    count,
    { timeout: 60000 }
  );
  // Two frames, so the crossfade (instant under reduced motion) has settled.
  await page.evaluate(
    () =>
      new Promise(done =>
        requestAnimationFrame(() => requestAnimationFrame(done))
      )
  );
}

/** The real volumes as the page has them. */
async function realSet() {
  const { context, page } = await openPage({ width: 1440, height: 900 });
  await page.goto(base + pagePath, { waitUntil: 'load' });
  await waitForShelf(page);
  const spec = await page.evaluate(() => window.__shelfSpec);
  await context.close();
  return spec;
}

/** Stand-in volumes 15 and up: tooling only, never shipped. */
const standInNames = [
  'Atlas',
  'Birch',
  'Cove',
  'Ember',
  'Fable',
  'Grove',
  'Harbor',
  'Iris',
  'Juniper',
  'Kite',
  'Ledger',
  'Meadow',
  'North',
  'Opal',
  'Pier',
  'Quill',
  'Reed',
  'Sable',
  'Tide',
  'Umber',
  'Vale',
  'Willow',
  'Yarrow',
  'Zephyr',
  'Arbor',
  'Beacon Hill',
  'Cinder',
  'Delta Way',
  'Echo',
  'Flint',
  'Garnet',
  'Heron',
  'Indigo',
  'Jasper',
  'Kestrel',
  'Linden',
  'Marlow',
  'Nimbus',
  'Orchard',
  'Plume',
  'Quarry',
  'Rowan',
  'Sorrel',
  'Thistle',
  'Upland',
  'Verge',
];

function pastelFor(index) {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue.toFixed(0)} 70% 82%)`;
}

function hslToHex(hsl) {
  const [h, s, l] = hsl.match(/[\d.]+/g).map(Number);
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = n => {
    const k = (n + h / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function grow(spec, count) {
  const volumes = spec.volumes.slice(0, count);
  for (let i = volumes.length; i < count; i += 1) {
    const source = spec.volumes[i % spec.volumes.length];
    volumes.push({
      slug: `stand-in-${i + 1}`,
      name: standInNames[(i - spec.volumes.length) % standInNames.length],
      number: String(i + 1).padStart(2, '0'),
      colour: hslToHex(pastelFor(i)),
      ink: '#17171d',
      mark: source.mark,
      tagline: null,
      href: '#',
    });
  }
  return { volumes, featured: spec.featured };
}

async function poster() {
  const { context, page } = await openPage({ width: 1440, height: 900 });
  await page.goto(base + pagePath, { waitUntil: 'load' });
  await waitForShelf(page);
  await page.evaluate(() => {
    document.documentElement.dataset.capture = '';
    document.documentElement.style.background = 'transparent';
    document.body.style.background = 'transparent';
  });
  const png = await page
    .locator('[data-shelf]')
    .first()
    .screenshot({ omitBackground: true });
  const meta = await sharp(png).metadata();
  await sharp(png)
    .webp({ quality: 82, alphaQuality: 80, effort: 6 })
    .toFile(join(posterDir, 'shelf-1440.webp'));
  await sharp(png)
    .resize({ width: 800 })
    .webp({ quality: 82, alphaQuality: 80, effort: 6 })
    .toFile(join(posterDir, 'shelf-800.webp'));
  await sharp(png).toFile(join(shots, 'shelf-1440-transparent.png'));
  console.log(
    `poster: ${meta.width}x${meta.height} -> public/variants/label/shelf3d/shelf-1440.webp, shelf-800.webp`
  );
  await context.close();
  return png;
}

async function sideBySide(render) {
  const { width, height } = await sharp(render).metadata();
  const art = await sharp(join(root, 'public/variants/label/box-set.webp'))
    .resize({ width })
    .png()
    .toBuffer();
  const artHeight = (await sharp(art).metadata()).height;
  const flat = await sharp({
    create: { width, height, channels: 4, background: '#f6f4fd' },
  })
    .composite([{ input: render }])
    .png()
    .toBuffer();
  const gap = 24;
  await sharp({
    create: {
      width: width * 2 + gap,
      height: Math.max(artHeight, height),
      channels: 4,
      background: '#ffffff',
    },
  })
    .composite([
      { input: art, left: 0, top: 0 },
      { input: flat, left: width + gap, top: 0 },
    ])
    .png()
    .toFile(join(shots, 'side-by-side-1440.png'));
  console.log(
    `side by side: ${join(shots, 'side-by-side-1440.png')} (art left, render right)`
  );
}

async function growth(spec) {
  for (const count of [14, 30, 60]) {
    const inject = count === spec.volumes.length ? null : grow(spec, count);
    const { context, page } = await openPage({
      width: 1440,
      height: 900,
      inject,
    });
    await page.goto(base + pagePath, { waitUntil: 'load' });
    await waitForShelf(page, count);
    await page
      .locator('section')
      .first()
      .screenshot({ path: join(shots, `growth-${count}.png`) });
    await page
      .locator('[data-shelf]')
      .first()
      .screenshot({ path: join(shots, `growth-${count}-shelf.png`) });
    console.log(`growth ${count}: ${join(shots, `growth-${count}.png`)}`);
    await context.close();
  }
}

async function pages() {
  for (const [width, height] of [
    [1440, 900],
    [768, 1024],
    [390, 844],
  ]) {
    const { context, page } = await openPage({ width, height });
    await page.goto(base + pagePath, { waitUntil: 'load' });
    if (width >= 768) await waitForShelf(page);
    else await page.waitForLoadState('networkidle');
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      live: Boolean(document.querySelector('[data-shelf] canvas')),
      poster: Boolean(document.querySelector('[data-shelf] img')?.complete),
    }));
    await page.screenshot({ path: join(shots, `page-${width}.png`) });
    console.log(
      `page ${width}: ${join(shots, `page-${width}.png`)} ${JSON.stringify(layout)}`
    );
    await context.close();
  }
}

async function measure() {
  const { context, page } = await openPage({
    width: 1440,
    height: 900,
    reduced: false,
  });
  const scripts = [];
  page.on('requestfinished', async request => {
    if (request.resourceType() !== 'script') return;
    const sizes = await request.sizes();
    scripts.push({
      url: request.url().replace(base, ''),
      bytes: sizes.responseBodySize,
    });
  });
  await page.goto(base + pagePath, { waitUntil: 'load' });
  await waitForShelf(page);
  const first = await page.evaluate(() => {
    const stats = window.__shelf.stats();
    const paint =
      performance.getEntriesByName('first-contentful-paint')[0]?.startTime ??
      null;
    return { ...stats, fcp: paint };
  });
  // Idle animation: drift only, pointer still.
  await page.mouse.move(720, 300);
  await page.waitForTimeout(5000);
  const idle = await page.evaluate(() => window.__shelf.stats());
  const bench = await page.evaluate(() => window.__shelf.bench(240));

  const framesAt = () => page.evaluate(() => window.__shelf.stats().frames);
  // Scroll the shelf fully out of view (the review page is short, so pad it).
  await page.evaluate(() => {
    document.body.style.paddingBottom = '3000px';
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(600);
  const offA = await framesAt();
  await page.waitForTimeout(2000);
  const offB = await framesAt();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  const backA = await framesAt();
  await page.waitForTimeout(1000);
  const backB = await framesAt();

  // Hide the tab. Headless Chrome keeps background tabs "visible", so when
  // bringing another tab forward does not hide this one, signal it the way
  // the browser does: document.hidden plus a visibilitychange event.
  const other = await context.newPage();
  await other.goto('about:blank');
  await other.bringToFront();
  await page.waitForTimeout(300);
  let hidden = await page.evaluate(() => document.visibilityState);
  const simulated = hidden !== 'hidden';
  if (simulated) {
    hidden = await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get: () => true,
      });
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => 'hidden',
      });
      document.dispatchEvent(new Event('visibilitychange'));
      return document.visibilityState;
    });
  }
  await page.waitForTimeout(300);
  const hidA = await framesAt();
  await page.waitForTimeout(2000);
  const hidB = await framesAt();
  if (simulated) {
    await page.evaluate(() => {
      delete document.hidden;
      delete document.visibilityState;
      document.dispatchEvent(new Event('visibilitychange'));
    });
  }
  await page.bringToFront();
  await page.waitForTimeout(500);
  const resumeA = await framesAt();
  await page.waitForTimeout(1000);
  const resumeB = await framesAt();

  const gzipped = scripts.reduce((sum, script) => sum + script.bytes, 0);
  const three = scripts
    .filter(script => script.bytes > 0)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6);
  console.log(
    JSON.stringify(
      {
        firstFrame: {
          sinceNavigationMs: Math.round(first.firstFrameAt),
          sinceEngineStartMs: Math.round(first.firstFrameMs),
          firstContentfulPaintMs: first.fcp && Math.round(first.fcp),
        },
        idle: {
          frameIntervalMs: +idle.frameIntervalMs.toFixed(2),
          cpuDrawMs: +idle.drawMs.toFixed(2),
          gpuBoundFrameMs: +bench.toFixed(2),
          pixelRatio: idle.pixelRatio,
          size: idle.size,
        },
        offscreen: {
          framesWhileScrolledAway: offB - offA,
          framesAfterReturning: backB - backA,
        },
        hiddenTab: {
          visibilityState: hidden,
          simulated,
          framesWhileHidden: hidB - hidA,
          framesAfterShowing: resumeB - resumeA,
        },
        scripts: {
          count: scripts.length,
          transferredBytes: gzipped,
          largest: three,
        },
      },
      null,
      1
    )
  );
  await context.close();
}

if (only.has('poster') || only.has('growth')) {
  if (only.has('poster')) await sideBySide(await poster());
  if (only.has('growth')) await growth(await realSet());
}
if (only.has('pages')) await pages();
if (only.has('measure')) await measure();

await browser.close();
if (errors.length) {
  console.error(`console errors:\n${errors.join('\n')}`);
  process.exitCode = 1;
} else console.log('console errors: none');
