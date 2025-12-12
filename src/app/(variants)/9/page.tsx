import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('9');
}

export default function Variant9Page() {
  return <HomeVariantPage variantId="9" />;
}
