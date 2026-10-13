import { footer } from '@/content/landing';

import { Collection } from './Collection';
import { kalam } from './fonts';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import { heroCopy } from './heroCopy';
import { Makers } from './Makers';
import p from './page.module.css';
import { Questions } from './Questions';
import { Running } from './Running';
import { RunOne } from './RunOne';
import { Stand } from './Stand';
import s from './layout.module.css';

/**
 * The Unsubscribe direction: renewal emails for rented tools beside the
 * Just Every products you own, then the reels, the collection and the
 * answers to the skeptic.
 */
export function UnsubscribePage() {
  return (
    <div id="top" className={`${p.page} ${kalam.variable}`}>
      <Header primaryLabel={heroCopy.primary} />
      <main>
        <Hero />
        <p className={`${p.wrap} ${s.divider}`}>{footer.smallPrint}</p>
        <Running />
        <div className={s.gap} />
        <Collection />
        <div className={s.gapSmall} />
        <Questions />
        <div className={`${p.wrap} ${s.panels}`}>
          <Stand />
          <RunOne />
        </div>
        <Makers />
      </main>
      <Footer />
    </div>
  );
}
