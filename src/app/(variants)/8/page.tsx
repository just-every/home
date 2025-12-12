import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('8');
}

export default function Variant8Page() {
  return <HomeVariantPage variantId="8" />;
}
