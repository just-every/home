#!/usr/bin/env node
/**
 * Reads seed homepages in a browser: for each job a 1280x720 PNG of the page
 * above the fold (after its fonts load, motion reduced, overlays removed),
 * its h1, its "alternative to" line and a few computed colours. Standalone,
 * so it can run on another machine (sources/homepage.mjs copies it there):
 *
 *   node capture-page.mjs <jobs.json> <out-dir>
 *
 * jobs.json is [{ "slug": "uptime", "name": "Uptime", "url": "https://run-uptime.com" }].
 * Writes <out-dir>/<slug>.png for each page read and <out-dir>/results.json.
 * Needs playwright or playwright-core next to it (or global, as og-image.mjs
 * finds it) and Chrome or Playwright's Chromium.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const VIEWPORT = { width: 1280, height: 720 };
const PARALLEL = 4;

async function loadPlaywright() {
  for (const name of ['playwright', 'playwright-core']) {
    try {
      return await import(name);
    } catch {
      // Try the next.
    }
  }
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
    'Playwright not found: npm i playwright-core next to this script, or globally.'
  );
}

/** Runs in the page: removes what floats over it (consent, chat, toasts, dialogs). */
function removeOverlays() {
  const floating =
    /cookie|consent|gdpr|chat|intercom|crisp|drift|widget|toast|snackbar|announcement|newsletter-popup|turnstile|nextjs-portal/i;
  const removed = [];
  const drop = (element, why) => {
    removed.push(
      `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''} (${why})`
    );
    element.remove();
  };
  for (const element of document.querySelectorAll(
    'dialog[open], [aria-modal="true"], nextjs-portal, iframe[src*="challenges.cloudflare.com"]'
  ))
    drop(element, 'dialog');
  for (const element of document.querySelectorAll('body *')) {
    if (!element.isConnected) continue;
    const style = getComputedStyle(element);
    if (style.position !== 'fixed') continue;
    const box = element.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) continue;
    const label = `${element.id} ${element.className} ${element.getAttribute('aria-label') ?? ''}`;
    // A bar fixed to the top is the page's own header; anything else fixed
    // that names itself an overlay, or sits in a bottom corner, floats over it.
    const atTop = box.top <= 4 && box.height < 160;
    const bottomCorner =
      box.bottom >= innerHeight - 4 &&
      box.width < innerWidth * 0.5 &&
      box.height < 420;
    if (!atTop && (floating.test(label) || bottomCorner))
      drop(element, 'floating');
  }
  return removed;
}

/** Runs in the page: the facts the sync compares. */
function readFacts(name) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  /** Any CSS colour as #rrggbb (null when transparent). */
  const hex = value => {
    if (!value) return null;
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = '#000';
    context.fillStyle = value;
    context.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
    if (a < 250) return null;
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
  };
  const visible = element => {
    const box = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return (
      box.width > 0 &&
      box.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none'
    );
  };
  const text = element => (element.innerText ?? '').replace(/\s+/g, ' ').trim();

  const h1 = [...document.querySelectorAll('h1')].find(visible) ?? null;
  // Where the h1 is only the wordmark (Slate's), the headline is the next heading.
  const bare = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const headline =
    h1 && bare(text(h1)) === bare(name)
      ? ([...document.querySelectorAll('h2')].find(visible) ?? h1)
      : h1;

  // The first visible element saying "alternative to <names>" none of whose
  // children says it whole (the phrase may span several spans, as Nook's).
  const says = element => /alternatives?\s+to\s+\S{2,}/i.test(text(element));
  let alternativeTo = null;
  for (const element of document.body.querySelectorAll('*')) {
    if (['SCRIPT', 'STYLE', 'TEMPLATE', 'NOSCRIPT'].includes(element.tagName))
      continue;
    if (!visible(element) || !says(element) || text(element).length > 400)
      continue;
    if ([...element.children].some(says)) continue;
    alternativeTo = text(element);
    break;
  }

  const page =
    hex(getComputedStyle(document.body).backgroundColor) ??
    hex(getComputedStyle(document.documentElement).backgroundColor) ??
    '#ffffff';
  let action = null;
  for (const element of document.querySelectorAll(
    'main a, main button, a, button'
  )) {
    if (!visible(element) || !text(element)) continue;
    const box = element.getBoundingClientRect();
    if (box.top > innerHeight || box.top < 0) continue;
    const background = hex(getComputedStyle(element).backgroundColor);
    if (background && background !== page) {
      action = background;
      break;
    }
  }
  return {
    title: document.title,
    h1: h1 ? text(h1) : null,
    headline: headline ? text(headline) : null,
    alternativeTo,
    theme: {
      page,
      text: h1 ? hex(getComputedStyle(h1).color) : null,
      action,
      themeColor: hex(
        document.querySelector('meta[name="theme-color"]')?.content ?? null
      ),
    },
  };
}

async function capture(browser, job, out) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'reduce',
    locale: 'en-US',
    timezoneId: 'America/Chicago',
  });
  const page = await context.newPage();
  try {
    const response = await page.goto(job.url, {
      waitUntil: 'load',
      timeout: 45000,
    });
    const status = response?.status() ?? 0;
    if (status >= 400)
      return {
        slug: job.slug,
        url: job.url,
        ok: false,
        status,
        error: `HTTP ${status}`,
      };
    await page
      .waitForLoadState('networkidle', { timeout: 10000 })
      .catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.scrollTo(0, 0));
    const removed = await page.evaluate(removeOverlays);
    // Let late layout, lazy images and reduced-motion end states settle.
    await page.waitForTimeout(1200);
    await page.evaluate(() => document.fonts.ready);
    const facts = await page.evaluate(readFacts, job.name ?? '');
    await page.screenshot({
      path: join(out, `${job.slug}.png`),
      clip: { x: 0, y: 0, ...VIEWPORT },
    });
    return {
      slug: job.slug,
      url: job.url,
      finalUrl: page.url(),
      ok: true,
      status,
      removed,
      ...facts,
    };
  } catch (error) {
    return {
      slug: job.slug,
      url: job.url,
      ok: false,
      status: 0,
      error: error.message.split('\n')[0],
    };
  } finally {
    await context.close();
  }
}

const [jobsFile, out] = process.argv.slice(2);
if (!jobsFile || !out) {
  console.error('usage: node capture-page.mjs <jobs.json> <out-dir>');
  process.exit(2);
}
mkdirSync(out, { recursive: true });
const jobs = JSON.parse(readFileSync(jobsFile, 'utf8'));
const { chromium } = await loadPlaywright();
const browser = await chromium
  .launch()
  .catch(() => chromium.launch({ channel: 'chrome' }));
const results = [];
try {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(PARALLEL, jobs.length) }, async () => {
      while (next < jobs.length) {
        const job = jobs[next++];
        const result = await capture(browser, job, out);
        results.push(result);
        console.log(
          `${result.ok ? 'read' : 'FAILED'} ${job.slug} ${result.ok ? '' : result.error}`
        );
      }
    })
  );
} finally {
  await browser.close();
}
writeFileSync(join(out, 'results.json'), JSON.stringify(results, null, 2));
