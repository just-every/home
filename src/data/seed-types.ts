export interface SeedReel {
  /** 1280x720 H.264. Pass through assetUrl so production can serve it from R2. */
  src: string;
  /** WebP frame, served from /public (not R2). */
  poster: string;
  durationSeconds: number;
}

/**
 * The part of a business a seed serves; the collection groups its products
 * under one small heading per area (headings in src/content/landing.ts).
 */
export type SeedArea =
  | 'customers'
  | 'team'
  | 'engineering'
  | 'finance'
  | 'people'
  | 'operations';

export interface Seed {
  slug: string;
  name: string;
  category: string;
  /** The one- or two-word kind of product, e.g. 'Support'. */
  family: string;
  area: SeedArea;
  /** Every incumbent the product replaces. */
  replaces: string[];
  /** The one incumbent named on cards. */
  primaryReplace: string;
  /** The card line, verbatim from the copy deck. */
  line: string;
  /** The seed's own homepage headline, or null when none is final. */
  headline: string | null;
  /** Public GitHub repository. */
  repo: string;
  /**
   * The product's own homepage, only where it answers today (checked with
   * curl when added); null until it is live.
   */
  homepage: string | null;
  accent: string;
  ink: string;
  paper: string;
  /**
   * The brand colour softened to a pastel (OKLCH, lightness about 0.82 to
   * 0.93) so every seed's pastel sits with the others in one set. Derived
   * from `accent`, or from `ink` where the seed says so.
   */
  pastel: string;
  /**
   * How the mark sits on `pastel`: in its own colours, or redrawn in `ink`
   * alone (lighter colours as lighter tints of it) where its colours would
   * vanish into the pastel.
   */
  markOnPastel: 'colour' | 'ink';
  /** Mark for light surfaces (may adapt to a dark colour scheme itself). */
  mark: string;
  /**
   * True while the seed's repo has no designed mark of its own (Base's
   * placeholder "F" tile, or Glove's plain disc): `mark` is then a lettered
   * tile, its initial in the page's ink on its pastel, for a real mark to
   * replace.
   */
  markPlaceholder?: true;
  /** Mark fixed to its light-surface colours, where the product ships one. */
  markLight: string | null;
  /** Mark drawn in the ink colour, where the product ships one. */
  markInk: string | null;
  /** The product's launch reel, or null until it has one. */
  reel: SeedReel | null;
  /**
   * A 1280x720 still of `homepage` above the fold, which the collection's box
   * shows for a product with no reel yet; null otherwise.
   */
  homepageShot: string | null;
}
