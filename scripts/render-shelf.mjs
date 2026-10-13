#!/usr/bin/env node
/**
 * Renders the three.js box set (src/components/landing/shelf3d) from a
 * running server with Playwright:
 *
 *   - the static render the hero shows as its poster, taken from the real page
 *     with its own volumes, read from the canvas at 1440 (2x):
 *     public/landing/shelf/shelf-1440.webp (1498x860) and shelf-800.webp
 *   - the poster and the live scene in place on the page at 1440, side by side
 *     with their difference measured, so the crossfade can be seen not to shift
 *   - growth shots at 14, 30 and 60 volumes (needs `next dev`: they use the
 *     dev-only /shelf-review page), and page shots at 1440, 768 and 390,
 *     into --shots
 *   - with --measure: time to first frame, frame cost, and that drawing stops
 *     offscreen and in a hidden tab
 *
 * The 30 and 60 sets are generated here, from the real volumes plus
 * stand-ins, and injected into /shelf-review; app code never makes them.
 *
 *   npm run dev -- -p 3328
 *   node scripts/render-shelf.mjs [--base http://localhost:3328] [--page /]
 *        [--shots DIR] [--only poster,crossfade,growth,pages,measure] [--measure]
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
const base = flag('base', 'http://localhost:3328');
const pagePath = flag('page', '/');
const reviewPath = '/shelf-review';
const shots = resolve(
  flag(
    'shots',
    join(
      process.env.HOME ?? '.',
      '.orchestrator/evidence/home/landing/shots/shelf'
    )
  )
);
const posterDir = join(root, 'public/landing/shelf');
const only = new Set(
  (
    flag('only', 'poster,crossfade,growth,pages') +
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
  // Any page with the shelf: expose the live scene once it has drawn.
  await context.addInitScript(() =>
    document.addEventListener('shelf3d-ready', event => {
      const count = event.target
        .closest('[data-shelf]')
        ?.querySelectorAll('a[data-slug]').length;
      window.__shelf = { ...event.detail, count: count ?? 0 };
      window.__ready = true;
    })
  );
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
  await page.goto(base + reviewPath, { waitUntil: 'load' });
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
  // The canvas's own pixels, so the poster has exactly the scene's size and
  // the page scales both the same way.
  const dataUrl = await page.evaluate(() => {
    window.__shelf.render();
    return document.querySelector('[data-shelf] canvas').toDataURL('image/png');
  });
  const png = Buffer.from(dataUrl.split(',')[1], 'base64');
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
    `poster: ${meta.width}x${meta.height} -> public/landing/shelf/shelf-1440.webp, shelf-800.webp`
  );
  await context.close();
}

/**
 * The hero at 1440 twice: showing the poster (the scene hidden), then the
 * live scene (the poster hidden), as the crossfade's two ends. Writes the pair
 * side by side and reports their difference and the best-matching offset.
 */
async function crossfade() {
  const { context, page } = await openPage({ width: 1440, height: 900 });
  await page.goto(base + pagePath, { waitUntil: 'load' });
  await waitForShelf(page);
  await page.evaluate(() =>
    document.fonts.ready.then(() => window.scrollTo(0, 0))
  );
  const clip = await page.evaluate(() => {
    const box = document.querySelector('[data-shelf]').getBoundingClientRect();
    return {
      x: Math.max(0, box.x - 24),
      y: Math.max(0, box.y - 24),
      width: Math.min(
        window.innerWidth - Math.max(0, box.x - 24),
        box.width + 48
      ),
      height: box.height + 48,
    };
  });
  const show = which =>
    page.evaluate(which => {
      const shelf = document.querySelector('[data-shelf]');
      const img = shelf.querySelector('img');
      const stage = shelf.querySelector('canvas').parentElement;
      img.style.setProperty(
        'opacity',
        which === 'poster' ? '1' : '0',
        'important'
      );
      stage.style.setProperty(
        'opacity',
        which === 'live' ? '1' : '0',
        'important'
      );
      return new Promise(done =>
        requestAnimationFrame(() => requestAnimationFrame(done))
      );
    }, which);
  await show('poster');
  const before = await page.screenshot({ clip });
  await show('live');
  const after = await page.screenshot({ clip });
  await context.close();

  const { width, height } = await sharp(before).metadata();
  const gap = 24;
  await sharp({
    create: {
      width: width * 2 + gap,
      height,
      channels: 4,
      background: '#ffffff',
    },
  })
    .composite([
      { input: before, left: 0, top: 0 },
      { input: after, left: width + gap, top: 0 },
    ])
    .png()
    .toFile(join(shots, 'poster-vs-live-1440.png'));
  await sharp(before).toFile(join(shots, 'poster-1440.png'));
  await sharp(after).toFile(join(shots, 'live-1440.png'));

  const raw = buffer => sharp(buffer).removeAlpha().raw().toBuffer();
  const [a, b] = await Promise.all([raw(before), raw(after)]);
  let total = 0;
  let over = 0;
  for (let i = 0; i < a.length; i += 3) {
    const d =
      (Math.abs(a[i] - b[i]) +
        Math.abs(a[i + 1] - b[i + 1]) +
        Math.abs(a[i + 2] - b[i + 2])) /
      3;
    total += d;
    if (d > 12) over += 1;
  }
  const pixels = a.length / 3;
  // Best offset within 6 device pixels, on a grey copy: 0,0 means no shift.
  const grey = async buffer => sharp(buffer).greyscale().raw().toBuffer();
  const [ga, gb] = await Promise.all([grey(before), grey(after)]);
  let best = { dx: 0, dy: 0, error: Infinity };
  for (let dy = -6; dy <= 6; dy += 1)
    for (let dx = -6; dx <= 6; dx += 1) {
      let error = 0;
      let n = 0;
      for (let y = 8; y < height - 8; y += 2)
        for (let x = 8; x < width - 8; x += 2) {
          error += Math.abs(ga[y * width + x] - gb[(y + dy) * width + x + dx]);
          n += 1;
        }
      error /= n;
      if (error < best.error) best = { dx, dy, error: +error.toFixed(3) };
    }
  console.log(
    `crossfade: ${join(shots, 'poster-vs-live-1440.png')} (poster left, live right) ${JSON.stringify(
      {
        meanAbsDiff: +(total / pixels).toFixed(3),
        pixelsOver12: `${((over / pixels) * 100).toFixed(3)}%`,
        bestOffset: best,
      }
    )}`
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
    await page.goto(base + reviewPath, { waitUntil: 'load' });
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
  // Scroll the shelf fully out of view.
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

if (only.has('poster')) await poster();
if (only.has('crossfade')) await crossfade();
if (only.has('growth')) await growth(await realSet());
if (only.has('pages')) await pages();
if (only.has('measure')) await measure();

await browser.close();
if (errors.length) {
  console.error(`console errors:\n${errors.join('\n')}`);
  process.exitCode = 1;
} else console.log('console errors: none');
