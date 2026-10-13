import { Collection } from './Collection';
import { sans } from './fonts';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import ui from './label.module.css';
import { Makers } from './Makers';
import panels from './panels.module.css';
import { Questions } from './Questions';
import { RunOne } from './RunOne';
import { Running } from './Running';
import { Stand } from './Stand';
import { Unsubscribe } from './Unsubscribe';

/**
 * The justevery.com landing page (the Label design): Just Every as a numbered box set, one volume per
 * product. Section order follows the approved copy deck; the Unsubscribe
 * claim follows the reels and leads into the questions it provokes.
 */
export function LandingPage() {
  return (
    <div className={`${ui.page} ${sans.variable}`} id="top">
      <Header />
      <main>
        <Hero />
        <Collection />
        <Running />
        <Unsubscribe />
        <Questions />
        <Stand />
        <div className={`${ui.wrap} ${panels.panels}`}>
          <RunOne />
          <Makers />
        </div>
      </main>
      <Footer />
    </div>
  );
}
