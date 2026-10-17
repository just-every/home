import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { findSeedPage, seedPages } from '@/components/seed/model';
import { SeedPage } from '@/components/seed/SeedPage';
import { seedImage, seedUrl } from '@/components/seed/seoData';
import { siteMeta } from '@/content/meta';

/**
 * One page per seed, built ahead; any other slug is the 404 page (notFound
 * below). `dynamicParams` stays on: with it off, OpenNext's default cache
 * cannot tell a built page from an unknown one and 404s them all.
 */
export function generateStaticParams() {
  return seedPages.map(page => ({ slug: page.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = findSeedPage((await params).slug);
  if (!page) return {};
  const image = seedImage(page);
  const images = [
    {
      url: image.url,
      width: image.width,
      height: image.height,
      alt: `${page.name}: ${page.line}`,
    },
  ];
  return {
    title: { absolute: page.seoTitle },
    description: page.seoDescription,
    alternates: { canonical: seedUrl(page.slug) },
    // The seed's own mark colours (npm run favicons); these replace the
    // site's icons from the root layout on seed pages only.
    icons: {
      icon: [
        { url: `/img/favicons/${page.slug}.svg`, type: 'image/svg+xml' },
        {
          url: `/img/favicons/${page.slug}-32.png`,
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: `/img/favicons/${page.slug}-16.png`,
          sizes: '16x16',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/img/favicon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: seedUrl(page.slug),
      siteName: siteMeta.name,
      images,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoTitle,
      description: page.seoDescription,
      images: images.map(({ url, alt }) => ({ url, alt })),
    },
  };
}

export default async function SeedRoute({ params }: Props) {
  const page = findSeedPage((await params).slug);
  if (!page) notFound();
  return <SeedPage page={page} />;
}
