import type { ShelfVolume } from '@/components/variants/label/shelf3d/types';
import { seeds } from '@/data/seeds';
import type { Seed } from '@/data/seeds';

/**
 * The real seeds as shelf volumes, for the review route. The owner's lead
 * (Uptime, then HappyToHelp and Nook) comes first and the rest keep their
 * seeds.ts order; numbers follow that order. Colours are each product's own
 * accent softened into the approved pastel family; the Label page supplies
 * its own harmonised values.
 */
export const featured = 'uptime';
const lead = ['uptime', 'happytohelp', 'nook'];

// ---- colour: sRGB hex <-> OKLCH

type Rgb = [number, number, number];

const toLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const toGamma = (c: number) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;

function hexToRgb(hex: string): Rgb {
  const n = Number.parseInt(hex.replace('#', '').slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(c =>
    toLinear(c / 255)
  ) as Rgb;
}

function rgbToHex(rgb: Rgb) {
  return `#${rgb
    .map(c =>
      Math.round(Math.min(1, Math.max(0, toGamma(c))) * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;
}

function toOklch([r, g, b]: Rgb) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(A, B), h: Math.atan2(B, A) };
}

function fromOklch(L: number, C: number, h: number): Rgb {
  const A = C * Math.cos(h);
  const B = C * Math.sin(h);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const inGamut = (rgb: Rgb) => rgb.every(c => c >= -1e-4 && c <= 1 + 1e-4);

/**
 * Soften an accent into the art's pastel family (OKLCH lightness 0.80-0.90,
 * chroma up to about 0.1): keep the hue, lift the lightness, cap the chroma,
 * and let yellows sit lighter and richer, as they do in the art.
 */
export function pastel(accent: string) {
  const { L, C, h } = toOklch(hexToRgb(accent));
  const hue = ((h * 180) / Math.PI + 360) % 360;
  const yellow = Math.exp(-(((hue - 92) / 26) ** 2));
  const lightness = 0.82 + (L - 0.7) * 0.1 + yellow * 0.07;
  let chroma = Math.min(Math.max(C * 0.75, 0.045), 0.1 + yellow * 0.04);
  let rgb = fromOklch(lightness, chroma, h);
  while (!inGamut(rgb) && chroma > 0) {
    chroma -= 0.002;
    rgb = fromOklch(lightness, chroma, h);
  }
  return rgbToHex(rgb);
}

function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** The brand ink when it reads well on the spine (WCAG 4.5:1), else near-black. */
export const inkOn = (colour: string, ink: string) =>
  contrast(colour, ink) >= 4.5 ? ink : '#17171d';

function toVolume(seed: Seed, index: number): ShelfVolume {
  const colour = pastel(seed.accent);
  return {
    slug: seed.slug,
    name: seed.name,
    number: String(index + 1).padStart(2, '0'),
    colour,
    ink: inkOn(colour, seed.ink),
    mark: seed.mark,
    tagline: seed.headline,
    href: `#vol-${seed.slug}`,
  };
}

export function reviewVolumes(): ShelfVolume[] {
  const first = lead.flatMap(slug => seeds.filter(seed => seed.slug === slug));
  const rest = seeds.filter(seed => !lead.includes(seed.slug));
  return [...first, ...rest].map(toVolume);
}
