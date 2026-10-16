import type { Metadata } from 'next';

import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'Hero preview: dusk',
  robots: { index: false, follow: false },
};

/**
 * Temporary: the home page with the hero's "dusk" background, halfway between
 * / (the lighter rain-grey) and /hero-preview/storm, for the owner to compare.
 * Remove this route once he picks one. It renders on request, like
 * /hero-preview/storm.
 */
export const dynamic = 'force-dynamic';

export default function HeroPreviewDusk() {
  return <LandingPage heroTone="dusk" />;
}
