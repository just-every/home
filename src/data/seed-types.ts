export type SeedStatus = 'public' | 'soon';

/** What a screenshot is. `app-stale` shows an earlier interface, before the current brand. */
export type SeedImageKind =
  | 'app'
  | 'app-stale'
  | 'brand-card'
  | 'homepage'
  | 'homepage-section';

export interface SeedImage {
  /** Full-size WebP, served from /public. */
  src: string;
  /** 800px-wide WebP. */
  src800: string;
  /** Pixel size of `src`. */
  width: number;
  height: number;
  /** Describes what the screenshot shows. */
  alt: string;
  kind: SeedImageKind;
}

export interface SeedReel {
  /** 1920x1080 H.264. Pass through assetUrl so production can serve it from R2. */
  src: string;
  /** 1280x720 H.264. Pass through assetUrl. */
  src720: string;
  /** WebP frame, served from /public (not R2). */
  poster: string;
  durationSeconds: number;
}

export interface Seed {
  slug: string;
  name: string;
  category: string;
  /** Every incumbent the product replaces. */
  replaces: string[];
  /** The one incumbent named on cards. */
  primaryReplace: string;
  /** The card line, verbatim from the copy deck. */
  line: string;
  /** The seed's own homepage headline, or null when none is final. */
  headline: string | null;
  /** Public GitHub repository, or null while the product is not yet public. */
  repo: string | null;
  status: SeedStatus;
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
  /** Mark fixed to its light-surface colours, where the product ships one. */
  markLight: string | null;
  /** Mark drawn in the ink colour, where the product ships one. */
  markInk: string | null;
  images: SeedImage[];
  reel: SeedReel | null;
}
