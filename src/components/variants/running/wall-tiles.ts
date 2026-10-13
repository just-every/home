/**
 * The hero wall keeps the approved design's nine-slot composition, and every
 * slot shows a product with a current app screenshot. Each tile is a crop of
 * the product's real screenshot (`seed.images[imageIndex]`, from
 * public/seeds/<slug>) at the rectangle below, saved at the source's own
 * resolution as public/variants/running/wall/<slug>.webp plus a half-size
 * <slug>-half.webp.
 */
export interface WallTile {
  slug: string;
  imageIndex: number;
  /** Crop rectangle in the source screenshot's pixels. */
  crop: { x: number; y: number; width: number; height: number };
  /** Describes what the crop shows. */
  alt: string;
  /** CSS object-position when the slot's shape differs from the crop. */
  focus?: string;
}

export const wallRows: {
  top: WallTile[];
  middle: WallTile[];
  bottom: WallTile[];
} = {
  top: [
    {
      slug: 'slate',
      imageIndex: 0,
      crop: { x: 0, y: 0, width: 700, height: 418 },
      alt: 'Slate: a wiki page open in the editor, beside the sidebar with search and the page tree',
    },
    {
      slug: 'vector',
      imageIndex: 0,
      crop: { x: 0, y: 0, width: 760, height: 420 },
      alt: 'Vector: the current stream of issues needing a decision, beside the selected issue',
    },
    {
      slug: 'nook',
      imageIndex: 0,
      crop: { x: 0, y: 0, width: 820, height: 548 },
      alt: 'Nook: a team channel conversation, beside the channel list',
    },
    {
      slug: 'happytohelp',
      imageIndex: 0,
      crop: { x: 0, y: 0, width: 800, height: 496 },
      alt: 'HappyToHelp: the inbox with a customer conversation open',
    },
  ],
  middle: [
    {
      slug: 'orbit',
      imageIndex: 0,
      crop: { x: 30, y: 0, width: 1100, height: 380 },
      alt: 'Orbit: the NOW queue of deals to work next',
    },
    {
      slug: 'spool',
      imageIndex: 0,
      crop: { x: 0, y: 0, width: 1440, height: 352 },
      alt: 'Spool: a JavaScript TypeError issue with its evidence packet',
    },
  ],
  bottom: [
    {
      slug: 'cradle',
      imageIndex: 0,
      crop: { x: 0, y: 0, width: 1000, height: 268 },
      alt: 'Cradle: the records workspace',
    },
    {
      slug: 'uptime',
      imageIndex: 0,
      crop: { x: 0, y: 0, width: 900, height: 350 },
      alt: 'Uptime: the monitors overview with healthy, failing, unknown and degraded counts',
    },
    {
      slug: 'lamp',
      imageIndex: 0,
      crop: { x: 200, y: 0, width: 1000, height: 362 },
      alt: 'Lamp: a public status page showing its overall status',
      focus: 'center top',
    },
  ],
};
