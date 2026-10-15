import type { ComponentType } from 'react';

import HeroA from '@/components/hero-variants/a';
import HeroB from '@/components/hero-variants/b';
import HeroE from '@/components/hero-variants/e';
import HeroG from '@/components/hero-variants/g';
import type { HeroVariantId } from '@/lib/hero-ab';

import { Hero } from './Hero';

export interface HeroEntry {
  component: ComponentType;
  /**
   * The hero's box set runs on past its foot, so the benefits strip is
   * stacked close over it. Heroes that end at their own foot leave this out
   * and the strip keeps a section's room above it.
   */
  shelf?: boolean;
}

/**
 * The component each hero variant renders (src/lib/hero-ab.ts lists the
 * variants). Every registered id needs one: a missing entry fails type-check.
 * The 12ui heroes are in src/components/hero-variants.
 */
export const heroes: Record<HeroVariantId, HeroEntry> = {
  control: { component: Hero, shelf: true },
  a: { component: HeroA },
  b: { component: HeroB },
  e: { component: HeroE },
  g: { component: HeroG },
};
