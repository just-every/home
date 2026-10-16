import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LandingPage } from '@/components/landing/LandingPage';
import { HERO_LAYOUTS, isHeroLayout } from '@/components/landing/hero/layouts';

/**
 * Temporary: the home page with one of the hero's layout options, for the
 * owner to compare at /hero-preview/1 to /hero-preview/4. Remove this route
 * once he picks one.
 */
export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'Hero preview',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return HERO_LAYOUTS.map(layout => ({ layout: String(layout) }));
}

export default async function HeroPreview({
  params,
}: {
  params: Promise<{ layout: string }>;
}) {
  const layout = Number((await params).layout);
  if (!isHeroLayout(layout)) notFound();
  return <LandingPage heroLayout={layout} />;
}
