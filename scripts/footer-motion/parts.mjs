/**
 * The footer art's moving parts, in the art's own units (viewBox -1984 -420
 * 7040 2186). Each becomes a small SVG in public/landing/footer/motion/ that
 * the page lays over the static art and moves with CSS transforms
 * (src/components/landing/FooterMotion.tsx). The big art never moves.
 *
 * A cut part is a piece of the art itself: everything the art draws inside
 * `box`, kept to the `region` silhouette (the region's clip) and to `poly`
 * when given. The static art then loses that piece (`hole`: its layers are
 * masked out there) or has it painted over (`fill`: a flat colour class of
 * the region, for the shadow a lifted ear leaves). The piece reaches `grow`
 * units past its hole, so at rest it covers the hole's edge and the picture
 * is the one the colour script made.
 *
 * `origin` is the pivot of the part's transform, in art units.
 */

const rect = (x1, y1, x2, y2) => [
  [x1, y1],
  [x2, y1],
  [x2, y2],
  [x1, y2],
];

/** A bird's box: the same size for all three, so they share keyframes. */
const bird = (cx, cy) => ({
  box: [cx - 48, cy - 30, 96, 56],
  origin: [cx, cy + 10],
});

export const cuts = [
  // The three birds over the bay, origins at the V's body (the wingbeat pivot).
  { id: 'bird1', ...bird(2575, 695), hole: 'box' },
  { id: 'bird2', ...bird(2727, 725), hole: 'box' },
  { id: 'bird3', ...bird(2442, 780), hole: 'box' },
  {
    // The head and hair, cut across the neck above the collar; it tilts on
    // the neck.
    id: 'head',
    region: 'person',
    box: [536, 876, 248, 210],
    poly: rect(536, 876, 784, 1080),
    hole: rect(536, 876, 784, 1074),
    origin: [608, 1076],
  },
  {
    // The dog's right ear (the lavender lobe and its peach rim), hung from
    // the top of the head.
    id: 'ear',
    region: 'dog',
    box: [1166, 1192, 70, 76],
    poly: [
      [1177, 1203],
      [1191, 1199],
      [1224, 1212],
      [1226, 1220],
      [1229, 1230],
      [1228, 1247],
      [1223, 1258],
      [1216, 1260],
      [1203, 1257],
      [1193, 1250],
      [1187, 1233],
      [1180, 1225],
      [1175, 1213],
    ],
    grow: 3,
    // The neck's shadow lavender shows where the ear lifts away.
    fill: 'c02',
    origin: [1196, 1201],
  },
];

/** A petal: a pink teardrop with a paler half, in a 56-unit box. */
export const petal = {
  id: 'petal',
  box: [-28, -28, 56, 56],
  shapes: [
    ['c30', 'M-23 2C-17 -14 4 -19 23 -5C16 10 -7 18 -23 2Z'],
    ['c20', 'M-23 2C-14 -9 4 -12 23 -5C5 -3 -9 0 -23 2Z'],
  ],
};

/**
 * Blossom petals that come loose under the crown and drift down toward the
 * grass, spread across the crown's width. Each falls on its own beat (all the
 * timings are prime-ish, so no two ever line up), swinging side to side like
 * a leaf (a pendulum: tilted and lifted at each end of its swing, lowest and
 * fastest in the middle) while it flutters over: [x, y, drift (units right),
 * fall (units down), seconds, delay s, size, swing (units each side), swing
 * s (one way), flutter s (one way), turn (its resting angle)].
 */
export const petals = [
  [170, 470, 260, 700, 15, -2, 0.9, 40, 1.7, 1.1, -20],
  [390, 520, 180, 760, 17, -9.3, 1.1, 55, 2.1, 1.4, 35],
  [570, 640, 300, 640, 14, -5.6, 0.85, 34, 1.5, 0.9, 10],
  [770, 660, 220, 640, 16, -12.7, 1, 50, 1.9, 1.3, -40],
  [940, 600, 340, 700, 18.5, -3.4, 1.2, 60, 2.3, 1.6, 60],
  [1110, 560, 260, 680, 15.5, -14.1, 0.95, 45, 1.8, 1.2, -5],
  [1290, 520, 200, 720, 17.5, -7.7, 1.05, 55, 2, 1.5, 25],
  [1450, 470, 280, 650, 14.5, -10.6, 0.8, 40, 1.6, 1, -30],
  [690, 520, 240, 780, 19.5, -16.4, 1.15, 64, 2.4, 1.7, 50],
];

/**
 * The birds' flights over the bay, left to right, the first two as a pair
 * and the third on its own, lower and slower: each
 * fades in `from` units left of where the art drew it and out `to` units
 * right of it, over `seconds`. On the way it rises and sinks by `rise` units
 * every `wave` seconds (one way), banking into each climb and dive, and its
 * wings beat three times quickly and then it glides, every `beat` seconds.
 */
export const flights = {
  bird1: {
    from: 1050,
    to: 850,
    seconds: 33,
    delay: -12,
    rise: 30,
    wave: 3.6,
    beat: 3.3,
  },
  bird2: {
    from: 1060,
    to: 840,
    seconds: 33,
    delay: -12,
    rise: 24,
    wave: 4.3,
    beat: 3.9,
  },
  bird3: {
    from: 950,
    to: 1000,
    seconds: 43,
    delay: -31,
    rise: 40,
    wave: 5.1,
    beat: 4.6,
  },
};

/**
 * The laptop's screen, which shows code typing out line by line while the
 * block scrolls slowly up. The screen is a slanted parallelogram in the art:
 * its top left corner at `origin`, its top edge along `x` and its left edge
 * along `y` (art units). The code area sits `inset` units inside the screen
 * [left, top, right, bottom], with `radius` corners. Rows are `pitch` units
 * apart and `line` units tall; the row being typed sits `band` units down the
 * code area, and a new row starts every `seconds`. Each row lists its
 * segments [x, length] in code-area units; an empty row is a pause.
 */
export const screen = {
  origin: [807.6, 1180],
  x: [177, 3.08],
  y: [-36.6, 113],
  inset: [3, 3, 3, 8],
  radius: 6,
  pitch: 10.5,
  line: 4.2,
  band: 92,
  seconds: 1.5,
  rows: [
    [[14, 52]],
    [
      [23, 30],
      [57, 40],
    ],
    [[32, 62]],
    [[32, 24]],
    [[23, 12]],
    [],
    [
      [14, 44],
      [62, 22],
    ],
    [[23, 74]],
    [[32, 36]],
    [
      [32, 50],
      [86, 18],
    ],
    [[23, 14]],
    [[14, 8]],
  ],
};

/**
 * Glints on the sea: three sets of short pale dashes over the sun's
 * reflection and the open water, each set fading in and out on its own beat.
 * [cx, cy, rx] in art units; the sets share one box.
 */
export const glintBox = [1680, 1170, 1150, 170];
export const glints = [
  [
    [1905, 1196, 31],
    [2010, 1231, 22],
    [1962, 1289, 36],
    [2240, 1214, 20],
    [2520, 1226, 17],
    [1765, 1250, 17],
    [2700, 1214, 15],
  ],
  [
    [1975, 1210, 25],
    [1924, 1259, 28],
    [2048, 1305, 20],
    [2150, 1240, 17],
    [2400, 1222, 22],
    [1800, 1206, 14],
    [2610, 1236, 17],
  ],
  [
    [2030, 1183, 20],
    [1890, 1232, 22],
    [1995, 1324, 25],
    [2310, 1218, 17],
    [2085, 1262, 14],
    [1712, 1230, 14],
    [2790, 1222, 14],
  ],
];
