/**
 * The everyday object that stands for each product, cut out of the approved
 * shelf scene as a transparent WebP. Sizes are the files' pixel sizes; the
 * files are drawn at twice the scene's scale, so half of each size is the
 * object's size on the 1536-wide design canvas.
 */
export interface ObjectArt {
  src: string;
  width: number;
  height: number;
  /** What the object is, for its alt text. */
  alt: string;
}

const art = (
  slug: string,
  width: number,
  height: number,
  alt: string
): ObjectArt => ({
  src: `/variants/objects/objects/${slug}.webp`,
  width,
  height,
  alt,
});

export const objectArt: Record<string, ObjectArt> = {
  slate: art('slate', 337, 273, 'A dark slate tile'),
  lamp: art('lamp', 349, 315, 'A green desk lamp, switched on'),
  pencil: art('pencil', 177, 317, 'A yellow cup of pencils'),
  mango: art('mango', 327, 277, 'A ripe mango'),
  dial: art('dial', 259, 230, 'A white dial'),
  cradle: art('cradle', 400, 227, 'A wooden cradle with a cushion'),
  penny: art('penny', 233, 206, 'A copper penny'),
  happytohelp: art('happytohelp', 272, 251, 'A smiling blue speech bubble'),
  orbit: art('orbit', 321, 240, 'A purple planet with orbit rings'),
  nook: art('nook', 316, 234, 'A green armchair'),
  spool: art('spool', 226, 232, 'A spool of red thread'),
  uptime: art('uptime', 302, 249, 'A small monitor showing a heartbeat line'),
  oncall: art('oncall', 233, 243, 'A red siren light'),
  vector: art('vector', 327, 224, 'A tray of coloured folders'),
};

/** The two shelves in the hero scene, left to right, as the scene draws them. */
export const shelves: string[][] = [
  ['slate', 'lamp', 'pencil', 'mango', 'dial', 'cradle', 'penny'],
  ['happytohelp', 'orbit', 'nook', 'spool', 'uptime', 'oncall', 'vector'],
];

/** Centre of each object on the 1536-wide hero canvas, for its shelf label. */
export const shelfLabelX: Record<string, number> = {
  slate: 177,
  lamp: 378,
  pencil: 570,
  mango: 752,
  dial: 948,
  cradle: 1157,
  penny: 1362,
  happytohelp: 192,
  orbit: 390,
  nook: 583,
  spool: 781,
  uptime: 976,
  oncall: 1179,
  vector: 1370,
};

/** Top of each shelf's label band on the hero canvas. */
export const shelfLabelY = [574, 779];
