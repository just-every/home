import { siteMeta } from '@/content/meta';

import type { SeedPageModel } from './model';

/** The page's address, absolute. */
export const seedUrl = (slug: string) => `${siteMeta.url}/${slug}`;

/** The share image: the reel's poster, the homepage still, else the site's. */
export function seedImage(page: SeedPageModel) {
  if (page.reel) {
    return { url: page.reel.poster, width: 1280, height: 720 };
  }
  if (page.homepageShot) {
    return { url: page.homepageShot, width: 1280, height: 720 };
  }
  return siteMeta.ogImage;
}

/** schema.org SoftwareApplication, free and MIT licensed. */
export function seedJsonLd(page: SeedPageModel) {
  const image = seedImage(page);
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: page.name,
    description: page.seoDescription,
    url: seedUrl(page.slug),
    image: `${siteMeta.url}${image.url}`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: page.category,
    ...(page.version ? { softwareVersion: page.version } : {}),
    operatingSystem: page.runsOn,
    license: 'https://opensource.org/licenses/MIT',
    codeRepository: page.repo,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': `${siteMeta.url}/#organization` },
    ...(page.homepage ? { sameAs: [page.homepage] } : {}),
  };
}
