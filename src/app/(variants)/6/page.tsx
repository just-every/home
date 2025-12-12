import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('6');
}

export default function Variant6Page() {
  return <HomeVariantPage variantId="6" />;
}
