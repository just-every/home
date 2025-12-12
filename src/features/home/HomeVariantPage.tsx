import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HomeHero } from './HomeHero';
import { VariantBackground } from './VariantBackground';
import { getHomeVariant } from './variants';

export function getHomeVariantMetadata(variantId: string): Metadata {
  const config = getHomeVariant(variantId);
  if (!config) return {};

  const { title, description, robotsIndex } = config.metadata;

  return {
    title,
    description,
    robots: {
      index: robotsIndex,
      follow: true,
    },
  };
}

export function HomeVariantPage({ variantId }: { variantId: string }) {
  const config = getHomeVariant(variantId);
  if (!config) notFound();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <VariantBackground preset={config.background} />
      <HomeHero variant={config} />
    </div>
  );
}
