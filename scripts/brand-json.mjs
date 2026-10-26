#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

import { heroCopy, siteMeta } from '../src/content/meta.ts';
import { seeds } from '../src/data/seeds.ts';
import { upcoming } from '../src/data/upcoming.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = join(root, 'public');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const asset = path => ({
  path,
  sha256: sha256(readFileSync(join(publicRoot, path))),
});
const css = readFileSync(
  join(root, 'src/components/landing/label.module.css'),
  'utf8'
);
const token = name => {
  const value = css.match(new RegExp(`--${name}: (#[a-f0-9]{6});`))?.[1];
  if (!value) throw new Error(`Missing brand colour: ${name}`);
  return value;
};
const paper = css.match(/\n  background: (#[a-f0-9]{6});/)?.[1];
if (!paper) throw new Error('Missing brand paper');
const brand = {
  $schema: '/brand.schema.json',
  schema: 'brand/v1',
  name: siteMeta.name,
  url: siteMeta.url,
  tagline: siteMeta.ogTitle,
  hero: {
    headline: siteMeta.ogTitle,
    subhead: heroCopy.subhead(seeds.length, upcoming.length),
    image: asset(siteMeta.ogImage.url),
  },
  logo: {
    mark: asset('/img/favicon.svg'),
    wordmark: asset('/img/logo.svg'),
    mono: asset('/img/logo-black.svg'),
  },
  favicons: [
    '/img/favicon.svg',
    '/img/favicon-32x32.png',
    '/img/favicon-16x16.png',
    '/img/favicon-192x192.png',
  ].map(asset),
  ogImage: asset(siteMeta.ogImage.url),
  colours: { ink: token('ink'), paper, accent: token('brand-ink') },
  profiles: { github: siteMeta.githubUrl, npm: null, x: null },
};
// brand/v1: sorted unique UTF-8 path NUL sha256 LF records; renderedFrom
// does not participate, so the completed image can participate without a cycle.
const inputs = [...Object.values(brand.logo), brand.hero.image, brand.ogImage];
const hashes = new Map(inputs.map(item => [item.path, item.sha256]));
brand.look = sha256(
  [...hashes]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([path, hash]) => `${path}\0${hash}\n`)
    .join('')
);
brand.ogImage.renderedFrom = brand.look;
for (const icon of brand.favicons) icon.renderedFrom = brand.look;
const output = `${JSON.stringify(brand, null, 2)}\n`;
const target = join(publicRoot, 'brand.json');
if (process.argv.includes('--check')) {
  if (
    !existsSync(target) ||
    !isDeepStrictEqual(JSON.parse(readFileSync(target, 'utf8')), brand)
  )
    throw new Error('Brand stale: run npm run brand');
  console.log('Brand hashes and content current');
} else {
  writeFileSync(target, output);
  console.log('Brand manifest generated');
}
