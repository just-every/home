import type { Metadata } from 'next';

import HeroE from '@/components/hero-variants/e';
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
  title: 'Hero E preview',
  robots: { index: false, follow: false },
};

/**
 * Review only: the real homepage, section for section as LandingPage
 * composes it, with hero variant E in place of the current hero.
 */
export default function HeroPreviewE() {
  return (
    <div className={`${ui.page} ${sans.variable}`} id="top">
      <Header />
      <main>
        <HeroE />
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
