import { HomeHero } from '@/features/home/HomeHero';
import { VariantBackground } from '@/features/home/VariantBackground';
import { ROOT_VARIANT } from '@/features/home/variants';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <VariantBackground preset={ROOT_VARIANT.background} />
      <HomeHero variant={ROOT_VARIANT} />
    </div>
  );
}
