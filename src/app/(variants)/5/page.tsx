import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('5');
}

export default function Variant5Page() {
  return <HomeVariantPage variantId="5" />;
}
