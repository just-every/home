#!/usr/bin/env node
/**
 * Sets the colours of the footer illustration
 * (public/landing/footer/footer-art.svg). The art is two ink plates, pink and
 * blue, each a few tint levels of one fill, overprinting (multiply) to purple,
 * over a cream for the unprinted shirt and dog; the SVG declares each colour
 * once, as `.ink-pink{fill:#...}`, `.ink-blue{fill:#...}` and
 * `.cream{fill:#...}`, and this rewrites those declarations in place. The
 * paper under the art is the footer's background (--paper in
 * src/components/landing/footer.module.css).
 *
 *   node scripts/footer-inks.mjs                      (the shipped colours below)
 *   node scripts/footer-inks.mjs --pink '#f85694' --blue '#1650a6'
 *   node scripts/footer-inks.mjs --file other.svg --pink ... --blue ... --cream ...
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

/**
 * The shipped inks: the pick's hot pink and cobalt (#f85694, #1650a6), the
 * pink a shade less fluorescent and the cobalt turned toward indigo, so the
 * blue reads with the site's lavenders and the overprint goes to a deep
 * indigo rather than navy. The cream is the pick's warm paper, kept for the
 * shirt and dog so they stay the lightest, warmest shapes on the cooler
 * footer paper; a faint pink plate shades their sides away from the sun.
 */
const INKS = { pink: '#ea5799', blue: '#2b3fa4', cream: '#f7efea' };

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { values } = parseArgs({
  options: {
    pink: { type: 'string', default: INKS.pink },
    blue: { type: 'string', default: INKS.blue },
    cream: { type: 'string', default: INKS.cream },
    file: {
      type: 'string',
      default: resolve(root, 'public/landing/footer/footer-art.svg'),
    },
  },
});

const hex = /^#[0-9a-f]{6}$/i;
for (const ink of Object.keys(INKS)) {
  if (!hex.test(values[ink])) {
    console.error(`--${ink} must be a #rrggbb colour, not ${values[ink]}`);
    process.exit(1);
  }
}

let svg = readFileSync(values.file, 'utf8');
const selectors = { pink: 'ink-pink', blue: 'ink-blue', cream: 'cream' };
for (const ink of Object.keys(INKS)) {
  const rule = new RegExp(`(\\.${selectors[ink]}\\{fill:)#[0-9a-f]{6}(\\})`, 'i');
  if (!rule.test(svg)) {
    console.error(`${values.file} declares no .${selectors[ink]} fill`);
    process.exit(1);
  }
  svg = svg.replace(rule, `$1${values[ink].toLowerCase()}$2`);
}
writeFileSync(values.file, svg);
console.log(
  `${values.file}: pink ${values.pink}, blue ${values.blue}, cream ${values.cream}`,
);
