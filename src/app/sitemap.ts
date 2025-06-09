import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justevery.com';

  const routes = [
    '',
    '/stack',
    '/showcase',
    '/docs',
    '/future',
    '/ensemble',
    '/task',
    '/magi',
    '/one',
    '/signup',
    '/contact',
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
