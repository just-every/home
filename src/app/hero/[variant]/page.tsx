import { notFound } from 'next/navigation';

import { LandingPage } from '@/components/landing/LandingPage';
import { HERO_VARIANTS, isHeroVariant } from '@/lib/hero-ab';

/**
 * The home page, one static page per hero variant. Visitors never see this
 * path: src/middleware.ts serves `/` from here, with the variant it assigned
 * (or the one `?hero=` forced), and refuses the path itself.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return HERO_VARIANTS.map(({ id }) => ({ variant: id }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  if (!isHeroVariant(variant)) notFound();
  return <LandingPage hero={variant} />;
}
