/**
 * The light dusk colourways: the scene coloured from the card fills directly
 * above the footer instead of the seeds' deeper pastels, in fewer hue
 * families, so the art reads as one more of those cards.
 *
 * Each family starts at one card's fill (sampled from the rendered home page
 * and the stylesheets they come from) and steps down in that card's own hue,
 * gaining colour as it deepens so a deeper step stays that colour rather than
 * turning grey. Most of the scene stays in the upper steps; only the
 * shadows that carry a shape (the trunk's and the cypresses' edges, the
 * backpack, the jeans' folds) reach the deeper ones, and the hair, the
 * laptop, the birds and the dog's eyes stay the page's ink.
 */
import { chroma, lightness, mix, shade } from './colour.mjs';

/** The card fills above the footer, as rendered (1440 wide). */
export const CARDS = {
  /** "What should we build next?" (suggest.module.css --tint). */
  request: '#f3f1fe',
  /** "Run one yourself" (panels.module.css .install --tint). */
  runOne: '#ecf5ff',
  /** "Made something this good?" (panels.module.css .makers --tint). */
  makers: '#ebfaf3',
  /** The three quality cards ("Written down.", "Checked.", "Yours."; Stand.tsx). */
  writtenDown: '#e9f7f0',
  checked: '#e8f3ff',
  yours: '#fff8e3',
  /** The coming-soon cards: each upcoming seed's pastel at 26% on white. */
  auth: '#ecf8f4',
  chest: '#fcf6eb',
  easel: '#fef0ef',
  pier: '#eef9f8',
  purse: '#ffeff2',
  willow: '#f1f8ea',
};

/**
 * Dusk's peach (the sun, the walls, the skin) is no single card's: the
 * "Yours." cream taken 60% of the way to the Easel card's salmon lands on
 * mango's own hue at the cards' lightness.
 */
export const PEACH = mix(CARDS.yours, CARDS.easel, 0.6);

export const PAPER = '#f8f6fb';
export const INK = '#454350';
export const DEEP = mix(INK, '#17171d', 0.45);

/**
 * The family's colour at lightness L: the card's hue, its chroma growing by
 * GAIN for each unit of lightness it loses, up to CAP, so the deepest steps
 * are still soft pastels of that card.
 */
const GAIN = 0.32;
const CAP = 0.065;
function tone(card, L, gain = GAIN, cap = CAP) {
  const c0 = chroma(card);
  const want = Math.min(cap, c0 + gain * Math.max(0, lightness(card) - L));
  return shade(card, L, want / c0);
}

/** The sun glows: its disc takes its family's hue at twice the colour. */
const sunDisc = (card, L) => tone(card, L, GAIN * 2.4, 0.1);

/**
 * The lightness ladder every family shares, from the card's own fill (0) to
 * the deepest shadow edge (9). `lift` raises every step but the card's toward
 * it, for a lighter balance.
 */
const LADDER = [null, 0.948, 0.93, 0.912, 0.892, 0.87, 0.845, 0.8, 0.74, 0.66];

/**
 * f: the card fill for each hue family, by name. parts: the family each part
 * of the scene takes. lift: 0 for the standard balance, up to about 0.3 for
 * a paler one.
 */
export function lightScene({ families, parts, lift = 0 }) {
  const ladders = Object.fromEntries(
    Object.entries(families).map(([name, card]) => [
      name,
      LADDER.map((L, i) =>
        i === 0 ? card : tone(card, L + (lightness(card) - L) * lift)
      ),
    ])
  );
  /** Every colour the scene uses, by family, for the record. */
  const used = Object.fromEntries(
    Object.keys(families).map(f => [f, new Set()])
  );
  const use = (family, hex) => (used[family].add(hex), hex);
  /** Part p's colour at step i of its family's ladder. */
  const at = (p, i) => {
    const family = ladders[parts[p]];
    if (!family) throw new Error(`No family for ${p} (${parts[p]})`);
    return use(parts[p], family[i]);
  };
  const steps = (p, ...is) => is.map(i => at(p, i));
  const region = (pink, blue, over) => ({ pink, blue, over });
  const cream = '#fffaf3';
  const land = region(
    steps('field', 0, 1, 3),
    steps('grass', 2, 3, 5),
    steps('grass', 5, 6, 7)
  );
  const water = steps('water', 1, 3, 4);
  const sunCard = families[parts.sun];
  const sun = use(
    parts.sun,
    sunDisc(sunCard, LADDER[4] + (lightness(sunCard) - LADDER[4]) * lift)
  );
  const scene = {
    cream,
    shade: mix(cream, at('jeans', 4), 0.35),
    regions: {
      land,
      sky: region(steps('cloud', 0, 1, 2), [INK, INK, INK], [INK, INK, DEEP]),
      sun: region(
        [at('sun', 1), use(parts.sun, sunDisc(sunCard, LADDER[2])), sun],
        [sun, sun, sun],
        [sun, sun, sun]
      ),
      far: region(
        steps('hills', 0, 1, 2),
        steps('ridge', 2, 3, 4),
        steps('ridge', 5, 6, 7)
      ),
      sea: region(water, land.blue, land.over),
      bay: region(water, steps('shore', 2, 3, 5), steps('shore', 6, 7, 8)),
      village: region(
        steps('walls', 1, 3, 5),
        steps('roofs', 3, 5, 6),
        steps('roofs', 7, 8, 9)
      ),
      cypress: region(
        steps('field', 0, 1, 3),
        steps('cypress', 5, 6, 7),
        steps('cypress', 7, 8, 9)
      ),
      canopy: region(
        steps('blossom', 1, 3, 4),
        steps('leaf', 1, 3, 4),
        steps('leaf', 5, 6, 7)
      ),
      trunk: region(
        steps('bark', 1, 2, 3),
        steps('trunk', 4, 6, 7),
        steps('trunk', 7, 8, 9)
      ),
      backpack: region(
        steps('straps', 1, 3, 4),
        steps('backpack', 3, 5, 6),
        steps('backpack', 7, 8, 9)
      ),
      person: region(steps('skin', 1, 3, 4), steps('jeans', 3, 5, 6), [
        at('jeans', 8),
        INK,
        DEEP,
      ]),
      dog: region(
        [mix(cream, at('dog', 2), 0.5), at('dog', 1), at('dog', 3)],
        [
          mix(cream, at('jeans', 2), 0.5),
          mix(cream, at('jeans', 4), 0.6),
          at('jeans', 5),
        ],
        [INK, INK, DEEP]
      ),
      flowers: region(
        steps('flower', 2, 4, 6),
        [INK, INK, INK],
        [INK, INK, INK]
      ),
    },
  };
  /** Each family's card and the colours drawn from it, lightest first. */
  scene.families = Object.fromEntries(
    Object.entries(families).map(([f, card]) => [
      f,
      {
        card,
        colours: [...used[f]].sort((a, b) => lightness(b) - lightness(a)),
      },
    ])
  );
  return scene;
}
