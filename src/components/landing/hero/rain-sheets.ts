/**
 * The painted drops: two sheets of them, one nearer (bigger, quicker) and
 * one further off (smaller, slower, fainter). A sheet is one layer holding a
 * tile of scattered drops repeated three times down the line of the fall;
 * it slides one tile along that line, then starts again, and the repeat
 * lines up with the start, so the rain never seems to begin or end. One
 * layer carries a dozen drops. The cloud covers where they start, and they
 * fade out (RAIN_FADE) before the stack card where they end.
 *
 * All lengths are in the cloud art's units (a 1120 x 540 box).
 */

export type Drop = { x: number; y: number };

export type Sheet = {
  /** Drops of all three repeats, as the sheet is drawn at the start. */
  drops: Drop[];
  /** The sheet's own box: its content, in art units. */
  box: { x: number; y: number; w: number; h: number };
  /** How big a drop is drawn, against the painted drop's own size. */
  scale: number;
  /** Where it slides to in one cycle. */
  dx: number;
  dy: number;
  /** Seconds for one cycle, and where the sheet starts in it (negative). */
  t: number;
  o: number;
  opacity: number;
};

/** The wrapper clips the sheets to this window (cloud-art units). */
export const RAIN_WINDOW = { x: 130, y: 262, w: 860, h: 378 };

/**
 * The rain's soft edges, in cloud-art units. Across the sides the whole layer
 * (drops and the rest) goes from nothing at `out` to full at `in`, measured
 * from each side of the 1120-wide box, so the rain keeps to the middle and
 * has no hard edge. Down the fall the drops fade from full at `from` to
 * nothing at `to`, so they are gone before the stack card's top edge (about
 * y 565) and nothing is cut off by the window's foot.
 */
export const RAIN_SIDES = { out: 130, in: 190 };
export const RAIN_FADE = { from: 440, to: 560 };

/** The rain's lean: how far left it moves for each unit it falls. */
export const RAIN_SLANT = -0.3;

/**
 * The painted drop leans further than the rain does, so each drop is turned
 * this far (degrees) to lie along its own fall.
 */
export const DROP_TILT = -15.5;

const COPIES = 3;
/** The turned drop's reach right of and above where it is placed (art units, before scaling). */
const DROP_W = 18;
const DROP_UP = 21;

type Spec = {
  tile: number;
  drops: number;
  scale: number;
  t: number;
  opacity: number;
  seed: number;
};

const NEAR: Spec = {
  tile: 250,
  drops: 12,
  scale: 2,
  t: 3,
  opacity: 1,
  seed: 0.71,
};

const SPECS: Spec[] = [
  { tile: 300, drops: 10, scale: 1.55, t: 4.6, opacity: 0.7, seed: 0.37 },
  NEAR,
];

/**
 * How fast the nearer drops fall (art units a second). What else falls
 * with them (rain-items.ts) keeps to it, so the rain is one stream.
 */
export const RAIN_SPEED = NEAR.tile / NEAR.t;

const frac = (n: number) => n - Math.floor(n);

function sheet(spec: Spec, index: number): Sheet {
  const { tile, scale } = spec;
  const dx = tile * RAIN_SLANT;
  // The tile's x range is as wide as the window plus the slide's reach, so
  // the slide never uncovers an edge.
  const reach = Math.abs(dx) * (COPIES - 1);
  const x0 = RAIN_WINDOW.x - reach;
  const span = RAIN_WINDOW.w + reach * 2;
  const base: Drop[] = [];
  for (let i = 0; i < spec.drops; i++) {
    base.push({
      x: x0 + frac(i * 0.618034 + spec.seed) * span,
      y: frac(i * 0.381966 * 3 + spec.seed * 2.1) * tile,
    });
  }
  // The first repeat sits over the window's lower half; each next one is a
  // cycle further back up the line of the fall.
  const top = RAIN_WINDOW.y + tile * 0.6;
  const drops: Drop[] = [];
  for (let k = 0; k < COPIES; k++) {
    for (const d of base) {
      drops.push({ x: d.x - k * dx, y: top + d.y - k * tile });
    }
  }
  const xs = drops.map(d => d.x);
  const ys = drops.map(d => d.y);
  const pad = 4;
  const bx = Math.min(...xs) - pad;
  const by = Math.min(...ys) - DROP_UP * scale - pad;
  return {
    drops,
    box: {
      x: bx,
      y: by,
      w: Math.max(...xs) + DROP_W * scale + pad - bx,
      h: Math.max(...ys) + 4 * scale + pad - by,
    },
    scale,
    dx,
    dy: tile,
    t: spec.t,
    o: -frac(index * 0.37 + 0.2) * spec.t,
    opacity: spec.opacity,
  };
}

export const rainSheets: Sheet[] = SPECS.map(sheet);
