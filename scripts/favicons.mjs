#!/usr/bin/env node
/**
 * Draws every favicon: the JustEvery_ underscore mark (a slanted dash) on a
 * pastel square.
 *
 *   npm run favicons
 *
 * The site's own (every page that is not a seed page) is the lavender of the
 * home page's "Pick your replacement." section with the site's dark ink; each
 * seed page gets the seed's own `pastel` with the seed's `ink`, falling back
 * to the site ink where the seed's ink is under 4.5:1 on its pastel. Seeds
 * are read from the data (src/components/seed/model.ts), so a new seed or a
 * changed pastel is this one command.
 *
 * Writes public/img/favicon.svg and its PNGs and public/favicon.ico for
 * the site, and public/img/favicons/<slug>.svg, <slug>-32.png and
 * <slug>-16.png for each seed (files of slugs no longer in the data are
 * removed). Prints every colour pair's contrast ratio and any fallback.
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const img = join(root, 'public', 'img');
const seedDir = join(img, 'favicons');

export const SITE_PASTEL = '#dcd7f4';
export const SITE_INK = '#17171d';
const MIN_CONTRAST = 4.5;

const svg = (
  pastel,
  ink
) => `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="${pastel}"/>
  <path d="M 4 26 L 6 21 L 28 21 L 26 26 Z" fill="${ink}"/>
</svg>
`;

const channel = value => {
  const v = value / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminance = hex => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};
export const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** The SVG rendered square at `size` px. */
const png = (source, size) =>
  sharp(Buffer.from(source), { density: (72 * size) / 32 })
    .resize(size, size)
    .png()
    .toBuffer();

async function main() {
  const { seedPages } = await import(
    pathToFileURL(join(root, 'src/components/seed/model.ts')).href
  );

  const pairs = [{ name: 'site', pastel: SITE_PASTEL, ink: SITE_INK }];
  for (const page of seedPages) {
    pairs.push({ name: page.slug, pastel: page.pastel, ink: page.ink });
  }

  console.log(`${'name'.padEnd(14)} pastel   ink      ratio  used`);
  const resolved = [];
  for (const { name, pastel, ink } of pairs) {
    const ratio = contrast(ink, pastel);
    const fallback = ratio < MIN_CONTRAST;
    const used = fallback ? SITE_INK : ink;
    resolved.push({ name, pastel, ink: used });
    console.log(
      `${name.padEnd(14)} ${pastel} ${ink} ${ratio.toFixed(2).padStart(5)}  ${
        fallback
          ? `FALLBACK to site ink (${contrast(SITE_INK, pastel).toFixed(2)})`
          : name === 'site'
            ? 'site ink'
            : 'seed ink'
      }`
    );
  }

  const [site, ...seeds] = resolved;

  const siteSvg = svg(site.pastel, site.ink);
  writeFileSync(join(img, 'favicon.svg'), siteSvg);
  for (const size of [16, 32, 192, 512]) {
    writeFileSync(
      join(img, `favicon-${size}x${size}.png`),
      await png(siteSvg, size)
    );
  }
  const png32 = await png(siteSvg, 32);
  writeFileSync(join(img, 'favicon.png'), png32);
  // /favicon.ico (for clients that ask for it unprompted) has always held a
  // 32 px PNG, which browsers accept. It lives in public/ only: an
  // src/app/favicon.ico would be linked on every page, seed pages included,
  // competing with their own icons.
  writeFileSync(join(root, 'public', 'favicon.ico'), png32);

  mkdirSync(seedDir, { recursive: true });
  const keep = new Set();
  for (const { name, pastel, ink } of seeds) {
    const source = svg(pastel, ink);
    const files = {
      [`${name}.svg`]: source,
      [`${name}-32.png`]: await png(source, 32),
      [`${name}-16.png`]: await png(source, 16),
    };
    for (const [file, data] of Object.entries(files)) {
      writeFileSync(join(seedDir, file), data);
      keep.add(file);
    }
  }
  for (const file of readdirSync(seedDir)) {
    if (!keep.has(file)) rmSync(join(seedDir, file));
  }
  console.log(`\nwrote the site favicon and ${seeds.length} seed favicons`);
}

main();
