import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('4');
}

export default function Variant4Page() {
  return <HomeVariantPage variantId="4" />;
}
