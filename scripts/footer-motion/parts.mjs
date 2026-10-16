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
  {
    // The dog's back half, laid over the tail so the tail at rest is hidden
    // behind the dog and swings out past its right hip. It never moves.
    id: 'dog',
    region: 'dog',
    box: [1100, 1320, 170, 214],
    still: true,
  },
];

/**
 * The tail: drawn here (the art shows the dog from behind with no tail), in
 * its own units with its root at 0 0, pointing right and curling up at the
 * tip. The page hangs it at `root` and turns it: pointing up (-90deg) it lies
 * wholly behind the dog, which is its rest; wagging, it sweeps out over the
 * grass. Cream, a lavender fringe below and a peach rim on top, the dog's
 * own colour classes.
 */
export const tail = {
  id: 'tail',
  root: [1180, 1478],
  box: [-16, -44, 160, 64],
  shapes: [
    [
      'cr',
      'M-4 -12C36 -15 80 -30 118 -34C130 -35 139 -30 136 -22C132 -13 118 -10 104 -6C70 4 34 14 -4 13Z',
    ],
    [
      'sh',
      'M6 6C40 4 78 -4 112 -11C124 -13 133 -17 136 -22C134 -10 122 -6 110 -1C98 4 92 10 80 8C70 13 58 12 48 15C34 18 18 17 4 14Z',
    ],
    [
      'c30',
      'M-4 -12C36 -15 80 -30 118 -34C130 -35 139 -30 136 -22C134 -28 126 -31 116 -30C80 -26 40 -10 -4 -8Z',
    ],
  ],
};

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
 * Blossom petals falling from the crown's lower edge, all inside the part of
 * the art that phones show too: [x, y, path (a, b or c), seconds, delay s,
 * size]. Delays spread them so a few are always in the air.
 */
export const petals = [
  [420, 560, 'a', 13, -1.5, 1],
  [640, 470, 'b', 14, -5.2, 1.15],
  [880, 610, 'c', 12, -9.8, 0.9],
  [1080, 520, 'a', 15, -3.6, 1.1],
  [1300, 600, 'b', 12.5, -7.4, 1],
  [760, 640, 'c', 13.5, -11.9, 1.2],
  [520, 650, 'b', 14.5, -12.8, 0.95],
  [1180, 470, 'c', 13, -0.4, 1.05],
  [980, 680, 'a', 12, -6.3, 1.15],
  [1420, 520, 'a', 14, -10.6, 0.9],
  [600, 560, 'c', 13, -4.4, 1],
  [1240, 640, 'a', 14, -8.8, 0.95],
];

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
