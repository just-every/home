import type { Metadata } from 'next';

import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'Hero preview: rain A, mostly rain',
  robots: { index: false, follow: false },
};

/**
 * Temporary: the home page on the dusk sky with rain option A (mostly rain),
 * for the owner to compare with rain-a to rain-c. Remove the three routes
 * once he picks one. It renders on request, like /hero-preview/dusk.
 */
export const dynamic = 'force-dynamic';

export default function HeroPreviewRainA() {
  return <LandingPage heroTone="dusk" heroRain="a" />;
}
