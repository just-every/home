import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('3');
}

export default function Variant3Page() {
  return <HomeVariantPage variantId="3" />;
}
