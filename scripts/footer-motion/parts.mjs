/**
 * The footer art's moving parts. A part is a patch of one scene region (a
 * polygon of the dog, the person's head, one bird in the sky): the region's
 * own drawing is repeated inside the patch in a group that CSS can move, and
 * the original gets a hole there, so the part can swing without leaving a
 * ghost behind. At rest the repeat covers the hole exactly (it is grown a
 * little past it), so the picture is the one the colour script made.
 *
 * Coordinates are the art's own units (viewBox -1984 -420 7040 2186).
 */

const rect = (x1, y1, x2, y2) => [
  [x1, y1],
  [x2, y1],
  [x2, y2],
  [x1, y2],
];

/**
 * group: the region the part is cut from. poly: its outline. grow: how far
 * the repeat reaches past the outline. two: a second wrapper inside, for a
 * part with two motions (a bird glides and flaps).
 */
export const parts = [
  {
    id: 'tail',
    group: 'dog',
    // The dark shadow and the peach curl at the dog's right hip.
    poly: [
      [1192, 1388],
      [1224, 1388],
      [1236, 1440],
      [1244, 1470],
      [1240, 1512],
      [1210, 1514],
      [1196, 1500],
      [1186, 1470],
      [1184, 1440],
      [1190, 1415],
    ],
    grow: 8,
  },
  {
    id: 'ear',
    group: 'dog',
    // The right ear, hanging by its fold.
    poly: [
      [1170, 1196],
      [1215, 1196],
      [1232, 1215],
      [1236, 1245],
      [1228, 1262],
      [1190, 1262],
      [1168, 1250],
      [1166, 1215],
    ],
    grow: 8,
  },
  {
    id: 'head',
    group: 'person',
    // The hair and head, cut across the neck above the collar.
    poly: rect(540, 885, 780, 1076),
    grow: 6,
  },
  { id: 'bird1', group: 'sky', poly: rect(2535, 675, 2613, 718), grow: 3, two: true },
  { id: 'bird2', group: 'sky', poly: rect(2689, 703, 2765, 748), grow: 3, two: true },
  { id: 'bird3', group: 'sky', poly: rect(2397, 754, 2487, 804), grow: 3, two: true },
];

/** Glints on the water: the pale dashes already in the bay, brightened now and then. [cx, cy, rx, delay s, cycle s] */
export const glints = [
  [3484, 1264, 30, 0, 7],
  [3512, 1222, 34, 2.4, 9],
  [3407, 1356, 26, 5.1, 8],
  [3766, 1361, 42, 1.3, 10],
  [3832, 1288, 22, 6.2, 7.5],
  [3925, 1385, 44, 3.7, 9.5],
  [4019, 1425, 42, 0.8, 8.5],
  [4066, 1336, 28, 4.6, 7],
  [4109, 1263, 34, 7.4, 10],
  [4190, 1294, 30, 2.1, 8],
  [3942, 1481, 34, 5.8, 9],
  [3580, 1438, 38, 1.9, 7.5],
  [3892, 1251, 20, 8.1, 8],
];

/** Streaks in the sun's reflection, in the paper's colour. [cx, cy, rx, delay s, cycle s] */
export const streaks = [
  [1960, 1218, 26, 0, 6],
  [1958, 1236, 30, 2.2, 7],
  [1950, 1262, 38, 4.1, 8],
  [1950, 1296, 44, 1.2, 6.5],
  [1975, 1323, 34, 3.3, 7.5],
];

/** Blossom petals: [x, y at the canopy's edge, drift x, fall y, spin deg, cycle s, delay s]. */
export const petals = [
  [905, 650, 150, 400, 220, 23, -3],
  [960, 690, 120, 380, -180, 29, -14],
  [800, 600, 170, 420, 260, 26, -20],
  [1110, 540, 160, 420, 200, 31, -9],
  [1230, 500, 140, 400, -240, 27, -24],
];
