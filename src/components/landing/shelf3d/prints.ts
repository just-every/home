import { CanvasTexture, SRGBColorSpace } from 'three';

import type { ShelfVolume } from './types';

/**
 * What is printed on the volumes, drawn into canvases at the size they are
 * seen, so text and marks stay crisp at 2x. Layout fractions are read off the
 * art, flattened with `12ui scene rectify`.
 */

export type Mark = HTMLImageElement | null;

/** Drop a mark's dark-scheme rules: a printed spine has one colour scheme. */
function stripDarkScheme(svg: string) {
  let out = svg;
  const rule = /@media[^{]*prefers-color-scheme\s*:\s*dark[^{]*\{/;
  for (let match = rule.exec(out); match; match = rule.exec(out)) {
    let depth = 0;
    let end = match.index + match[0].length - 1;
    for (; end < out.length; end += 1) {
      if (out[end] === '{') depth += 1;
      else if (out[end] === '}' && --depth === 0) break;
    }
    out = out.slice(0, match.index) + out.slice(end + 1);
  }
  return out;
}

/** Give the root element a large intrinsic size so it rasterises sharply. */
function sized(svg: string) {
  const box =
    /viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/.exec(
      svg
    );
  if (!box) return svg;
  const ratio = Number(box[1]) / Number(box[2]);
  const w = ratio >= 1 ? 512 : Math.round(512 * ratio);
  const h = ratio >= 1 ? Math.round(512 / ratio) : 512;
  return svg.replace(/<svg\b([^>]*)>/, (_tag, attrs: string) => {
    const rest = attrs.replace(/\s(width|height)="[^"]*"/g, '');
    return `<svg${rest} width="${w}" height="${h}">`;
  });
}

/** Load a volume's SVG mark, its `currentColor` drawn in the volume's ink. */
export async function loadMark(url: string, ink: string): Promise<Mark> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Shelf mark ${url}: HTTP ${response.status}`);
  const svg = sized(
    stripDarkScheme(await response.text()).replace(/currentColor/g, ink)
  );
  const src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const image = new Image();
  image.decoding = 'async';
  image.src = src;
  try {
    await image.decode();
  } finally {
    URL.revokeObjectURL(src);
  }
  return image;
}

/** Draw a mark centred on (cx, cy), contained in a size x size box. */
function drawMark(
  ctx: CanvasRenderingContext2D,
  mark: Mark,
  cx: number,
  cy: number,
  size: number
) {
  if (!mark || !mark.naturalWidth) return;
  const ratio = mark.naturalWidth / mark.naturalHeight;
  const w = ratio >= 1 ? size : size * ratio;
  const h = ratio >= 1 ? size / ratio : size;
  ctx.drawImage(mark, cx - w / 2, cy - h / 2, w, h);
}

function canvas(w: number, h: number) {
  const el = document.createElement('canvas');
  el.width = Math.max(2, Math.round(w));
  el.height = Math.max(2, Math.round(h));
  const ctx = el.getContext('2d');
  if (!ctx) throw new Error('Shelf: no 2D canvas context');
  return { el, ctx };
}

function texture(el: HTMLCanvasElement, anisotropy: number) {
  const map = new CanvasTexture(el);
  map.colorSpace = SRGBColorSpace;
  map.anisotropy = anisotropy;
  return map;
}

function hexLuminance(hex: string) {
  const n = Number.parseInt(hex.replace('#', '').slice(0, 6), 16);
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * lin((n >> 16) & 255) +
    0.7152 * lin((n >> 8) & 255) +
    0.0722 * lin(n & 255)
  );
}

/** Ink for text on the white box: the volume's own ink unless it is light. */
const coverInk = (ink: string) => (hexLuminance(ink) < 0.18 ? ink : '#17171d');

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > width) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * A spine: number at the top, the name set vertically, the mark at the foot.
 * `w` and `h` are the texture size; the face is `w` wide. `type` sets the
 * type and mark against a face `type` times as wide, so the box's slimmer
 * spine carries them at the same size as every other volume's.
 */
export function spineTexture(
  volume: ShelfVolume,
  mark: Mark,
  family: string,
  w: number,
  h: number,
  anisotropy: number,
  type = 1
) {
  const { el, ctx } = canvas(w, h);
  const W = el.width;
  const H = el.height;
  const U = W * type;
  ctx.fillStyle = volume.ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `480 ${U * 0.31}px ${family}`;
  ctx.fillText(volume.number, W / 2, H * 0.136);

  let size = U * 0.345;
  ctx.font = `650 ${size}px ${family}`;
  const room = H * 0.56;
  const length = ctx.measureText(volume.name).width;
  if (length > room) {
    size *= room / length;
    ctx.font = `650 ${size}px ${family}`;
  }
  const cap = ctx.measureText('H').actualBoundingBoxAscent;
  ctx.save();
  ctx.translate(W / 2, H * 0.2);
  ctx.rotate(Math.PI / 2);
  ctx.textAlign = 'left';
  ctx.fillText(volume.name, 0, cap / 2);
  ctx.restore();

  drawMark(ctx, mark, W / 2, H * 0.868, U * 0.42);
  return texture(el, anisotropy);
}

/**
 * The featured box's cover: number, name, tagline, a large mark and the
 * JustEvery_ imprint, laid out as on the art's cover.
 */
export function coverTexture(
  volume: ShelfVolume,
  mark: Mark,
  family: string,
  w: number,
  h: number,
  anisotropy: number
) {
  const { el, ctx } = canvas(w, h);
  const W = el.width;
  const H = el.height;
  const ink = coverInk(volume.ink);
  const left = W * 0.1;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = '#76767e';
  ctx.font = `300 ${H * 0.074}px ${family}`;
  ctx.fillText(volume.number, left - H * 0.004, H * 0.138);

  ctx.fillStyle = ink;
  let size = H * 0.094;
  ctx.font = `650 ${size}px ${family}`;
  const nameWidth = ctx.measureText(volume.name).width;
  if (nameWidth > W * 0.82) {
    size *= (W * 0.82) / nameWidth;
    ctx.font = `650 ${size}px ${family}`;
  }
  ctx.fillText(volume.name, left - size * 0.04, H * 0.283);

  if (volume.tagline) {
    ctx.fillStyle = '#6f6f78';
    // Three lines at most: where small type measures a little wider, it
    // steps down until the line fits in three.
    let size = H * 0.041;
    let lines: string[];
    for (;;) {
      ctx.font = `400 ${size}px ${family}`;
      lines = wrap(ctx, volume.tagline, W * 0.42);
      if (lines.length <= 3 || size < H * 0.032) break;
      size *= 0.97;
    }
    lines
      .slice(0, 3)
      .forEach((line, i) => ctx.fillText(line, left, H * (0.365 + i * 0.054)));
  }

  drawMark(ctx, mark, W * 0.5, H * 0.685, W * 0.58);

  ctx.fillStyle = '#1c1c22';
  ctx.font = `680 ${H * 0.024}px ${family}`;
  ctx.fillText('JustEvery_', left, H * 0.925);
  return texture(el, anisotropy);
}
