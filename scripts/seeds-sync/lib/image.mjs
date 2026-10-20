/**
 * Pixels: marks rendered from SVG, stills scaled down, and the differences
 * between two pictures, measured so that encoding and anti-aliasing noise
 * stay under the thresholds (README.md lists them).
 */
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

export const sha256 = data => createHash('sha256').update(data).digest('hex');

/** Marks are compared at this size, contained on white. */
export const MARK_SIZE = 128;
/** A pixel counts as changed when a channel moves by more than this. */
export const MARK_PIXEL_DELTA = 64;
/** A mark is changed when more than this share of its pixels changed. */
export const MARK_CHANGED_SHARE = 0.01;

/**
 * Stills are compared scaled down to 160 x 90, which blurs small text: a
 * page re-captured unchanged (and stored as WebP) moves under 0.03% of its
 * pixels, a hero that prints today's date about 0.4%, and one new button
 * about 1.7%.
 */
export const STILL_SIZE = { width: 160, height: 90 };
export const STILL_PIXEL_DELTA = 64;
export const STILL_CHANGED_SHARE = 0.008;

/** An SVG drawn at `size` square on `background`, as raw RGB. */
export async function renderSvg(svg, size = MARK_SIZE, background = '#ffffff') {
  const meta = await sharp(svg).metadata();
  const longest = Math.max(meta.width ?? size, meta.height ?? size);
  const density = Math.min(2400, Math.max(72, (72 * size * 2) / longest));
  return sharp(svg, { density })
    .resize(size, size, { fit: 'contain', background })
    .flatten({ background })
    .removeAlpha()
    .raw()
    .toBuffer();
}

/** The same render as a PNG, for the report. */
export async function svgPng(svg, size = 256) {
  const pixels = await renderSvg(svg, size);
  return sharp(pixels, { raw: { width: size, height: size, channels: 3 } })
    .png()
    .toBuffer();
}

/**
 * The share of pixels whose largest channel difference passes `delta`, and
 * the mean difference, for two raw RGB buffers of one size.
 */
export function pixelDiff(a, b, delta) {
  let changed = 0;
  let total = 0;
  const pixels = a.length / 3;
  for (let i = 0; i < a.length; i += 3) {
    const d = Math.max(
      Math.abs(a[i] - b[i]),
      Math.abs(a[i + 1] - b[i + 1]),
      Math.abs(a[i + 2] - b[i + 2])
    );
    total += d;
    if (d > delta) changed++;
  }
  return { changedShare: changed / pixels, meanDelta: total / pixels / 255 };
}

export async function compareMarks(before, after) {
  const [a, b] = await Promise.all([renderSvg(before), renderSvg(after)]);
  const diff = pixelDiff(a, b, MARK_PIXEL_DELTA);
  return { ...diff, changed: diff.changedShare > MARK_CHANGED_SHARE };
}

/** A still (any format sharp reads) scaled to STILL_SIZE as raw RGB. */
export const stillPixels = image =>
  sharp(image)
    .resize(STILL_SIZE.width, STILL_SIZE.height, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer();

export async function compareStills(before, after) {
  const [a, b] = await Promise.all([stillPixels(before), stillPixels(after)]);
  const diff = pixelDiff(a, b, STILL_PIXEL_DELTA);
  return { ...diff, changed: diff.changedShare > STILL_CHANGED_SHARE };
}

/**
 * A small fingerprint of a still for seeds the site keeps no still of (those
 * with a reel): 16 x 9 cells of mean colour, 4 bits a channel, as hex.
 */
export const SIGNATURE_GRID = { width: 16, height: 9 };
/** A cell changed when a channel moved by more than this (of 15). */
export const SIGNATURE_CELL_DELTA = 1;
export const SIGNATURE_CHANGED_SHARE = 0.02;

export async function stillSignature(image) {
  const pixels = await sharp(image)
    .resize(SIGNATURE_GRID.width, SIGNATURE_GRID.height, {
      fit: 'fill',
      kernel: 'cubic',
    })
    .removeAlpha()
    .raw()
    .toBuffer();
  return [...pixels].map(v => Math.round(v / 17).toString(16)).join('');
}

export function compareSignatures(before, after) {
  if (!before || before.length !== after.length) return null;
  let changed = 0;
  const cells = before.length / 3;
  for (let i = 0; i < before.length; i += 3) {
    let d = 0;
    for (let k = 0; k < 3; k++)
      d = Math.max(
        d,
        Math.abs(parseInt(before[i + k], 16) - parseInt(after[i + k], 16))
      );
    if (d > SIGNATURE_CELL_DELTA) changed++;
  }
  const changedShare = changed / cells;
  return { changedShare, changed: changedShare > SIGNATURE_CHANGED_SHARE };
}

/** A 1280x720 still for the site: WebP, as the stored ones are. */
export const toSiteStill = png =>
  sharp(png).resize(1280, 720).webp({ quality: 80 }).toBuffer();

/** Two pictures side by side (before | after) on white, for the report. */
export async function sideBySide(left, right, height = 256) {
  const [a, b] = await Promise.all(
    [left, right].map(image =>
      image ? sharp(image).resize({ height }).png().toBuffer() : null
    )
  );
  const widths = await Promise.all(
    [a, b].map(async image =>
      image ? (await sharp(image).metadata()).width : height
    )
  );
  const gap = 24;
  const canvas = sharp({
    create: {
      width: widths[0] + widths[1] + gap,
      height,
      channels: 3,
      background: '#ffffff',
    },
  });
  const layers = [];
  if (a) layers.push({ input: a, left: 0, top: 0 });
  if (b) layers.push({ input: b, left: widths[0] + gap, top: 0 });
  return canvas.composite(layers).png().toBuffer();
}

/** The colours an SVG names (fill, stroke, stop-color, style rules). */
export const svgColours = svg => [
  ...new Set(
    (svg.toString().match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) ?? []).map(
      c => c.toLowerCase()
    )
  ),
];

const luminance = ([r, g, b]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

/**
 * Whether a mark looks like Base's placeholder tile: a rounded square over
 * the whole canvas in one dark colour with a single light glyph (the
 * foundation template draws a white "F" on #1b2724, the default seed a white
 * sprout on #334155). Tested on pixels: the corners are clear, nearly all of
 * the canvas is covered, two colours make up almost all of it, the larger
 * dark and the other light.
 */
export async function looksLikePlaceholder(svg) {
  const size = 64;
  const meta = await sharp(svg).metadata();
  const longest = Math.max(meta.width ?? size, meta.height ?? size);
  const { data } = await sharp(svg, {
    density: Math.min(2400, (72 * size * 2) / longest),
  })
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const alpha = (x, y) => data[(y * size + x) * 4 + 3];
  const corners = [
    alpha(0, 0),
    alpha(size - 1, 0),
    alpha(0, size - 1),
    alpha(size - 1, size - 1),
  ];
  if (!corners.every(a => a < 40)) return false;
  let opaque = 0;
  const counts = new Map();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 200) continue;
    opaque++;
    const key = [data[i], data[i + 1], data[i + 2]]
      .map(v => (v >> 4) << 4)
      .join(',');
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  if (opaque / (size * size) < 0.88) return false;
  const [tile, glyph] = [...counts.entries()].sort((x, y) => y[1] - x[1]);
  if (!tile || !glyph) return false;
  const colour = key => key.split(',').map(Number);
  return (
    tile[1] / opaque > 0.55 &&
    (tile[1] + glyph[1]) / opaque > 0.85 &&
    luminance(colour(tile[0])) < 0.3 &&
    luminance(colour(glyph[0])) > 0.8
  );
}
