import type { HeroVariantId } from '@/lib/hero-ab';

import { Benefits } from './Benefits';
import { Collection } from './Collection';
import { ComingSoon } from './ComingSoon';
import { sans } from './fonts';
import { Footer } from './Footer';
import { Header } from './Header';
import { HeroBeacon } from './HeroBeacon';
import { heroes } from './heroes';
import ui from './label.module.css';
import { Makers } from './Makers';
import { NothingToUpsell } from './NothingToUpsell';
import panels from './panels.module.css';
import { Questions } from './Questions';
import { RunOne } from './RunOne';
import { Running } from './Running';
import { Stand } from './Stand';
import { Suggest } from './suggest/Suggest';
import { Unsubscribe } from './Unsubscribe';

/**
 * The justevery.com landing page (the Label design): Just Every as a numbered box set, one volume per
 * product. The benefits strip follows the hero, then the collection; the
 * rest of the order follows the approved copy deck; the Unsubscribe
 * claim follows the reels and leads into the questions it provokes. The
 * suggestion form closes the page under the makers invitation: visitors ask
 * for products where makers are asked for them, and the collection search's
 * "Nothing in the collection does that yet" links down to it. `hero` is
 * the visitor's hero A/B variant (src/lib/hero-ab.ts), chosen by the
 * middleware and rendered here on the server.
 */
export function LandingPage({ hero }: { hero: HeroVariantId }) {
  const HeroVariant = heroes[hero];
  return (
    <div className={`${ui.page} ${sans.variable}`} id="top">
      <Header />
      <main>
        <HeroVariant />
        <HeroBeacon variant={hero} />
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
