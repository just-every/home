#!/usr/bin/env node
/**
 * Renders the three.js box set (src/components/landing/shelf3d) from a
 * running server with Playwright:
 *
 *   - the static render the hero shows as its poster, taken from the real page
 *     with its own volumes, read from the canvas at 1440 (2x), its bleed past
 *     the slot's left edge included: public/landing/shelf/shelf-1440.webp and
 *     shelf-800.webp (keep POSTER in Shelf.tsx at the size it prints)
 *   - the poster and the live scene in place on the page at 1440, side by side
 *     with their difference measured, so the crossfade can be seen not to shift
 *   - growth shots at 14, 30 and 60 volumes (needs `next dev`: they use the
 *     dev-only /shelf-review page), and page shots at 1920, 1440, 1280, 768
 *     and 390,
 *     into --shots
 *   - the hero at 1440 idle, hovering HappyToHelp and Uptime, and with a
 *     volume focused from the keyboard; a click on a volume, and every
 *     volume link's text
 *   - with --measure: time to first frame, frames per second idle (the scene
 *     renders on demand), while a volume slides out and once it is held, while
 *     the pointer sweeps the row and under reduced motion, and frame cost
 *
 * The 30 and 60 sets are generated here, from the real volumes plus
 * stand-ins, and injected into /shelf-review; app code never makes them.
 *
 *   npm run dev -- -p 3328
 *   node scripts/render-shelf.mjs [--base http://localhost:3328] [--page /]
 *        [--shots DIR] [--only poster,crossfade,growth,pages,hover,measure]
 *        [--measure] [--name shelf]
 *
 * --name sets the poster's file names (<name>-1440.webp, <name>-800.webp):
 * a hero layout with its own shelf size renders its own, from its preview
 * page (--page /preview/hero/a-light --name hero-spacious).
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
const posterName = flag('name', 'shelf');
/** Shots named after a layout's own poster; the page's keep their names. */
const shotPrefix = posterName === 'shelf' ? '' : `${posterName}-`;
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
    flag('only', 'poster,crossfade,growth,pages,hover') +
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
      family: 'Stand-in',
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
    .toFile(join(posterDir, `${posterName}-1440.webp`));
  await sharp(png)
    .resize({ width: 800 })
    .webp({ quality: 82, alphaQuality: 80, effort: 6 })
    .toFile(join(posterDir, `${posterName}-800.webp`));
  await sharp(png).toFile(join(shots, `${posterName}-1440-transparent.png`));
  console.log(
    `poster: ${meta.width}x${meta.height} -> public/landing/shelf/${posterName}-1440.webp, ${posterName}-800.webp`
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
    const box = document
      .querySelector('[data-shelf] img')
      .parentElement.getBoundingClientRect();
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
      img.style.setProperty(
        'visibility',
        which === 'poster' ? 'visible' : 'hidden',
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
    .toFile(join(shots, `${shotPrefix}poster-vs-live-1440.png`));
  await sharp(before).toFile(join(shots, `${shotPrefix}poster-1440.png`));
  await sharp(after).toFile(join(shots, `${shotPrefix}live-1440.png`));

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
    `crossfade: ${join(shots, `${shotPrefix}poster-vs-live-1440.png`)} (poster left, live right) ${JSON.stringify(
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
    [1920, 1080],
    [1440, 900],
    [1280, 800],
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

/**
 * Where each volume sits on the canvas: sweep the pointer along the row at
 * mid-height and read which volume's tag comes up.
 */
async function volumeSpots(page) {
  const box = await page.locator('[data-shelf] canvas').boundingBox();
  const y = box.y + box.height * 0.5;
  const xs = {};
  for (let x = box.x + 4; x < box.x + box.width - 2; x += 3) {
    await page.mouse.move(x, y);
    const slug = await page.evaluate(
      () =>
        new Promise(done =>
          requestAnimationFrame(() =>
            done(
              document.querySelector('[data-shelf] a[data-active]')?.dataset
                .slug ?? null
            )
          )
        )
    );
    if (slug) (xs[slug] ??= []).push(x);
  }
  await page.mouse.move(2, 2);
  await page.waitForTimeout(600);
  return Object.fromEntries(
    Object.entries(xs).map(([slug, list]) => [
      slug,
      { x: (list[0] + list[list.length - 1]) / 2, y },
    ])
  );
}

const activeTag = page =>
  page.evaluate(() => {
    const tag = document.querySelector('[data-shelf] a[data-active]');
    return tag ? { slug: tag.dataset.slug, text: tag.textContent } : null;
  });

/**
 * The hero at 1440 idle, hovering HappyToHelp and Uptime, and with a volume
 * focused from the keyboard; then a click on a volume, which should land on
 * its card.
 */
async function hover() {
  const { context, page } = await openPage({
    width: 1440,
    height: 900,
    reduced: false,
  });
  await page.goto(base + pagePath, { waitUntil: 'load' });
  await waitForShelf(page);
  await page.evaluate(() =>
    document.fonts.ready.then(() => window.scrollTo(0, 0))
  );
  const spots = await volumeSpots(page);
  await page.screenshot({ path: join(shots, 'hero-1440-idle.png') });
  console.log(`hover idle: ${join(shots, 'hero-1440-idle.png')}`);
  for (const slug of ['happytohelp', 'uptime']) {
    const spot = spots[slug];
    if (!spot) throw new Error(`no volume found for ${slug}`);
    await page.mouse.move(spot.x, spot.y);
    await page.waitForTimeout(900);
    const file = join(shots, `hero-1440-hover-${slug}.png`);
    await page.screenshot({ path: file });
    console.log(
      `hover ${slug}: ${file} ${JSON.stringify(await activeTag(page))}`
    );
  }
  await page.mouse.move(2, 2);
  await page.waitForTimeout(600);
  // Keyboard: Tab on until a volume's link has focus.
  for (let i = 0; i < 40; i += 1) {
    await page.keyboard.press('Tab');
    const slug = await page.evaluate(
      () => document.activeElement?.dataset?.slug ?? null
    );
    if (slug) break;
  }
  await page.waitForTimeout(900);
  const focused = await page.evaluate(() => ({
    slug: document.activeElement?.dataset?.slug ?? null,
    text: document.activeElement?.textContent ?? null,
  }));
  await page.screenshot({ path: join(shots, 'hero-1440-focus.png') });
  console.log(
    `focus: ${join(shots, 'hero-1440-focus.png')} ${JSON.stringify(focused)}`
  );
  // Click: lands on the volume's card.
  await page.keyboard.press('Escape');
  await page.evaluate(() => document.activeElement?.blur());
  const target = spots.happytohelp;
  await page.mouse.click(target.x, target.y);
  await page.waitForTimeout(800);
  const landed = await page.evaluate(() => ({
    hash: window.location.hash,
    cardTop: Math.round(
      document
        .getElementById(window.location.hash.slice(1))
        ?.getBoundingClientRect().top ?? -1
    ),
  }));
  console.log(`click happytohelp: ${JSON.stringify(landed)}`);
  // Every link's accessible text.
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[data-shelf] a[data-slug]')).map(
      link => link.textContent
    )
  );
  console.log(`links: ${JSON.stringify(links)}`);
  await context.close();
}

/** Frames drawn over `ms`, as frames per second. */
async function fps(page, ms, during = null) {
  const at = () => page.evaluate(() => window.__shelf.stats().frames);
  const begin = await at();
  const started = Date.now();
  if (during) await during();
  const left = ms - (Date.now() - started);
  if (left > 0) await page.waitForTimeout(left);
  const frames = (await at()) - begin;
  return {
    frames,
    seconds: ms / 1000,
    fps: +(frames / (ms / 1000)).toFixed(1),
  };
}

/**
 * First frame, frames per second idle (none: the scene renders on demand),
 * while a volume slides out and once it is held out, while the pointer
 * sweeps the row, and with reduced motion; the GPU cost of one frame; and
 * the page's scripts.
 */
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
  const spots = await volumeSpots(page);
  const idle = await fps(page, 3000);
  const spot = spots.happytohelp;
  const slide = await fps(page, 1000, () => page.mouse.move(spot.x, spot.y));
  const held = await fps(page, 2000);
  const box = await page.locator('[data-shelf] canvas').boundingBox();
  const sweep = await fps(page, 2000, async () => {
    for (let i = 0; i <= 60; i += 1) {
      await page.mouse.move(
        box.x + box.width * (0.2 + 0.7 * (i / 60)),
        box.y + box.height * 0.5
      );
      await page.waitForTimeout(25);
    }
  });
  await page.mouse.move(2, 2);
  const settle = await fps(page, 1000);
  const after = await fps(page, 3000);
  const bench = await page.evaluate(() => window.__shelf.bench(240));
  const stats = await page.evaluate(() => window.__shelf.stats());
  await context.close();

  const calm = await openPage({ width: 1440, height: 900, reduced: true });
  await calm.page.goto(base + pagePath, { waitUntil: 'load' });
  await waitForShelf(calm.page);
  const calmSpots = await volumeSpots(calm.page);
  const calmSpot = calmSpots.happytohelp;
  const calmHover = await fps(calm.page, 1500, () =>
    calm.page.mouse.move(calmSpot.x, calmSpot.y)
  );
  await calm.context.close();

  const gzipped = scripts.reduce((sum, script) => sum + script.bytes, 0);
  const largest = scripts
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
        framesPerSecond: {
          idle,
          hoverSlidingOut: slide,
          hoverHeld: held,
          sweepingTheRow: sweep,
          pointerLeftSettling: settle,
          idleAgain: after,
          reducedMotionHover: calmHover,
        },
        frame: {
          cpuDrawMs: +stats.drawMs.toFixed(2),
          gpuBoundFrameMs: +bench.toFixed(2),
          pixelRatio: stats.pixelRatio,
          size: stats.size,
        },
        scripts: {
          count: scripts.length,
          transferredBytes: gzipped,
          largest,
        },
      },
      null,
      1
    )
  );
}

if (only.has('poster')) await poster();
if (only.has('crossfade')) await crossfade();
if (only.has('growth')) await growth(await realSet());
if (only.has('pages')) await pages();
if (only.has('hover')) await hover();
if (only.has('measure')) await measure();

await browser.close();
if (errors.length) {
  console.error(`console errors:\n${errors.join('\n')}`);
  process.exitCode = 1;
} else console.log('console errors: none');
