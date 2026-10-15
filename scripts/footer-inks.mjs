#!/usr/bin/env node
/**
 * Sets the two riso inks of the footer illustration
 * (public/landing/footer/footer-art.svg). The art is two ink plates, pink and
 * blue, each a few tint levels of one fill, overprinting (multiply) to purple;
 * the SVG declares each ink once, as `.ink-pink{fill:#...}` and
 * `.ink-blue{fill:#...}`, and this rewrites those two declarations in place.
 * The paper under the art is the footer's background (--paper in
 * src/components/landing/footer.module.css).
 *
 *   node scripts/footer-inks.mjs                      (the shipped inks below)
 *   node scripts/footer-inks.mjs --pink '#e35a95' --blue '#1a53a5'
 *   node scripts/footer-inks.mjs --file other.svg --pink ... --blue ...
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

/**
 * The shipped inks: the pick's hot pink and cobalt (#e35a95, #1a53a5), the
 * pink a touch rosier and the cobalt turned toward indigo, so the blue reads
 * with the site's lavenders and the overprint goes plum rather than navy.
 */
const INKS = { pink: '#e6609e', blue: '#3c4db2' };

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { values } = parseArgs({
  options: {
    pink: { type: 'string', default: INKS.pink },
    blue: { type: 'string', default: INKS.blue },
    file: {
      type: 'string',
      default: resolve(root, 'public/landing/footer/footer-art.svg'),
    },
  },
});

const hex = /^#[0-9a-f]{6}$/i;
for (const ink of ['pink', 'blue']) {
  if (!hex.test(values[ink])) {
    console.error(`--${ink} must be a #rrggbb colour, not ${values[ink]}`);
    process.exit(1);
  }
}

let svg = readFileSync(values.file, 'utf8');
for (const ink of ['pink', 'blue']) {
  const rule = new RegExp(`(\\.ink-${ink}\\{fill:)#[0-9a-f]{6}(\\})`, 'i');
  if (!rule.test(svg)) {
    console.error(`${values.file} declares no .ink-${ink} fill`);
    process.exit(1);
  }
  svg = svg.replace(rule, `$1${values[ink].toLowerCase()}$2`);
}
writeFileSync(values.file, svg);
console.log(`${values.file}: pink ${values.pink}, blue ${values.blue}`);
