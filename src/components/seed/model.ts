import { seedGallery } from '@/data/seed-gallery';
import type { SeedShot } from '@/data/seed-gallery';
import { seedPageContent } from '@/data/seed-pages';
import type { SeedPageContent, SeedPromise } from '@/data/seed-pages';
import type { SeedReel } from '@/data/seed-types';
import { upcoming } from '@/data/upcoming';
import { volumes } from '../landing/volumes';
import type { IconCategory } from './promise-icons';

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
  /** Product screenshots, in display order (scripts/gallery-ingest.mjs). */
  shots: SeedShot[];
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
  shots: seedGallery[seed.slug] ?? [],
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
  homepage: seed.homepage,
  reel: null,
  homepageShot: seed.homepageShot,
  shots: seedGallery[seed.slug] ?? [],
}));

/** Every seed page: the released seeds in collection order, then the coming soon. */
export const seedPages: SeedPageModel[] = [...released, ...inTheWorks];

export const findSeedPage = (slug: string) =>
  seedPages.find(page => page.slug === slug);

/** One picture in a seed's gallery: its reel, or a still in a window frame. */
export type GallerySlide =
  | { kind: 'reel'; reel: SeedReel; caption: string; thumb: string }
  | {
      kind: 'still';
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
      /** The host the frame's address bar shows; null for a neutral bar. */
      host: string | null;
      thumb: string;
    };

const host = (url: string) => new URL(url).host;

/**
 * A seed's gallery, in order: its reel if it has one, then the still of its
 * homepage, then its product screenshots.
 */
export function gallerySlides(page: SeedPageModel): GallerySlide[] {
  const slides: GallerySlide[] = [];
  if (page.reel) {
    slides.push({
      kind: 'reel',
      reel: page.reel,
      caption: `${page.name} in ${Math.round(page.reel.durationSeconds)} seconds`,
      thumb: page.reel.poster,
    });
  }
  if (page.homepageShot && page.homepage) {
    slides.push({
      kind: 'still',
      src: page.homepageShot,
      alt: `The ${page.name} homepage, ${host(page.homepage)}`,
      caption: `The ${page.name} homepage`,
      width: 1280,
      height: 720,
      host: host(page.homepage),
      thumb: page.homepageShot,
    });
  }
  for (const shot of page.shots) slides.push({ kind: 'still', ...shot });
  return slides;
}

/** A promise that leads the list with its kind's icon. */
export type LeadPromise = SeedPromise & { category: IconCategory };

const hasIcon = (promise: SeedPromise): promise is LeadPromise =>
  promise.category !== 'other';

/**
 * A seed's promises split for its page: up to four lead, each with its
 * kind's icon (the first promise of each kind in contract order, never an
 * `other`; four or two of them so they fill their rows, one when only one
 * kind has an icon), and the rest follow in contract order.
 */
export function splitPromises(promises: SeedPromise[]) {
  const kinds = new Set<IconCategory>();
  const first: LeadPromise[] = [];
  for (const promise of promises) {
    if (!hasIcon(promise) || kinds.has(promise.category)) continue;
    kinds.add(promise.category);
    first.push(promise);
  }
  const count = first.length >= 4 ? 4 : first.length >= 2 ? 2 : first.length;
  const lead = first.slice(0, count);
  const rest = promises.filter(promise => !lead.some(l => l === promise));
  return { lead, rest };
}
