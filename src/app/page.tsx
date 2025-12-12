import { WarpFieldCanvas } from '@/components/WarpFieldCanvas';
import { HomeHero } from '@/features/home/HomeHero';
import { ROOT_VARIANT } from '@/features/home/variants';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <WarpFieldCanvas config={ROOT_VARIANT.warp} />
      <HomeHero variant={ROOT_VARIANT} />
    </div>
  );
}
