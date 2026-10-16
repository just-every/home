import { seedPageContent } from '@/data/seed-pages';
import type { SeedPageContent } from '@/data/seed-pages';
import type { SeedReel } from '@/data/seed-types';
import { upcoming } from '@/data/upcoming';
import { volumes } from '../landing/volumes';

/** A seed's page: its card facts joined to its page content. */
export interface SeedPageModel extends SeedPageContent {
  name: string;
  category: string;
  replaces: string[];
  primaryReplace: string;
  line: string;
  repo: string;
  pastel: string;
  ink: string;
  mark: string;
  /** In the works: public source, no release yet. */
  soon: boolean;
  homepage: string | null;
  reel: SeedReel | null;
  homepageShot: string | null;
}

const content = new Map(seedPageContent.map(page => [page.slug, page]));

const released: SeedPageModel[] = volumes.map(({ seed, ...volume }) => ({
  ...content.get(seed.slug)!,
  name: seed.name,
  category: seed.category,
  replaces: seed.replaces,
  primaryReplace: seed.primaryReplace,
  line: seed.line,
  repo: seed.repo,
  pastel: volume.colour,
  ink: volume.ink,
  mark: volume.mark,
  soon: false,
  homepage: seed.homepage,
  reel: seed.reel,
  homepageShot: seed.homepageShot,
}));

const inTheWorks: SeedPageModel[] = upcoming.map(seed => ({
  ...content.get(seed.slug)!,
  name: seed.name,
  category: seed.category,
  replaces: seed.replaces,
  primaryReplace: seed.primaryReplace,
  line: seed.line,
  repo: seed.repo,
  pastel: seed.pastel,
  ink: '#17171d',
  mark: seed.mark,
  soon: true,
  homepage: null,
  reel: null,
  homepageShot: null,
}));

/** Every seed page: the released seeds in collection order, then the coming soon. */
export const seedPages: SeedPageModel[] = [...released, ...inTheWorks];

export const findSeedPage = (slug: string) =>
  seedPages.find(page => page.slug === slug);

export const seedPath = (slug: string) => `/${slug}`;
