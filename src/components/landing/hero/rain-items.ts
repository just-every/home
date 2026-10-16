/**
 * The things you pay for that fall among the drops: a dollar sign, a receipt
 * slip or a coin, nine in all (a third of everything that falls, with the
 * drops in rain-sheets.ts). Each is its own small layer so it can tumble as
 * it comes down. Every length is in the cloud art's own units (a 1120 x 540
 * box), so the layer scales with the art; the table is fixed, so the server
 * and the browser agree on it.
 *
 * The stack card sits just under the cloud and hides what falls behind it,
 * so most of them come down over the card's width and fade as they reach its
 * top edge, while one falls in the clear along each of the cloud's two
 * overhanging edges and stays in view all the way down. About half are in
 * flight at once.
 */

export type SpecialKind = 'dollar' | 'receipt' | 'coin';

export type RainItem = {
  kind: SpecialKind;
  /** The centre where it starts, tucked behind the cloud. */
  x: number;
  y: number;
  /** Width in art units: each kind's own box, scaled up to be seen. */
  w: number;
  /** Aspect of that box, width over height. */
  aspect: number;
  /** How far it travels while visible. */
  dx: number;
  dy: number;
  /** One whole fall, then a pause, in seconds. */
  t: number;
  /** Where in the cycle it starts (seconds, negative), so the stream is already running. */
  o: number;
  /** Where along its fall a still frame (reduced motion) freezes it, 0 to 1. */
  p: number;
  /** Tumble: a half-turn amplitude in degrees for the swaying kinds. */
  a: number;
  /** Where in its 24 second sway a swaying kind starts (seconds, negative). */
  s: number;
};

/** Each kind's box (art units) and how much bigger than the first pass it is. */
const BOX: Record<SpecialKind, { w: number; h: number; scale: number }> = {
  dollar: { w: 22, h: 44, scale: 2 },
  receipt: { w: 40, h: 52, scale: 1.9 },
  coin: { w: 38, h: 38, scale: 2 },
};

const KINDS: SpecialKind[] = ['coin', 'dollar', 'receipt'];

type Lane = { x: number; dy: number; slant: number; t: number };

/** Seven over the card, one down each side. */
const LANES: Lane[] = [
  { x: 205, dy: 262, slant: -0.17, t: 8.4 },
  { x: 330, dy: 262, slant: -0.17, t: 8.4 },
  { x: 455, dy: 262, slant: -0.17, t: 8.4 },
  { x: 580, dy: 262, slant: -0.17, t: 8.4 },
  { x: 705, dy: 262, slant: -0.17, t: 8.4 },
  { x: 830, dy: 262, slant: -0.17, t: 8.4 },
  { x: 915, dy: 262, slant: -0.17, t: 8.4 },
  { x: 66, dy: 470, slant: -0.04, t: 11 },
  { x: 1016, dy: 330, slant: -0.06, t: 10 },
];

const frac = (n: number) => n - Math.floor(n);

export const rainItems: RainItem[] = LANES.map((lane, i) => {
  const kind = KINDS[i % 3];
  const box = BOX[kind];
  const jitter = frac((i + 1) * 0.618034);
  // The seven over the card take turns round the cycle; the two at the
  // sides are a third of the way off.
  const turn = i < 7 ? ((i * 3) % 7) / 7 : (i - 6) / 3;
  return {
    kind,
    x: lane.x + (jitter - 0.5) * 50,
    y: 268 + jitter * 28,
    w: box.w * box.scale,
    aspect: box.w / box.h,
    dx: lane.dy * lane.slant,
    dy: lane.dy,
    t: lane.t,
    o: -turn * lane.t,
    p: 0.15 + frac((i + 1) * 0.47) * 0.5,
    a: 16 + frac((i + 1) * 0.53) * 14,
    s: -frac((i + 1) * 0.29) * 24,
  };
});
