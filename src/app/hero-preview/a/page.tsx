import type { Metadata } from 'next';

import HeroA from '@/components/hero-variants/a';
import { Benefits } from '@/components/landing/Benefits';
import { Collection } from '@/components/landing/Collection';
import { ComingSoon } from '@/components/landing/ComingSoon';
import { sans } from '@/components/landing/fonts';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import ui from '@/components/landing/label.module.css';
import { Makers } from '@/components/landing/Makers';
import { NothingToUpsell } from '@/components/landing/NothingToUpsell';
import panels from '@/components/landing/panels.module.css';
import { Questions } from '@/components/landing/Questions';
import { RunOne } from '@/components/landing/RunOne';
import { Running } from '@/components/landing/Running';
import { Stand } from '@/components/landing/Stand';
import { Suggest } from '@/components/landing/suggest/Suggest';
import { Unsubscribe } from '@/components/landing/Unsubscribe';

export const metadata: Metadata = {
  title: 'Hero A preview',
  robots: { index: false, follow: false },
};

/**
 * Review copy of the homepage with hero A in place of the current hero: the
 * same sections, in the same order, as LandingPage.tsx.
 */
export default function HeroAPreview() {
  return (
    <div className={`${ui.page} ${sans.variable}`} id="top">
      <Header />
      <main>
        <HeroA />
        <Benefits />
        <Collection />
        <ComingSoon />
        <Running />
        <Unsubscribe />
        <NothingToUpsell />
        <Questions />
        <Stand />
        <div className={`${ui.wrap} ${panels.panels}`}>
          <RunOne />
          <Makers />
          <Suggest />
        </div>
      </main>
      <Footer rise />
    </div>
  );
}
