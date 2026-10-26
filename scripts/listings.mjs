#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { seeds } from '../src/data/seeds.ts';
import { upcoming } from '../src/data/upcoming.ts';
import { seedPageContent } from '../src/data/seed-pages.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const target = join(root, 'public/data/listings.json');
const hidden = new Set(
  JSON.parse(readFileSync(join(root, 'src/data/hidden-seeds.json'), 'utf8'))
);
const pages = new Map(seedPageContent.map(page => [page.slug, page]));
const slugs = new Set();
const listings = [
  ...seeds.map(seed => [seed, 'released']),
  ...upcoming.map(seed => [seed, 'coming-soon']),
]
  .map(([seed, status]) => {
    if (hidden.has(seed.slug) || slugs.has(seed.slug))
      throw new Error(`Invalid public seed: ${seed.slug}`);
    slugs.add(seed.slug);
    const page = pages.get(seed.slug);
    if (!page) throw new Error(`Missing page content: ${seed.slug}`);
    return {
      slug: seed.slug,
      name: seed.name,
      status,
      version: page.version,
      category: seed.category,
      line: seed.line,
      headline: seed.headline ?? null,
      replaces: seed.replaces,
      primaryReplace: seed.primaryReplace,
      accent: seed.accent,
      ink: seed.ink,
      paper: seed.paper,
      mark: seed.mark,
      pageUrl: `https://justevery.com/${seed.slug}`,
      contractUrl: page.contractUrl,
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));
const previous = existsSync(target)
  ? JSON.parse(readFileSync(target, 'utf8'))
  : null;
const current = JSON.stringify(previous?.listings) === JSON.stringify(listings);
if (process.argv.includes('--check')) {
  if (!current || !Number.isFinite(Date.parse(previous?.generatedAt)))
    throw new Error('Listings stale: run npm run listings');
  console.log(`Listings current (${listings.length} seeds)`);
} else if (!current) {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(
    target,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), listings }, null, 2)}\n`
  );
  console.log(`Listings generated (${listings.length} seeds)`);
} else console.log(`Listings unchanged (${listings.length} seeds)`);
