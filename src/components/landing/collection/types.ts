import type { SeedArea, SeedReel } from '@/data/seed-types';

/** A volume as the collection shows it; serialisable from the server. */
export interface CollectionItem {
  slug: string;
  number: string;
  name: string;
  family: string;
  area: SeedArea;
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
  /** A still of its homepage, for a product with no reel. */
  homepageShot: string | null;
}

/** A product as the page shows it, as a card. */
export interface Shown {
  item: CollectionItem;
  /** The incumbent to name; the one the visitor typed, where it applies. */
  replaces: string;
  /** Claude's reason, when a submitted search picked it. */
  reason: string | null;
}

/** One area's small heading over its products, in volume order. */
export interface Area {
  id: SeedArea;
  heading: string;
  items: Shown[];
}
