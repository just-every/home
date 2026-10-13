import type { Metadata } from 'next';

import { sans } from '@/components/landing/fonts';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { featured } from '@/components/landing/HeroShelf';
import ui from '@/components/landing/label.module.css';
import { labelVolumes } from '@/components/landing/volumes';

import { ReviewShelf } from './ReviewShelf';

export const metadata: Metadata = {
  title: 'Shelf review',
  robots: { index: false, follow: false },
};

/**
 * Tooling only: the page's real header and hero, with a shelf that review
 * tooling can hand other volume sets (scripts/render-shelf.mjs renders the
 * 30- and 60-volume growth shots here). The `.dev.tsx` extension keeps it out
 * of production builds: next.config.ts adds it to pageExtensions in `next dev`
 * only.
 */
export default function ShelfReview() {
  return (
    <div className={`${ui.page} ${sans.variable}`}>
      <Header />
      <main>
        <Hero
          shelf={<ReviewShelf volumes={labelVolumes()} featured={featured} />}
        />
      </main>
    </div>
  );
}
