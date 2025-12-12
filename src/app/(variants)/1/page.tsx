import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('1');
}

export default function Variant1Page() {
  return <HomeVariantPage variantId="1" />;
}
