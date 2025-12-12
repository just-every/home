import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('2');
}

export default function Variant2Page() {
  return <HomeVariantPage variantId="2" />;
}
