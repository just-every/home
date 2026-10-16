import { MetadataRoute } from 'next';

import { seedPages } from '@/components/seed/model';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justevery.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date('2026-10-16'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...['process', 'journey', 'contact'].map(slug => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date('2026-10-14'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...seedPages.map(page => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date('2026-10-16'),
      changeFrequency: 'monthly' as const,
      priority: page.soon ? 0.5 : 0.8,
    })),
  ];
}
