import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('10');
}

export default function Variant10Page() {
  return <HomeVariantPage variantId="10" />;
}
