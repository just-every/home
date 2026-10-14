#!/usr/bin/env node
/**
 * Shoots every header and hero look listed at /preview/hero on a running
 * server, with Playwright, and checks each one:
 *
 *   - the first viewport at 1440x900 and 390x844, and the first scroll down
 *     at 1440 (the hero's foot meeting the collection), into --shots
 *   - the first viewport at 1920x1080, 1280x800 and 768x1024, and the
 *     header and hero with the hero's first button focused from the
 *     keyboard at 1440, into --shots/extra
 *   - at every width: no sideways scroll, one h1, the live shelf drawn
 *     (768 and up) or its poster loaded (phones); at 1440, that "Browse
 *     the collection" lands on the collection; at 1440 and 390, every line
 *     of text in the header and hero against the pixels behind it (AA)
 *   - the index's thumbnails (public/landing/preview/hero/<id>.webp) and a
 *     contact sheet of every look at 1440 (hero-variants-sheet.png)
 *
 * Every page runs with reduced motion, as render-shelf.mjs does.
 *
 *   node scripts/shoot-hero-variants.mjs [--base http://localhost:3351]
 *        [--shots DIR] [--only a-light,e] [--no-thumbs]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
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
const base = flag('base', 'http://localhost:3351');
const shots = resolve(
  flag(
    'shots',
    join(
      process.env.HOME ?? '.',
      '.orchestrator/evidence/home/landing/shots/hero-variants'
    )
  )
);
const only = flag('only', '').split(',').filter(Boolean);
const thumbs = !args.includes('--no-thumbs');
const extra = join(shots, 'extra');
const thumbDir = join(root, 'public/landing/preview/hero');

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
mkdirSync(extra, { recursive: true });
if (thumbs) mkdirSync(thumbDir, { recursive: true });

const errors = [];

async function open(width, height, scale = 1) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
    reducedMotion: 'reduce',
  });
  await context.addInitScript(() =>
    document.addEventListener('shelf3d-ready', () => {
      window.__ready = true;
    })
  );
  const page = await context.newPage();
  page.on('console', message => {
    // The token count's API has no database under `next start`.
    const from = message.location()?.url ?? '';
    if (message.type() === 'error' && !from.includes('/api/tokens'))
      errors.push(`${page.url()} ${width}px: ${message.text()}`);
  });
  page.on('pageerror', error =>
    errors.push(`${page.url()} ${width}px: ${error.message}`)
  );
  return { context, page };
}

/** Load a look and wait for its shelf: live from 768 up, else the poster. */
async function load(page, id, width) {
  await page.goto(`${base}/preview/hero/${id}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  if (width >= 768)
    await page.waitForFunction(() => window.__ready === true, null, {
      timeout: 60000,
    });
  else
    await page.waitForFunction(
      () => document.querySelector('[data-shelf] img')?.complete === true
    );
  await page.evaluate(
    () =>
      new Promise(done =>
        requestAnimationFrame(() => requestAnimationFrame(done))
      )
  );
}

const state = page =>
  page.evaluate(() => {
    const img = document.querySelector('[data-shelf] img');
    return {
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      live: Boolean(document.querySelector('[data-shelf] [data-ready]')),
      poster: Boolean(img?.complete && img.naturalWidth > 0),
      posterSrc: img?.currentSrc.replace(location.origin, '') ?? null,
      browse:
        Array.from(document.querySelectorAll('main a'))
          .find(a => a.textContent.includes('Browse the collection'))
          ?.getAttribute('href') ?? null,
    };
  });

const luminance = ([r, g, b]) => {
  const lin = c => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/**
 * Every line of text in the header and hero against what is actually
 * behind it (gradients, the shelf, the panel), which axe cannot judge: the
 * text is hidden, the viewport shot, and each line's colour compared with
 * the pixels under it. The worst 2% sets its ratio; AA asks 4.5, or 3 for
 * large text. Returns the lines that fall short.
 */
async function contrast(page, scale) {
  const lines = await page.evaluate(() => {
    const out = [];
    for (const root of [
      document.querySelector('header'),
      document.querySelector('main > section'),
    ]) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.textContent.trim();
        const el = node.parentElement;
        // The volumes' name tags are hidden until hovered or focused.
        if (!text || el.closest('[data-shelf] ul')) continue;
        const style = getComputedStyle(el);
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const box of range.getClientRects()) {
          if (box.width < 2 || box.bottom < 0 || box.top > innerHeight)
            continue;
          out.push({
            text: text.slice(0, 32),
            color: style.color
              .match(/[\d.]+/g)
              .slice(0, 3)
              .map(Number),
            large:
              parseFloat(style.fontSize) >= 24 ||
              (parseFloat(style.fontSize) >= 18.66 &&
                Number(style.fontWeight) >= 700),
            box: [box.left, box.top, box.width, box.height],
          });
        }
      }
    }
    return out;
  });
  const hide = await page.addStyleTag({
    content:
      'header, header *, main > section:first-of-type, main > section:first-of-type * { color: transparent !important; text-shadow: none !important; caret-color: transparent !important; }',
  });
  await page.evaluate(
    () =>
      new Promise(done =>
        requestAnimationFrame(() => requestAnimationFrame(done))
      )
  );
  const shot = await page.screenshot();
  await hide.evaluate(node => node.remove());
  const { data, info } = await sharp(shot)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const short = [];
  for (const line of lines) {
    const ink = luminance(line.color);
    const [x, y, w, h] = line.box.map(v => Math.round(v * scale));
    const ratios = [];
    for (let j = Math.max(0, y); j < Math.min(info.height, y + h); j += 1)
      for (let i = Math.max(0, x); i < Math.min(info.width, x + w); i += 1) {
        const at = (j * info.width + i) * 3;
        ratios.push(
          ratio(ink, luminance([data[at], data[at + 1], data[at + 2]]))
        );
      }
    if (!ratios.length) continue;
    ratios.sort((a, b) => a - b);
    const worst = ratios[Math.floor(ratios.length * 0.02)];
    const need = line.large ? 3 : 4.5;
    if (worst < need)
      short.push(`"${line.text}" ${worst.toFixed(2)} < ${need}`);
  }
  return { lines: lines.length, short };
}

/** Tab until the hero's first button has focus; report its outline. */
async function focusBrowse(page) {
  for (let i = 0; i < 12; i += 1) {
    await page.keyboard.press('Tab');
    const text = await page.evaluate(
      () => document.activeElement?.textContent ?? ''
    );
    if (text.includes('Browse the collection')) break;
  }
  return page.evaluate(() => {
    const el = document.activeElement;
    const style = getComputedStyle(el);
    return {
      text: el.textContent.trim(),
      outline: `${style.outlineWidth} ${style.outlineStyle} ${style.outlineColor}`,
    };
  });
}

/** The hero's button, followed: where the collection's top lands. */
async function browse(page) {
  await page.locator('main a', { hasText: 'Browse the collection' }).click();
  await page.waitForTimeout(400);
  return page.evaluate(() => ({
    hash: location.hash,
    collectionTop: Math.round(
      document.getElementById('all').getBoundingClientRect().top
    ),
  }));
}

/** The look ids, in the index's order. */
async function ids() {
  const { context, page } = await open(1280, 800);
  await page.goto(`${base}/preview/hero`, { waitUntil: 'load' });
  const list = await page.$$eval('a[href^="/preview/hero/"]', links =>
    links.map(link => link.getAttribute('href').split('/').pop())
  );
  await context.close();
  return only.length ? list.filter(id => only.includes(id)) : list;
}

const report = {};
const looks = await ids();
for (const id of looks) {
  const entry = (report[id] = {});

  const desk = await open(1440, 900);
  await load(desk.page, id, 1440);
  entry[1440] = await state(desk.page);
  await desk.page.screenshot({ path: join(shots, `${id}-1440.png`) });
  entry.contrast = { 1440: await contrast(desk.page, 1) };
  // The first scroll: the hero's foot two thirds of the way down.
  await desk.page.evaluate(() => {
    const hero = document.querySelector('main > section');
    const foot = hero.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo(0, Math.max(0, foot - window.innerHeight * 0.62));
  });
  await desk.page.waitForTimeout(250);
  await desk.page.screenshot({ path: join(shots, `${id}-1440-scroll.png`) });
  await desk.page.evaluate(() => window.scrollTo(0, 0));
  await desk.page.mouse.move(2, 2);
  entry.focus = await focusBrowse(desk.page);
  await desk.page.screenshot({ path: join(extra, `${id}-1440-focus.png`) });
  entry.browse = await browse(desk.page);
  await desk.context.close();

  for (const [width, height, scale] of [
    [390, 844, 2],
    [768, 1024, 1],
    [1280, 800, 1],
    [1920, 1080, 1],
  ]) {
    const { context, page } = await open(width, height, scale);
    await load(page, id, width);
    entry[width] = await state(page);
    if (width === 390) entry.contrast[390] = await contrast(page, scale);
    await page.screenshot({
      path: join(width === 390 ? shots : extra, `${id}-${width}.png`),
    });
    await context.close();
  }

  const problems = [];
  for (const width of [1440, 390, 768, 1280, 1920]) {
    const s = entry[width];
    if (s.overflow > 0) problems.push(`${width}: ${s.overflow}px sideways`);
    if (s.h1 !== 1) problems.push(`${width}: ${s.h1} h1`);
    if (width >= 768 ? !s.live : !s.poster) problems.push(`${width}: no shelf`);
    if (s.browse !== '#all') problems.push(`${width}: browse is ${s.browse}`);
  }
  if (entry.browse.hash !== '#all' || Math.abs(entry.browse.collectionTop) > 2)
    problems.push(`browse lands at ${JSON.stringify(entry.browse)}`);
  for (const [width, result] of Object.entries(entry.contrast))
    if (result.short.length)
      problems.push(`contrast at ${width}: ${result.short.join(', ')}`);
  entry.problems = problems;
  console.log(
    `${id}: ${problems.length ? `PROBLEMS ${problems.join('; ')}` : 'ok'} | poster ${entry[1440].posterSrc} | focus ${entry.focus.outline}`
  );

  if (thumbs)
    await sharp(join(shots, `${id}-1440.png`))
      .resize({ width: 720 })
      .webp({ quality: 80, effort: 6 })
      .toFile(join(thumbDir, `${id}.webp`));
}
await browser.close();

/** Every look's first viewport at 1440, labelled, three to a row. */
async function sheet(list) {
  const cell = { w: 600, h: 375, label: 44, gap: 24 };
  const columns = 3;
  const rows = Math.ceil(list.length / columns);
  const width = columns * cell.w + (columns + 1) * cell.gap;
  const height = rows * (cell.h + cell.label) + (rows + 1) * cell.gap;
  const layers = [];
  for (const [index, id] of list.entries()) {
    const x = cell.gap + (index % columns) * (cell.w + cell.gap);
    const y =
      cell.gap + Math.floor(index / columns) * (cell.h + cell.label + cell.gap);
    const label = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${cell.w}" height="${cell.label}"><text x="2" y="28" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#17171d">/preview/hero/${id}</text></svg>`
    );
    layers.push({ input: label, left: x, top: y });
    layers.push({
      input: await sharp(join(shots, `${id}-1440.png`))
        .resize({ width: cell.w })
        .toBuffer(),
      left: x,
      top: y + cell.label,
    });
  }
  await sharp({
    create: { width, height, channels: 3, background: '#e9e8f0' },
  })
    .composite(layers)
    .png()
    .toFile(join(shots, 'hero-variants-sheet.png'));
}
if (!only.length) await sheet(looks);

writeFileSync(join(shots, 'report.json'), JSON.stringify(report, null, 1));
const failed = looks.filter(id => report[id].problems.length);
console.log(
  `${looks.length} looks, ${failed.length ? `problems in ${failed.join(', ')}` : 'no problems'}; shots in ${shots}`
);
if (errors.length) {
  console.error(`console errors:\n${errors.join('\n')}`);
  process.exitCode = 1;
} else console.log('console errors: none');
if (failed.length) process.exitCode = 1;
