import type { ReactNode } from 'react';

import { githubOrgUrl } from '@/content/landing';

import { handwriting } from './fonts';
import styles from './hero.module.css';
import { HeroShelf } from './HeroShelf';
import ui from './label.module.css';

/** Words that stay together on one line. */
const Together = ({ children }: { children: ReactNode }) => (
  <span className={styles.together}>{children}</span>
);

/**
 * The hero leads with the benefit: "Unsubscribe from just about
 * everything." centred over the line and the buttons, and the box set below
 * them, large and wide, with the plant and the window light at its far end.
 * The headline breaks between its two halves ("Unsubscribe from" / "just
 * about everything."), and on phones once more, before "everything.". The
 * line's two sentences take a line each where there is room. `shelf`
 * defaults to the page's box set; review tooling passes its own.
 */
export function Hero({ shelf = <HeroShelf /> }: { shelf?: ReactNode }) {
  return (
    <section className={styles.top} aria-labelledby="label-hero-heading">
      <div className={styles.hero}>
        <div className={`${ui.wrap} ${styles.copy}`}>
          <h1 id="label-hero-heading">
            <Together>Unsubscribe from</Together>{' '}
            <span className={styles.turn}>
              <Together>just about</Together> <Together>everything.</Together>
            </span>
          </h1>
          <p>
            <span className={styles.sentence}>
              Free, <Together>open-source</Together> alternatives to Notion,
              Slack, Intercom, Calendly and more.
            </span>{' '}
            <span className={styles.sentence}>
              Run them yourself and stop paying per seat.
            </span>
          </p>
          <div className={styles.actions}>
            <a className={ui.pill} href="#all">
              Browse the collection{' '}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </a>
            <a className={ui.under} href={githubOrgUrl}>
              <span>
                GitHub{' '}
                <span className={ui.arrow} aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className={styles.stage}>
          <div className={styles.art}>
            {shelf}
            <p className={`${styles.note} ${handwriting.className}`}>
              <span>More coming soon.</span>
              <svg
                className={styles.noteArrow}
                viewBox="0 0 64 44"
                aria-hidden="true"
              >
                <path
                  d="M6 6c18 0 40 8 50 30m0 0 1.2-11.9M56 36l-9.7-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
