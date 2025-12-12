import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { WarpFieldCanvas } from '@/components/WarpFieldCanvas';
import { HomeHero } from '@/features/home/HomeHero';
import { getHomeVariant, getVariantIds } from '@/features/home/variants';

type PageProps = {
  params: Promise<{ variant: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getVariantIds().map(variant => ({ variant }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { variant } = await params;
  const config = getHomeVariant(variant);
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

export default async function VariantHomePage({ params }: PageProps) {
  const { variant } = await params;
  const config = getHomeVariant(variant);
  if (!config) notFound();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <WarpFieldCanvas config={config.warp} />
      <HomeHero variant={config} />
    </div>
  );
}
