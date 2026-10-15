/**
 * The footer illustration's colourways. Each one colours the scene by region
 * with the collection's own pastels (the `pastel` of each seed in
 * src/data/seeds.ts: the product cards and the box-set spines), and keeps the
 * drawing's values: a region's pink plate takes one pastel in three tints, its
 * blue plate another pastel with a deeper step of it, and where the two
 * overprinted, its shadows step down toward the page's own ink (#454350, the
 * footer's link colour, and below it the page text). The darkest shapes (hair,
 * laptop, birds, cypress and trunk shadows) end on those inks; the shirt and
 * the dog stay the lightest shapes.
 *
 * A colourway names a pastel for each part of the scene; `scene()` turns that
 * into every region's colours. A region is { pink: [light, mid, full],
 * blue: [light, mid, full], over: [light, mid, full pink over full blue] };
 * scripts/footer-colours.mjs writes them into the art.
 */
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mix, seedPastels } from './colour.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const P = seedPastels(resolve(root, 'src/data/seeds.ts'));

/** The footer paper and the page's inks. */
export const PAPER = '#f8f6fb';
export const INK = '#454350';
export const DEEP = mix(INK, '#17171d', 0.45);

const deepen = (c, t) => mix(c, INK, t);
const tints = (c, a = 0.45, b = 0.75) => [
  mix(PAPER, c, a),
  mix(PAPER, c, b),
  c,
];
/** A body colour (blue plate): pale, the colour, and a step deeper. */
const body = (c, step) => [mix(PAPER, c, 0.55), c, deepen(c, step)];
/** Where pink overprinted the full body: its shadows, down toward the ink. */
const shadows = (c, a, b, end = mix(c, DEEP, 0.82)) => [
  deepen(c, a),
  deepen(c, b),
  end,
];
const solid = c => [c, c, c];
const region = (pink, blue, over) => ({ pink, blue, over });

/**
 * s: the pastel (or mix) for each part. depth scales every shadow step, for a
 * lighter or a deeper colourway.
 */
function scene(s, depth = 1.2) {
  const d = t => Math.min(0.9, t * depth);
  const cream = '#fffaf3';
  const land = region(
    tints(s.field),
    body(s.grass, d(0.1)),
    shadows(s.grass, d(0.3), d(0.5))
  );
  const water = [mix(PAPER, s.water, 0.5), s.water, deepen(s.water, d(0.1))];
  return {
    cream,
    shade: mix(cream, P.uptime, 0.4),
    regions: {
      land,
      sky: region(tints(s.cloud), solid(INK), [INK, INK, DEEP]),
      sun: region(tints(s.sun), solid(s.sun), solid(s.sun)),
      far: region(
        tints(s.hills),
        body(s.ridge, d(0.18)),
        shadows(s.ridge, d(0.32), d(0.55))
      ),
      sea: region(water, land.blue, land.over),
      bay: region(
        water,
        body(s.shore, d(0.14)),
        shadows(s.shore, d(0.32), d(0.55))
      ),
      village: region(
        [mix(PAPER, s.walls, 0.5), s.walls, deepen(s.walls, 0.12)],
        [mix(PAPER, s.roofs, 0.6), deepen(s.roofs, 0.1), deepen(s.roofs, 0.25)],
        [deepen(s.roofs, 0.45), INK, DEEP]
      ),
      cypress: region(
        tints(s.field),
        [s.cypress, deepen(s.cypress, d(0.3)), deepen(s.cypress, d(0.42))],
        [deepen(s.cypress, d(0.5)), deepen(s.cypress, d(0.62)), DEEP]
      ),
      canopy: region(tints(s.blossom, 0.5, 0.8), body(s.leaf, d(0.08)), [
        deepen(s.leaf, d(0.26)),
        deepen(s.leaf, d(0.4)),
        deepen(s.leaf, d(0.54)),
      ]),
      trunk: region(
        // the sunlit edge of the wood, between the bark tone and the blossom
        // it meets inside the crown
        tints(mix(s.bark, s.blossom, 0.5)),
        body(s.trunk, d(0.22)),
        [deepen(s.trunk, d(0.42)), deepen(s.trunk, d(0.58)), DEEP]
      ),
      backpack: region(tints(s.straps), body(s.backpack, 0.28), [
        deepen(s.backpack, 0.48),
        deepen(s.backpack, 0.62),
        DEEP,
      ]),
      person: region(
        [mix(PAPER, s.skin, 0.5), s.skin, mix(s.skin, P.penny, 0.6)],
        body(s.jeans, 0.35),
        [deepen(s.jeans, 0.55), INK, DEEP]
      ),
      dog: region(
        [mix(cream, P.mango, 0.35), mix(cream, P.mango, 0.6), P.mango],
        [mix(cream, P.uptime, 0.5), mix(cream, P.uptime, 0.8), P.uptime],
        [INK, INK, DEEP]
      ),
      flowers: region(
        [mix(PAPER, s.flower, 0.6), s.flower, s.flowerFull],
        solid(INK),
        solid(INK)
      ),
    },
  };
}

export const colourways = {
  meadow: {
    note: 'Mint and lime greens, aqua water, lavender and periwinkle hills, a gold sun, a yellow field, pink blossom and flowers.',
    ...scene({
      leaf: mix(P.slate, P.cradle, 0.3),
      blossom: P.nook,
      trunk: P.penny,
      bark: P.mango,
      grass: mix(P.cradle, P.slate, 0.4),
      field: P.lamp,
      flower: P.nook,
      flowerFull: mix(P.nook, '#c24e5b', 0.3),
      water: P.happytohelp,
      shore: P.slate,
      hills: P.uptime,
      ridge: P.vector,
      sun: P.pencil,
      cloud: P.orbit,
      cypress: P.slate,
      walls: P.mango,
      roofs: P.penny,
      backpack: P.uptime,
      straps: P.orbit,
      jeans: P.vector,
      skin: P.mango,
    }),
  },
  dusk: {
    note: 'The two inks made pastel: a lavender and periwinkle tree with pink blossom, dusk-blue grass, a salmon field, aqua water, a peach sun.',
    ...scene({
      leaf: mix(P.vector, P.uptime, 0.45),
      blossom: P.nook,
      trunk: mix(P.uptime, P.penny, 0.35),
      bark: P.orbit,
      grass: mix(P.oncall, P.vector, 0.35),
      field: P.orbit,
      flower: P.nook,
      flowerFull: mix(P.nook, '#c24e5b', 0.35),
      water: P.happytohelp,
      shore: P.oncall,
      hills: P.nook,
      ridge: P.uptime,
      sun: P.mango,
      cloud: P.nook,
      cypress: mix(P.vector, P.uptime, 0.5),
      walls: P.mango,
      roofs: P.orbit,
      backpack: P.vector,
      straps: P.orbit,
      jeans: P.uptime,
      skin: P.mango,
    }),
  },
  orchard: {
    note: 'Warm and ripe: a lime tree with salmon blossom, mint grass, a gold field, clay bark, dusk-blue water, mint and tan hills, a peach sun.',
    ...scene({
      leaf: P.cradle,
      blossom: P.orbit,
      trunk: P.penny,
      bark: P.pencil,
      grass: mix(P.slate, P.cradle, 0.35),
      field: P.pencil,
      flower: P.orbit,
      flowerFull: mix(P.orbit, '#e85b1e', 0.3),
      water: P.oncall,
      shore: P.slate,
      hills: P.dial,
      ridge: P.slate,
      sun: P.mango,
      cloud: P.mango,
      cypress: P.slate,
      walls: P.dial,
      roofs: P.penny,
      backpack: P.penny,
      straps: P.pencil,
      jeans: P.oncall,
      skin: P.mango,
    }),
  },
  coast: {
    note: 'Cool and fresh: a mint tree with lemon blossom, lime grass, a sand field, deep aqua water, periwinkle hills, a salmon sun, pink flowers.',
    ...scene({
      leaf: P.slate,
      blossom: P.spool,
      trunk: P.dial,
      bark: P.lamp,
      grass: P.cradle,
      field: P.dial,
      flower: P.nook,
      flowerFull: mix(P.nook, '#c24e5b', 0.3),
      water: mix(P.happytohelp, P.vector, 0.2),
      shore: P.slate,
      hills: P.oncall,
      ridge: P.vector,
      sun: P.orbit,
      cloud: P.nook,
      cypress: P.slate,
      walls: P.lamp,
      roofs: P.orbit,
      backpack: P.vector,
      straps: P.spool,
      jeans: P.vector,
      skin: P.mango,
    }),
  },
};

export const defaultColourway = 'meadow';
