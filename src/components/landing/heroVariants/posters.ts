import { POSTER_BLEED, type ShelfPoster } from '../shelf3d/Shelf';
import type { Layout } from './looks';

/**
 * Each layout's static render of the shelf, made at its own size so the
 * handover to the live scene does not shift or sharpen:
 * `node scripts/render-shelf.mjs --page /preview/hero/<id> --name hero-<layout>`
 * writes hero-<layout>-1440.webp (the scene at 1440, 2x, bleed included)
 * and hero-<layout>-800.webp. `width` and `height` are its pixels; `vw`
 * and `cap` the shelf's width on desktops, for the image's sizes.
 */
const RENDERS: Record<
  Exclude<Layout, 'now'>,
  { width: number; height: number; vw: number; cap: number }
> = {
  spacious: { width: 2074, height: 1008, vw: 61, cap: 940 },
  stage: { width: 1972, height: 960, vw: 58, cap: 900 },
  stacked: { width: 2266, height: 1102, vw: 67, cap: 1120 },
  overlay: { width: 2242, height: 1092, vw: 66, cap: 1080 },
  night: { width: 2074, height: 1008, vw: 61, cap: 940 },
  split: { width: 1992, height: 970, vw: 59, cap: 960 },
};

export function layoutPoster(layout: Exclude<Layout, 'now'>): ShelfPoster {
  const render = RENDERS[layout];
  const grow = 1 + POSTER_BLEED;
  const base = `/landing/shelf/hero-${layout}`;
  return {
    src: `${base}-1440.webp`,
    srcSet: `${base}-800.webp 800w, ${base}-1440.webp ${render.width}w`,
    sizes: [
      `(min-width: 1024px) min(${+(render.vw * grow).toFixed(2)}vw, ${Math.round(render.cap * grow)}px)`,
      `${+(100 * grow).toFixed(2)}vw`,
    ].join(', '),
    width: render.width,
    height: render.height,
  };
}
