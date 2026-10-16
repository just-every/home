#!/usr/bin/env node
/**
 * Colours the footer illustration: the static art
 * (public/landing/footer/footer-art.svg) and its moving parts
 * (public/landing/footer/motion/*.svg, made by scripts/footer-motion.mjs).
 *
 * The art keeps the traced shapes of its two ink plates (pink and blue, three
 * tint levels each) and a cream layer for the shirt and dog, defined once.
 * Each scene region (sky, sun, far hills, sea, bay, village, cypresses,
 * canopy, trunk, grass, flowers, backpack, person, dog) is a clip path, and
 * inside it every pair of pink and blue levels present is drawn flat with its
 * own class: `.canopy .c13` is the canopy where light pink overprinted full
 * blue. A colourway is the style sheet that fills those classes; this script
 * writes it into each SVG's <style id="colourway">, so switching colourways
 * changes nothing but that one block (scripts/footer-colour/apply.mjs).
 *
 *   node scripts/footer-colours.mjs                     (the default colourway)
 *   node scripts/footer-colours.mjs --colourway dusk
 *   node scripts/footer-colours.mjs --list
 *   node scripts/footer-colours.mjs --file other.svg --colourway orchard
 *
 * The colourways themselves are in scripts/footer-colour/colourways.mjs.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { colourSvg, hasColourway } from './footer-colour/apply.mjs';
import { colourways, defaultColourway } from './footer-colour/colourways.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(root, 'public/landing/footer');
const { values } = parseArgs({
  options: {
    colourway: { type: 'string', default: defaultColourway },
    file: { type: 'string' },
    list: { type: 'boolean', default: false },
  },
});

if (values.list) {
  for (const [key, cw] of Object.entries(colourways)) {
    console.log(
      `${key}${key === defaultColourway ? ' (default)' : ''}: ${cw.note}`
    );
  }
  process.exit(0);
}

// The art, then every moving part that carries colours (the glints are light).
const files = values.file
  ? [resolve(values.file)]
  : [
      resolve(dir, 'footer-art.svg'),
      ...readdirSync(resolve(dir, 'motion'))
        .filter(f => f.endsWith('.svg'))
        .map(f => resolve(dir, 'motion', f)),
    ];

for (const file of files) {
  const svg = readFileSync(file, 'utf8');
  if (!hasColourway(svg)) {
    if (values.file) {
      console.error(`${file} has no <style id="colourway">`);
      process.exit(1);
    }
    continue;
  }
  try {
    writeFileSync(file, colourSvg(svg, values.colourway));
  } catch (e) {
    console.error(`${file}: ${e.message}`);
    process.exit(1);
  }
  console.log(`${file}: ${values.colourway}`);
}
