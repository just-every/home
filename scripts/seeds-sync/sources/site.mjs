/**
 * The site's own facts about every seed, read from the data modules
 * (src/data/seeds.ts, upcoming.ts, seed-pages.ts and the hero's order.ts).
 * Needs `node --import tsx`, as `npm run seeds:sync` runs it.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { parseRepo } from '../lib/net.mjs';

/** Rows of the hero card the share image keeps (og-image.mjs hides n + 9). */
const SHARE_IMAGE_ROWS = 8;

const load = (root, path) => import(pathToFileURL(join(root, path)).href);

export async function loadSite(root) {
  const hidden = new Set(
    JSON.parse(readFileSync(join(root, 'src/data/hidden-seeds.json'), 'utf8'))
  );
  const [
    { seeds },
    { upcoming },
    { seedPageContent },
    { rows },
    { incumbentPrices },
  ] = await Promise.all([
    load(root, 'src/data/seeds.ts'),
    load(root, 'src/data/upcoming.ts'),
    load(root, 'src/data/seed-pages.ts'),
    load(root, 'src/components/landing/hero/order.ts'),
    load(root, 'src/data/incumbent-prices.ts'),
  ]);
  const version = new Map(
    seedPageContent.map(page => [page.slug, page.version])
  );
  const publicPath = path => (path ? join(root, 'public', path) : null);
  const landingInk = slug => {
    const path = `/landing/marks/${slug}.svg`;
    return existsSync(publicPath(path)) ? path : null;
  };

  const released = seeds.map(seed => ({
    slug: seed.slug,
    name: seed.name,
    kind: 'released',
    repo: parseRepo(seed.repo),
    homepage: seed.homepage,
    homepageShot: seed.homepageShot,
    hasReel: Boolean(seed.reel),
    headline: seed.headline,
    replaces: seed.replaces,
    primaryReplace: seed.primaryReplace,
    colours: {
      accent: seed.accent,
      ink: seed.ink,
      paper: seed.paper,
      pastel: seed.pastel,
    },
    markOnPastel: seed.markOnPastel,
    marks: {
      mark: seed.mark,
      markLight: seed.markLight,
      markInk: seed.markInk,
      landingInk: seed.markOnPastel === 'ink' ? landingInk(seed.slug) : null,
    },
    version: version.get(seed.slug) ?? '',
  }));

  const soon = upcoming.map(seed => ({
    slug: seed.slug,
    name: seed.name,
    kind: 'soon',
    repo: parseRepo(seed.repo),
    homepage: seed.homepage,
    homepageShot: seed.homepageShot,
    hasReel: false,
    headline: null,
    replaces: seed.replaces,
    primaryReplace: seed.primaryReplace,
    colours: { pastel: seed.pastel },
    markOnPastel: 'colour',
    marks: {
      // An upcoming seed names one mark: its own copy, a light-surface copy
      // (Auth) or an ink redraw (Platter).
      mark: `/seeds/${seed.slug}/mark.svg`,
      markLight: seed.mark.endsWith('/mark-light.svg') ? seed.mark : null,
      markInk: seed.mark.endsWith('/mark-ink.svg') ? seed.mark : null,
      landingInk: null,
    },
    shownMark: seed.mark,
    version: version.get(seed.slug) ?? '',
  }));

  const heroRows = rows.map(volume => volume.slug);
  return {
    seeds: [...released, ...soon].filter(seed => !hidden.has(seed.slug)),
    publicPath,
    hero: {
      rows: heroRows,
      shareImageRows: heroRows.slice(0, SHARE_IMAGE_ROWS),
      priced: new Set(Object.keys(incumbentPrices)),
    },
  };
}
