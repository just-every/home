import type { SeedReel, SeedStill } from '@/data/seed-types';

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
  reel: SeedReel | null;
  still: SeedStill | null;
}

/**
 * Where a visible card sits: the selected product's feature, one of the two
 * cards beside it, or a smaller card in the rows below (`m` five to a row,
 * `s` six).
 */
export type CardRole = 'feature' | 'side' | 'm' | 's';

export interface Placed {
  item: CollectionItem;
  role: CardRole;
  /** The incumbent to name; the one the visitor typed, where it applies. */
  replaces: string;
  /** Claude's reason, when a submitted search picked it. */
  reason: string | null;
}
