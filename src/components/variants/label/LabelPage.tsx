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

/**
 * The Label direction: Just Every as a numbered box set, one volume per
 * product. Section order follows the approved copy deck.
 */
export function LabelPage() {
  return (
    <div className={`${ui.page} ${sans.variable}`} id="top">
      <Header />
      <main>
        <Hero />
        <Collection />
        <Running />
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
