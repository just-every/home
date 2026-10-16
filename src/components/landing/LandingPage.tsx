import { Collection } from './Collection';
import { ComingSoon } from './ComingSoon';
import { sans } from './fonts';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './hero/Hero';
import type { HeroLayout, HeroTone } from './hero/layouts';
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
 * product. The hero is 12ui design G (hero/), with the four reasons to
 * switch at its foot; the collection follows it, then the
 * rest of the order follows the approved copy deck; the Unsubscribe
 * claim follows the reels and leads into the questions it provokes. The
 * suggestion form closes the page under the makers invitation: visitors ask
 * for products where makers are asked for them, and the collection search's
 * "Nothing in the collection does that yet" links down to it.
 */
export function LandingPage({
  heroLayout,
  heroTone,
}: {
  heroLayout?: HeroLayout;
  heroTone?: HeroTone;
}) {
  return (
    <div className={`${ui.page} ${sans.variable}`} id="top">
      <Header tone={heroTone} />
      <main>
        <Hero layout={heroLayout} tone={heroTone} />
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
