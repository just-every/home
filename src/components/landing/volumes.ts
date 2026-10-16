import type { CSSProperties } from 'react';

import { seeds } from '@/data/seeds';
import type { Seed } from '@/data/seeds';

/**
 * The label device: every product is a numbered volume in one box set, in its
 * own brand colours. Numbers follow seeds.ts order, so a new seed simply
 * becomes the next volume, everywhere on the page.
 */

/** A volume as the page uses it. */
export interface Volume {
  slug: string;
  name: string;
  /** The kind of product, one or two words: 'Support', 'Monitoring'. */
  family: string;
  /** Two-digit volume number: "01" upward. */
  number: string;
  /** The harmonised pastel, hex. */
  colour: string;
  /** Text and mark colour on that pastel (the brand ink), hex. */
  ink: string;
  /** URL of the SVG mark, already recoloured if needed. */
  mark: string;
  /** The product's own page. */
  href: string;
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

export const volumes: Volume[] = seeds.map((seed, index) => ({
  slug: seed.slug,
  name: seed.name,
  family: seed.family,
  number: String(index + 1).padStart(2, '0'),
  colour: seed.pastel,
  ink: seed.ink,
  mark: markFor(seed),
  href: `/${seed.slug}`,
  seed,
}));

/** The volume's colours as CSS custom properties. */
export function volumeStyle(
  volume: Pick<Volume, 'colour' | 'ink'>
): CSSProperties {
  return {
    '--pastel': volume.colour,
    '--brand-ink': volume.ink,
  } as CSSProperties;
}
