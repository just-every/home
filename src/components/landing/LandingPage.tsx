import { Collection } from './Collection';
import { sans } from './fonts';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import type { Look } from './heroVariants/looks';
import { HeroShelf } from './HeroShelf';
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
 * product. Section order follows the approved copy deck; the Unsubscribe
 * claim follows the reels and leads into the questions it provokes. The
 * suggestion form closes the page under the makers invitation: visitors ask
 * for products where makers are asked for them, and the collection search's
 * "Nothing in the collection does that yet" links down to it.
 *
 * `look` is a preview's header and hero (the /preview/hero pages); the live
 * page has none and keeps its own.
 */
export function LandingPage({ look }: { look?: Look }) {
  return (
    <div
      className={`${ui.page} ${sans.variable}${look?.page ? ` ${look.page}` : ''}`}
      id="top"
    >
      <Header tone={look?.chrome} className={look?.header} />
      <main>
        {look ? (
          <Hero
            styles={look.hero}
            shelf={<HeroShelf poster={look.poster} tone={look.shelfTone} />}
          />
        ) : (
          <Hero />
        )}
        <Collection />
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
      <Footer tone={look?.chrome} />
    </div>
  );
}
