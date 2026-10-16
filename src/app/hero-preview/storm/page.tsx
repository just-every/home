import type { Metadata } from 'next';

import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'Hero preview: storm',
  robots: { index: false, follow: false },
};

/**
 * Temporary: the home page with the hero's darker "storm" background, for the
 * owner to compare with / (layout 3, the lighter rain-grey). Remove this route
 * once he picks one. It renders on request, like /hero-preview/[layout].
 */
export const dynamic = 'force-dynamic';

export default function HeroPreviewStorm() {
  return <LandingPage heroTone="storm" />;
}
