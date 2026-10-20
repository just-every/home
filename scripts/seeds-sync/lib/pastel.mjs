/**
 * The collection's pastel recipe (documented in src/data/seeds.ts): the
 * brand colour in OKLCH at lightness 0.875, with 0.45 of its chroma kept
 * between 0.04 and 0.08, at the same hue, pulled into sRGB by lowering the
 * chroma until it fits.
 */
const LIGHTNESS = 0.875;
const CHROMA_SHARE = 0.45;
const CHROMA_MIN = 0.04;
const CHROMA_MAX = 0.08;
/**
 * Below this chroma a colour has no hue worth keeping (grey); very dark
 * colours (lightness under 0.2) read as black up to DARK_NEUTRAL_CHROMA.
 */
export const NEUTRAL_CHROMA = 0.03;
const DARK_LIGHTNESS = 0.2;
const DARK_NEUTRAL_CHROMA = 0.045;

const toLinear = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = c =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

export const normaliseHex = value => {
  const hex = value.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(hex))
    return `#${[...hex.slice(1)].map(c => c + c).join('')}`;
  return /^#[0-9a-f]{6}$/.test(hex) ? hex : null;
};

const hexToRgb = hex =>
  [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);

export function oklch(hex) {
  const [r, g, b] = hexToRgb(normaliseHex(hex)).map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return {
    l: L,
    c: Math.hypot(A, B),
    h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360,
  };
}

function fromOklch(L, C, H) {
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(toGamma);
}

const inGamut = rgb => rgb.every(c => c >= -1e-4 && c <= 1 + 1e-4);
const toHex = rgb =>
  `#${rgb
    .map(c =>
      Math.round(Math.min(1, Math.max(0, c)) * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;

/** The pastel of a brand colour, by the recipe above. */
export function pastelOf(brand) {
  const { c, h } = oklch(brand);
  let chroma = Math.min(CHROMA_MAX, Math.max(CHROMA_MIN, CHROMA_SHARE * c));
  let rgb = fromOklch(LIGHTNESS, chroma, h);
  while (!inGamut(rgb) && chroma > 0) {
    chroma = Math.max(0, chroma - 0.001);
    rgb = fromOklch(LIGHTNESS, chroma, h);
  }
  return toHex(rgb);
}

/** Whether a colour is too near grey or black for its hue to carry a pastel. */
export const isNeutral = hex => {
  const { l, c } = oklch(hex);
  return c < NEUTRAL_CHROMA || (l < DARK_LIGHTNESS && c < DARK_NEUTRAL_CHROMA);
};
