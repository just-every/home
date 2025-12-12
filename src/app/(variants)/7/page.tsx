import {
  HomeVariantPage,
  getHomeVariantMetadata,
} from '@/features/home/HomeVariantPage';

export function generateMetadata() {
  return getHomeVariantMetadata('7');
}

export default function Variant7Page() {
  return <HomeVariantPage variantId="7" />;
}
