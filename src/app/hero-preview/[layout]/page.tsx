import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LandingPage } from '@/components/landing/LandingPage';
import { isHeroLayout } from '@/components/landing/hero/layouts';

export const metadata: Metadata = {
  title: 'Hero preview',
  robots: { index: false, follow: false },
};

/**
 * Temporary: the home page with one of the hero's layout options, for the
 * owner to compare at /hero-preview/1 to /hero-preview/4. Remove this route
 * once he picks one. It renders on request: the Worker build keeps no
 * incremental cache, so a prerendered-only route would answer 404 there.
 */
export default async function HeroPreview({
  params,
}: {
  params: Promise<{ layout: string }>;
}) {
  const layout = Number((await params).layout);
  if (!isHeroLayout(layout)) notFound();
  return <LandingPage heroLayout={layout} />;
}
