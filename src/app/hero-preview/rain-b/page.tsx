import type { Metadata } from 'next';

import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'Hero preview: rain B, receipts',
  robots: { index: false, follow: false },
};

/**
 * Temporary: the home page on the dusk sky with rain option B (receipts),
 * for the owner to compare with rain-a to rain-c. Remove the three routes
 * once he picks one. It renders on request, like /hero-preview/dusk.
 */
export const dynamic = 'force-dynamic';

export default function HeroPreviewRainB() {
  return <LandingPage heroTone="dusk" heroRain="b" />;
}
