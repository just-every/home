#!/usr/bin/env node
/**
 * Sets the colours and the print grain of the footer illustration
 * (public/landing/footer/footer-art.svg). The art is two ink plates, pink and
 * blue, each a few tint levels of one fill, overprinting (multiply) to purple,
 * over a cream for the unprinted shirt and dog; the SVG declares each colour
 * once, as `.ink-pink{fill:#...}`, `.ink-blue{fill:#...}` and
 * `.cream{fill:#...}`, and this rewrites those declarations in place. The
 * paper under the art is the footer's background (--paper in
 * src/components/landing/footer.module.css).
 *
 * The grain (GRAIN below) is texture inside the ink, never holes to the
 * paper: each plate's opacity is multiplied by a turbulence noise mapped
 * through a table whose floor is GRAIN.floor, so the lightest mark is still
 * mostly ink. The noise's creases become short, lighter stroke marks and its
 * peaks a soft mottle, as in the pick. The noise is sized to the screen: the
 * SVG picks a filter by its own rendered width, so the marks keep about the
 * same size in CSS pixels at every width and stay sharp at any DPR.
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

/**
 * The grain. `table` maps the noise (0 to 1, evenly spaced) to the share of
 * ink kept: the creases near 0 print at `floor` (the stroke marks), the
 * middle at full ink, the peaks a shade lighter (the mottle). Each entry of
 * `widths` is one filter: its max-width (none for the first, the default),
 * the rendered width its noise is sized for, and the noise's period in CSS
 * pixels there, a little finer on phones, where the art is drawn smallest.
 */
const floor = 0.64;
const GRAIN = {
  floor,
  table: `${floor} 0.82 1 1 1 1 0.985 0.97 0.955 0.94 0.93 0.93 0.93 0.93 0.93`,
  octaves: 2,
  seeds: { p: 7, b: 23 },
  widths: [
    [null, 3600, 10],
    [3000, 2560, 10],
    [2200, 1920, 10],
    [1700, 1440, 10],
    [1300, 1150, 10],
    [1000, 850, 9],
    [700, 624, 8],
  ],
};

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
  const rule = new RegExp(
    `(\\.${selectors[ink]}\\{fill:)#[0-9a-f]{6}(\\})`,
    'i'
  );
  if (!rule.test(svg)) {
    console.error(`${values.file} declares no .${selectors[ink]} fill`);
    process.exit(1);
  }
  svg = svg.replace(rule, `$1${values[ink].toLowerCase()}$2`);
}
// The grain: one filter per plate per width, and the media rules that pick
// them, replacing whatever grain the file had.
const filters = GRAIN.widths.flatMap(([, width, period], i) => {
  const frequency = +(width / 3072 / period).toFixed(4);
  return Object.entries(GRAIN.seeds).map(
    ([plate, seed]) =>
      `<filter id="g${plate}${i}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">` +
      `<feTurbulence type="turbulence" baseFrequency="${frequency}" numOctaves="${GRAIN.octaves}" seed="${seed}"/>` +
      `<feComponentTransfer><feFuncA type="table" tableValues="${GRAIN.table}"/></feComponentTransfer>` +
      `<feComposite in="SourceGraphic" operator="in"/></filter>`
  );
});
const rules = GRAIN.widths
  .map(([maxWidth], i) => {
    const rule = `#pink{filter:url(#gp${i})}#blue{filter:url(#gb${i})}`;
    return maxWidth ? `@media (max-width:${maxWidth}px){${rule}}` : rule;
  })
  .join('');
const grainRules = /(\.ink\{mix-blend-mode:multiply\})[^<]*(<\/style>)/;
const defs = /<defs>[\s\S]*?<\/defs>/;
if (!grainRules.test(svg) || !defs.test(svg)) {
  console.error(`${values.file} has no .ink rule or <defs> to hold the grain`);
  process.exit(1);
}
svg = svg
  .replace(grainRules, `$1${rules}$2`)
  .replace(defs, `<defs>${filters.join('')}</defs>`);

writeFileSync(values.file, svg);
console.log(
  `${values.file}: pink ${values.pink}, blue ${values.blue}, cream ${values.cream}, grain floor ${GRAIN.floor}`
);
