#!/usr/bin/env node
/**
 * Colours the footer illustration (public/landing/footer/footer-art.svg).
 *
 * The art keeps the traced shapes of its two ink plates (pink and blue, three
 * tint levels each) and a cream layer for the shirt and dog, defined once.
 * Each scene region (sky, sun, far hills, sea, bay, village, cypresses,
 * canopy, trunk, grass, flowers, backpack, person, dog) is a clip path, and
 * inside it every pair of pink and blue levels present is drawn flat with its
 * own class: `.canopy .c13` is the canopy where light pink overprinted full
 * blue. A colourway is the style sheet that fills those classes; this script
 * writes it into the SVG's <style id="colourway">, so switching colourways
 * changes nothing but that one block.
 *
 *   node scripts/footer-colours.mjs                     (the default colourway)
 *   node scripts/footer-colours.mjs --colourway dusk
 *   node scripts/footer-colours.mjs --list
 *   node scripts/footer-colours.mjs --file other.svg --colourway orchard
 *
 * The colourways themselves are in scripts/footer-colour/colourways.mjs.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { mix } from './footer-colour/colour.mjs';
import { colourways, defaultColourway } from './footer-colour/colourways.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { values } = parseArgs({
  options: {
    colourway: { type: 'string', default: defaultColourway },
    file: {
      type: 'string',
      default: resolve(root, 'public/landing/footer/footer-art.svg'),
    },
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

const cw = colourways[values.colourway];
if (!cw) {
  console.error(
    `No colourway ${values.colourway}; one of: ${Object.keys(colourways).join(', ')}`
  );
  process.exit(1);
}

/** The fill of pink level i over blue level j (0 is no ink) in a region. */
function fill(r, i, j) {
  if (j === 0) return r.pink[i - 1];
  if (i === 0) return r.blue[j - 1];
  if (j === 3) return r.over[i - 1];
  // A pink tint over a lighter blue: between that blue and the full-blue overprint.
  return mix(r.blue[j - 1], r.over[i - 1], j === 1 ? 0.35 : 0.6);
}

let svg = readFileSync(values.file, 'utf8');
const style = /<style id="colourway">[^<]*<\/style>/;
if (!style.test(svg)) {
  console.error(`${values.file} has no <style id="colourway">`);
  process.exit(1);
}
// A region repeated for the motion (scripts/footer-motion.mjs) has one rule per class.
const rules = new Set([`.cr{fill:${cw.cream}}`, `.sh{fill:${cw.shade}}`]);
const groups = [...svg.matchAll(/<g class="([a-z]+)"[^>]*>(.*?)<\/g>/g)];
for (const [, name, body] of groups) {
  const r = cw.regions[name];
  if (!r) {
    console.error(
      `Colourway ${values.colourway} has no colours for the ${name} region`
    );
    process.exit(1);
  }
  for (const [, i, j] of body.matchAll(/class="c(\d)(\d)"/g)) {
    rules.add(`.${name} .c${i}${j}{fill:${fill(r, +i, +j)}}`);
  }
}
svg = svg.replace(
  style,
  `<style id="colourway">/* ${values.colourway} */${[...rules].join('')}</style>`
);
writeFileSync(values.file, svg);
console.log(
  `${values.file}: ${values.colourway} (${groups.length} regions, ${rules.size} fills)`
);
