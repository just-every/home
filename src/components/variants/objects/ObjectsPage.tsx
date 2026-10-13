import { Collection } from './Collection';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Makers } from './Makers';
import { Questions } from './Questions';
import { Reels } from './Reels';
import { RunOne } from './RunOne';
import { Stand } from './Stand';
import bottom from './bottom.module.css';
import { hand } from './fonts';
import styles from './page.module.css';

/** The Objects direction: every product as an everyday object on a lit shelf. */
export function ObjectsPage() {
  return (
    <div id="top" className={`${styles.page} ${hand.variable}`}>
      <main>
        <Hero />
        <Reels />
        <Collection />
        <Questions />
        <Stand />
        <div className={bottom.bottom}>
          <RunOne />
          <Makers />
        </div>
      </main>
      <Footer />
    </div>
  );
}
