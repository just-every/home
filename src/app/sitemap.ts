import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justevery.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...['process', 'journey'].map(slug => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date('2026-10-14'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
