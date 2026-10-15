import type { ComponentType } from 'react';

import type { HeroVariantId } from '@/lib/hero-ab';

import { Hero } from './Hero';

/**
 * The component each hero variant renders (src/lib/hero-ab.ts lists the
 * variants). Every registered id needs one: a missing entry fails type-check.
 */
export const heroes: Record<HeroVariantId, ComponentType> = {
  control: Hero,
};
