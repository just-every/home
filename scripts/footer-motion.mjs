#!/usr/bin/env node
/**
 * Adds the footer illustration's motion (public/landing/footer/footer-art.svg):
 * the dog's tail and ear, the person's head, three birds, drifting petals and
 * glints on the water. Run it after scripts/footer-colours.mjs, or before: the
 * colour script only rewrites its own <style id="colourway">, and this one is
 * idempotent (it removes its earlier output first). Everything it adds sits
 * between <!--m:start--> and <!--m:end--> markers, or wraps a region in
 * <!--m:h-->; the parts and timings are in scripts/footer-motion/.
 *
 *   node scripts/footer-motion.mjs [--file other.svg]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { motionCss } from './footer-motion/css.mjs';
import { parts, glints, streaks, petals } from './footer-motion/parts.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { values } = parseArgs({
  options: {
    file: {
      type: 'string',
      default: resolve(root, 'public/landing/footer/footer-art.svg'),
    },
  },
});

const path = (poly) => `M${poly.map(([x, y]) => `${x} ${y}`).join('L')}Z`;

/** The outline pushed out by d: each corner along the bisector of its two edges. */
function grow(poly, d) {
  const n = poly.length;
  let area = 0;
  poly.forEach(([x, y], i) => {
    const [x2, y2] = poly[(i + 1) % n];
    area += x * y2 - x2 * y;
  });
  const s = area > 0 ? 1 : -1; // outward is the right-hand normal of a clockwise (y down) outline
  const norm = (a, b) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l = Math.hypot(dx, dy);
    return [(dy / l) * s, (-dx / l) * s];
  };
  return poly.map((p, i) => {
    const a = norm(poly[(i + n - 1) % n], p);
    const b = norm(p, poly[(i + 1) % n]);
    const mx = a[0] + b[0];
    const my = a[1] + b[1];
    const k = d / Math.max(0.5, (mx * a[0] + my * a[1]) / Math.hypot(mx, my) || 1);
    const l = Math.hypot(mx, my) || 1;
    return [Math.round(p[0] + (mx / l) * k), Math.round(p[1] + (my / l) * k)];
  });
}

let svg = readFileSync(values.file, 'utf8');

// Take out an earlier run.
svg = svg
  .replace(/<!--m:start-->[\s\S]*?<!--m:end-->/g, '')
  .replace(/<!--m:h--><g clip-path="[^"]*">([\s\S]*?)<\/g><!--\/m:h-->/g, '$1');

// The art's regions, in drawing order (the first is the base layer, "land").
const regions = [...svg.matchAll(/<g class="([a-z]+)"[^>]*>.*?<\/g>/g)].map((m) => ({
  name: m[1],
  start: m.index,
  end: m.index + m[0].length,
}));
const at = (name) => {
  const i = regions.findIndex((r) => r.name === name);
  if (i < 0) throw new Error(`no ${name} region in ${values.file}`);
  return i;
};
const pristine = svg;
const whole = [[-1984, -420], [5056, -420], [5056, 1766], [-1984, 1766]];

// A part moves everything drawn in its patch up to its region (the base layer
// too, so no pale ghost of it stays behind), so the repeat is the picture's
// slice: every region from the first to the part's own, in the patch.
const defs = [];
const copies = {};
for (const p of parts) {
  const last = at(p.group);
  p.last = last;
  defs.push(`<clipPath id="c-${p.id}"><path d="${path(grow(p.poly, p.grow))}"/></clipPath>`);
  const slice = pristine.slice(regions[0].start, regions[last].end);
  const body = `<g clip-path="url(#c-${p.id})">${slice}</g>`;
  (copies[p.group] ??= []).push(
    `<g id="${p.id}">${p.two ? `<g id="${p.id}f">${body}</g>` : body}</g>`
  );
}
// Each region has a hole wherever a repeat of it sits, and the repeats go
// right after their last region.
let out = '';
let pos = 0;
regions.forEach((r, i) => {
  const mine = parts.filter((p) => p.last >= i);
  out += pristine.slice(pos, r.start);
  const text = pristine.slice(r.start, r.end);
  if (mine.length) {
    defs.push(
      `<clipPath id="h-${r.name}"><path clip-rule="evenodd" d="${path(whole)}${mine.map((p) => path(p.poly)).join('')}"/></clipPath>`
    );
    out += `<!--m:h--><g clip-path="url(#h-${r.name})">${text}</g><!--/m:h-->`;
  } else out += text;
  if (copies[r.name]) out += `<!--m:start-->${copies[r.name].join('')}<!--m:end-->`;
  pos = r.end;
});
svg = out + pristine.slice(pos);

const ell = (cls, id, cx, cy, rx, ry, fill) =>
  `<ellipse id="${id}" class="gl" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;
const water =
  glints.map(([cx, cy, rx], i) => ell('gl', `gl${i}`, cx, cy, rx, 3.6, '#f1faf9')).join('') +
  streaks.map(([cx, cy, rx], i) => ell('gl', `st${i}`, cx, cy, rx, 3.4, '#f8f6fb')).join('');
// On the bay, under the village and the cypresses.
svg = svg.replace(
  /(<g class="bay"[^>]*>.*?<\/g>)/,
  `$1<!--m:start-->${water}<!--m:end-->`
);

const petal = petals
  .map(
    ([x, y], i) =>
      `<g transform="translate(${x} ${y})"><g id="pt${i}"><g data-m="sw"><g data-m="fl"><ellipse rx="12" ry="6.5" transform="rotate(${-25 + i * 17})" fill="#f2c2cc"/></g></g></g></g>`
  )
  .join('');

svg = svg.replace(
  '</defs>',
  `<!--m:start-->${defs.join('')}<!--m:end--></defs>`
);
svg = svg.replace(
  /<style id="colourway">[^<]*<\/style>/,
  (s) => `${s}<!--m:start--><style id="motion">${motionCss()}</style><!--m:end-->`
);
svg = svg.replace('</svg>', `<!--m:start-->${petal}<!--m:end--></svg>`);

writeFileSync(values.file, svg);
console.log(`${values.file}: ${parts.length} parts, ${glints.length + streaks.length} glints, ${petals.length} petals`);
