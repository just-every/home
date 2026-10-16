import type { Metadata } from 'next';

import { ProductsPage } from '@/components/landing/ProductsPage';
import { products } from '@/content/landing';
import { siteMeta } from '@/content/meta';
import { seeds } from '@/data/seeds';
import { upcoming } from '@/data/upcoming';
import { numberWord } from '@/lib/number-word';

const url = `${siteMeta.url}${products.path}`;
const title = products.title(numberWord(seeds.length + upcoming.length));
const description = products.description(seeds.length, upcoming.length);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: siteMeta.name,
    images: [siteMeta.ogImage],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [siteMeta.ogImage.url],
  },
};

/** /products: every product, searchable. */
export default function Products() {
  return <ProductsPage />;
}
