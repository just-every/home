import { RAIN_SLANT, RAIN_SPEED } from './rain-sheets';

/**
 * The things you pay for that fall among the drops: a dollar sign or a coin,
 * nine in all (a third
 * of everything that falls, with the drops in rain-sheets.ts). They are part of the same rain: each comes down
 * at the nearer drops' speed and along their slant, give or take a few per
 * cent, and only turns or flutters as it falls. Each is its own small layer
 * so it can turn. Every length is in the cloud art's own units (a 1120 x 540
 * box), so the layer scales with the art; the table is fixed, so the server
 * and the browser agree on it.
 *
 * The stack card sits just under the cloud and hides what falls behind it,
 * so most of them come down over the card's width and fade as they reach its
 * top edge, while one falls in the clear along each of the cloud's two
 * overhanging edges and stays in view all the way down. About half are in
 * flight at once.
 */

export type SpecialKind = 'dollar' | 'coin';

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
  /** Where in its sway a swaying kind starts (seconds, negative). */
  s: number;
};

/** Each kind's box (art units) and how much bigger than the first pass it is. */
const BOX: Record<SpecialKind, { w: number; h: number; scale: number }> = {
  dollar: { w: 22, h: 44, scale: 2 },
  coin: { w: 38, h: 38, scale: 2 },
};

const KINDS: SpecialKind[] = ['coin', 'dollar'];

/**
 * The share of its cycle an item spends falling in view; the rest it waits
 * out of sight. It matches the fall in rainfall.module.css (`specialRun`:
 * one fall is 19.333% of an iteration of three cycles).
 */
const FALL_SHARE = 0.58;

/** The sway's length in rainfall.module.css (`sway`), in seconds. */
const SWAY = 14.4;

/** Where it starts across the art, and how far down it falls. */
type Lane = { x: number; dy: number };

/** Seven over the card, one down each side. */
const LANES: Lane[] = [
  { x: 230, dy: 262 },
  { x: 355, dy: 262 },
  { x: 480, dy: 262 },
  { x: 605, dy: 262 },
  { x: 730, dy: 262 },
  { x: 855, dy: 262 },
  { x: 945, dy: 262 },
  { x: 112, dy: 380 },
  { x: 1068, dy: 300 },
];

const frac = (n: number) => n - Math.floor(n);

export const rainItems: RainItem[] = LANES.map((lane, i) => {
  const kind = KINDS[i % 2];
  const box = BOX[kind];
  const jitter = frac((i + 1) * 0.618034);
  // A few per cent either side of the drops' speed and slant, so the
  // stream is one rain without moving in lockstep.
  const speed = RAIN_SPEED * (0.95 + frac((i + 1) * 0.381966) * 0.1);
  const slant = RAIN_SLANT + (frac((i + 1) * 0.7548) - 0.5) * 0.05;
  const t = lane.dy / speed / FALL_SHARE;
  // The seven over the card take turns round the cycle; the two at the
  // sides are a third of the way off.
  const turn = i < 7 ? ((i * 3) % 7) / 7 : (i - 6) / 3;
  return {
    kind,
    x: lane.x + (jitter - 0.5) * 50,
    y: 268 + jitter * 28,
    w: box.w * box.scale,
    aspect: box.w / box.h,
    dx: lane.dy * slant,
    dy: lane.dy,
    t,
    o: -turn * t,
    p: 0.15 + frac((i + 1) * 0.47) * 0.5,
    a: 9 + frac((i + 1) * 0.53) * 8,
    s: -frac((i + 1) * 0.29) * SWAY,
  };
});
