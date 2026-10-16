#!/usr/bin/env node
/**
 * Splits the footer illustration into a static picture and the small parts
 * that move over it (scripts/footer-motion/parts.mjs):
 *
 * - public/landing/footer/footer-art.svg stays the whole picture, less the
 *   cut parts: their layers are masked out (the birds, the head) or painted
 *   over (the ear's shadow). Nothing in it moves, so the browser rasterises it
 *   once.
 * - public/landing/footer/motion/*.svg are the parts, each a few kilobytes:
 *   the art's own layers cropped to the part's box, or a drawn part (the
 *   tail, a petal, the glints).
 * - src/components/landing/footer-motion.json gives the page each part's box
 *   and pivot in art units, so FooterMotion lays them exactly over the art.
 *
 * It keeps the art's colourway and gives the parts the same one; after it,
 * scripts/footer-colours.mjs recolours the art and the parts together. It is
 * idempotent: it removes its earlier output from the art first.
 *
 *   node scripts/footer-motion.mjs
 */
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { colourSvg, colourwayOf } from './footer-colour/apply.mjs';
import { crop } from './footer-motion/paths.mjs';
import {
  cuts,
  glintBox,
  glints,
  petal,
  petals,
  tail,
} from './footer-motion/parts.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const artFile = resolve(root, 'public/landing/footer/footer-art.svg');
const motionDir = resolve(root, 'public/landing/footer/motion');
const jsonFile = resolve(root, 'src/components/landing/footer-motion.json');

const VIEW = [-1984, -420, 7040, 2186];
const path = poly => `M${poly.map(([x, y]) => `${x} ${y}`).join('L')}Z`;
const boxPoly = ([x, y, w, h]) => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

/** The outline pushed out by d: each corner along the bisector of its two edges. */
function grow(poly, d) {
  if (!d) return poly;
  const n = poly.length;
  let area = 0;
  poly.forEach(([x, y], i) => {
    const [x2, y2] = poly[(i + 1) % n];
    area += x * y2 - x2 * y;
  });
  const s = area > 0 ? 1 : -1;
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
    const l = Math.hypot(mx, my) || 1;
    const k = d / Math.max(0.5, (mx * a[0] + my * a[1]) / l);
    return [Math.round(p[0] + (mx / l) * k), Math.round(p[1] + (my / l) * k)];
  });
}

// The art without an earlier run's output (this script's, or the first
// motion pass's, which built the parts inside the art).
let art = readFileSync(artFile, 'utf8')
  .replace(/<!--m:start-->[\s\S]*?<!--m:end-->/g, '')
  .replace(/<!--m:h--><g [^>]*>([\s\S]*?)<\/g><!--\/m:h-->/g, '$1');
const key = colourwayOf(art);
if (!key) throw new Error(`${artFile} has no colourway`);

// The plates, the overprint clips and the region clips.
const plates = [
  ...art.matchAll(
    /<path id="([a-z0-9]+)"(?: transform="([^"]*)")? d="([^"]*)"\/>/g
  ),
].map(([, id, transform, d]) => ({ id, transform, d }));
const regionClips = Object.fromEntries(
  [
    ...art.matchAll(
      /<clipPath id="r-([a-z]+)"><path d="([^"]*)"\/><\/clipPath>/g
    ),
  ].map(([, name, d]) => [name, d])
);
const kb = art.match(
  /<clipPath id="kb1">[\s\S]*?<clipPath id="kb3">.*?<\/clipPath>/
)[0];
const regions = [...art.matchAll(/<g class="([a-z]+)"[^>]*>.*?<\/g>/g)].map(
  m => ({
    name: m[1],
    text: m[0],
    start: m.index,
    end: m.index + m[0].length,
  })
);

/** The art's layers inside box, as a standalone SVG body: defs and region groups. */
function cropped(box) {
  const b = [box[0], box[1], box[0] + box[2], box[1] + box[3]];
  const defs = plates
    .map(({ id, transform, d }) => {
      const kept = crop(d, transform, b);
      return (
        kept &&
        `<path id="${id}"${transform ? ` transform="${transform}"` : ''} d="${kept}"/>`
      );
    })
    .filter(Boolean);
  const groups = [];
  for (const r of regions) {
    const clip = regionClips[r.name];
    if (!clip) {
      groups.push(r.text);
      continue;
    }
    const kept = crop(clip, null, b);
    if (!kept) continue;
    defs.push(`<clipPath id="r-${r.name}"><path d="${kept}"/></clipPath>`);
    groups.push(r.text);
  }
  return { defs: [...defs, kb].join(''), body: groups.join('') };
}

const svgOpen = ([x, y, w, h]) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" width="${w}" height="${h}">`;
const STYLE = '<style id="colourway"></style>';

rmSync(motionDir, { recursive: true, force: true });
mkdirSync(motionDir, { recursive: true });
const write = (name, svg) => {
  writeFileSync(resolve(motionDir, `${name}.svg`), svg);
};

// The cut parts.
const maskHoles = [];
const fills = [];
const layout = { view: VIEW, parts: {} };
for (const c of cuts) {
  const { defs, body } = cropped(c.box);
  const outline = c.poly ? grow(c.poly, c.grow) : boxPoly(c.box);
  const inner = c.region
    ? `<g clip-path="url(#r-${c.region})">${body}</g>`
    : body;
  write(
    c.id,
    colourSvg(
      `${svgOpen(c.box)}${STYLE}<defs>${defs}<clipPath id="part"><path d="${path(outline)}"/></clipPath></defs><g clip-path="url(#part)">${inner}</g></svg>`,
      key
    )
  );
  if (c.hole === 'box') maskHoles.push(`<path d="${path(boxPoly(c.box))}"/>`);
  else if (c.hole)
    maskHoles.push(
      `<path clip-path="url(#r-${c.region})" d="${path(c.hole)}"/>`
    );
  if (c.fill) {
    fills.push(
      `<g clip-path="url(#r-${c.region})"><g class="${c.region}"><path class="${c.fill}" d="${path(c.poly)}"/></g></g>`
    );
  }
  layout.parts[c.id] = { box: c.box, ...(c.origin && { origin: c.origin }) };
}

// The drawn parts: the tail, a petal and the glints.
const drawn = (part, region) =>
  colourSvg(
    `${svgOpen(part.box)}${STYLE}<g class="${region}">${part.shapes
      .map(([cls, d]) => `<path class="${cls}" d="${d}"/>`)
      .join('')}</g></svg>`,
    key
  );
write('tail', drawn(tail, 'dog'));
layout.parts.tail = {
  box: [
    tail.root[0] + tail.box[0],
    tail.root[1] + tail.box[1],
    tail.box[2],
    tail.box[3],
  ],
  origin: tail.root,
};
write('petal', drawn(petal, 'flowers'));
layout.petals = petals.map(([x, y, path, seconds, delay, size]) => ({
  box: [
    x + petal.box[0] * size,
    y + petal.box[1] * size,
    petal.box[2] * size,
    petal.box[3] * size,
  ],
  path,
  seconds,
  delay,
}));
glints.forEach((set, i) => {
  write(
    `glints-${i + 1}`,
    `${svgOpen(glintBox)}<g fill="#fff">${set
      .map(
        ([cx, cy, rx]) =>
          `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${(3 + rx / 20).toFixed(1)}"/>`
      )
      .join('')}</g></svg>`
  );
});
layout.glints = { box: glintBox, sets: glints.length };

// The static art: every region under the mask, then the painted fills.
const [vx, vy, vw, vh] = VIEW;
const mask = `<mask id="m-holes" maskUnits="userSpaceOnUse" x="${vx}" y="${vy}" width="${vw}" height="${vh}"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="#fff"/><g fill="#000">${maskHoles.join('')}</g></mask>`;
const first = regions[0].start;
const last = regions.at(-1).end;
art =
  art
    .slice(0, first)
    .replace('</defs>', `<!--m:start-->${mask}<!--m:end--></defs>`) +
  `<!--m:h--><g mask="url(#m-holes)">${art.slice(first, last)}</g><!--/m:h-->` +
  `<!--m:start-->${fills.join('')}<!--m:end-->` +
  art.slice(last);
writeFileSync(artFile, art);
writeFileSync(jsonFile, `${JSON.stringify(layout, null, 2)}\n`);

const sizes = readdirSync(motionDir).map(
  f => `${f} ${(readFileSync(resolve(motionDir, f)).length / 1024).toFixed(1)}k`
);
console.log(
  `${artFile}: ${key}, ${maskHoles.length} holes, ${fills.length} fills`
);
console.log(`motion/: ${sizes.join(', ')}`);
