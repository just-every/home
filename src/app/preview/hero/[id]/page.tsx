import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  heroVariant,
  heroVariants,
} from '@/components/landing/heroVariants/variants';
import { LandingPage } from '@/components/landing/LandingPage';

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return heroVariants.map(variant => ({ id: variant.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const variant = heroVariant((await params).id);
  return {
    title: variant ? `Hero preview: ${variant.title}` : 'Hero preview',
    robots: { index: false, follow: false },
  };
}

/**
 * Preview only: the whole landing page with one header and hero look, for
 * the owner to compare (the list is at /preview/hero). Not in the sitemap,
 * and noindex.
 */
export default async function HeroPreview({ params }: { params: Params }) {
  const variant = heroVariant((await params).id);
  // Any id not in the list is a 404.
  if (!variant) notFound();
  return <LandingPage look={variant.look} />;
}
