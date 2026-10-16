import type { SeedReel } from '@/data/seed-types';

/** A volume as the collection shows it; serialisable from the server. */
export interface CollectionItem {
  slug: string;
  number: string;
  name: string;
  family: string;
  category: string;
  replaces: string[];
  primaryReplace: string;
  line: string;
  headline: string | null;
  repo: string;
  homepage: string | null;
  mark: string;
  pastel: string;
  ink: string;
  /** Null for a product with no reel yet. */
  reel: SeedReel | null;
}

/** A product as the page shows it, in the box or as a card. */
export interface Shown {
  item: CollectionItem;
  /** The incumbent to name; the one the visitor typed, where it applies. */
  replaces: string;
  /** Claude's reason, when a submitted search picked it. */
  reason: string | null;
}

/**
 * A card's size in the grid: a big cover (the first row of three), or a
 * smaller card in the rows below (`m` five to a row, `s` six).
 */
export type CardRole = 'cover' | 'm' | 's';

export interface Placed extends Shown {
  role: CardRole;
}
