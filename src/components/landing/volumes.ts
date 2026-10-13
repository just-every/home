import type { CSSProperties } from 'react';

import { seeds } from '@/data/seeds';
import type { Seed } from '@/data/seeds';

import type { ShelfVolume } from './shelf3d/types';

/**
 * The label device: every product is a numbered volume in one box set, in its
 * own brand colours. Numbers follow seeds.ts order, so a new seed simply
 * becomes the next volume, everywhere on the page.
 */

export type { ShelfVolume };

/** A volume as the page uses it: the shelf fields plus the seed's facts. */
export interface Volume extends ShelfVolume {
  seed: Seed;
}

/**
 * The real mark on the volume's pastel. Where the seed's own colours would
 * vanish into it (`markOnPastel: 'ink'`), it is the copy under
 * public/landing/marks/, redrawn in the brand ink alone over the pastel
 * (each file notes how); otherwise the mark that keeps its light-surface
 * colours.
 */
function markFor(seed: Seed): string {
  if (seed.markOnPastel === 'ink') return `/landing/marks/${seed.slug}.svg`;
  return seed.markLight ?? seed.markInk ?? seed.mark;
}

export const cardId = (slug: string) => `vol-${slug}`;

export const volumes: Volume[] = seeds.map((seed, index) => ({
  slug: seed.slug,
  name: seed.name,
  number: String(index + 1).padStart(2, '0'),
  colour: seed.pastel,
  ink: seed.ink,
  mark: markFor(seed),
  tagline: seed.headline,
  href: `#${cardId(seed.slug)}`,
  seed,
}));

export const volumeCount = volumes.length;

/**
 * Every volume in display order, for the hero's shelf. The first is the
 * featured volume, shown face out with its tagline (Uptime).
 */
export function labelVolumes(): ShelfVolume[] {
  return volumes.map(
    ({ slug, name, number, colour, ink, mark, tagline, href }) => ({
      slug,
      name,
      number,
      colour,
      ink,
      mark,
      tagline,
      href,
    })
  );
}

/** The volume's colours as CSS custom properties. */
export function volumeStyle(volume: ShelfVolume): CSSProperties {
  return {
    '--pastel': volume.colour,
    '--brand-ink': volume.ink,
  } as CSSProperties;
}
