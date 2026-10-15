/**
 * Colour helpers for the footer colourways: mixing in OKLab, so a mix of two
 * colours keeps an even lightness step and no muddy midpoint, and the
 * collection's pastels read straight from src/data/seeds.ts.
 */
import { readFileSync } from 'node:fs';

const toLin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = c =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

function hexToOklab(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v =>
    toLin(v / 255)
  );
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToLinear([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function oklabToHex(lab) {
  const rgb = oklabToLinear(lab);
  return (
    '#' +
    rgb
      .map(c =>
        Math.round(Math.min(1, Math.max(0, toSrgb(c))) * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

/** a to b by t (0 = a, 1 = b), in OKLab. */
export function mix(a, b, t) {
  const A = hexToOklab(a);
  const B = hexToOklab(b);
  return oklabToHex(A.map((v, i) => v + (B[i] - v) * t));
}

/** OKLab lightness, 0 to 1. */
export const lightness = hex => hexToOklab(hex)[0];

const inGamut = lab =>
  oklabToLinear(lab).every(c => c >= -1e-4 && c <= 1 + 1e-4);

/**
 * The colour at OKLab lightness L in the same hue as `hex`, its chroma scaled
 * by `chroma` (a deeper shade of a pastel needs more colour to stay that
 * colour rather than read as grey), and pulled back only as far as sRGB needs.
 */
export function shade(hex, L, chroma = 1) {
  const [, a, b] = hexToOklab(hex);
  let lo = 0;
  let hi = chroma;
  if (inGamut([L, a * hi, b * hi])) return oklabToHex([L, a * hi, b * hi]);
  for (let i = 0; i < 24; i++) {
    const k = (lo + hi) / 2;
    if (inGamut([L, a * k, b * k])) lo = k;
    else hi = k;
  }
  return oklabToHex([L, a * lo, b * lo]);
}

/** The 14 seeds' `pastel` values by slug, in collection order. */
export function seedPastels(seedsFile) {
  const src = readFileSync(seedsFile, 'utf8');
  const out = {};
  for (const block of src.split(/\n {2}\{\n/).slice(1)) {
    const slug = block.match(/slug: '([^']+)'/);
    const pastel = block.match(/pastel: '(#[0-9a-f]{6})'/i);
    if (slug && pastel) out[slug[1]] = pastel[1].toLowerCase();
  }
  return out;
}
