import type { ReactNode } from 'react';

import { githubOrgUrl } from '@/content/landing';

import { handwriting } from './fonts';
import styles from './hero.module.css';
import { HeroShelf } from './HeroShelf';
import ui from './label.module.css';

/** Words that stay together: a hyphenated word, or a short phrase. */
const Together = ({ children }: { children: ReactNode }) => (
  <span className={styles.together}>{children}</span>
);

/**
 * The hero (the owner's D, Overlay, with "Every SaaS. For Free."): the
 * header floats on its lavender room, the headline's second line is in the
 * muted ink the wordmark shares, the box set runs off the right edge and the
 * room fades into the page at its foot. `shelf` defaults to the page's box
 * set; review tooling passes its own.
 */
export function Hero({ shelf = <HeroShelf /> }: { shelf?: ReactNode }) {
  return (
    <section className={styles.top} aria-labelledby="label-hero-heading">
      <div className={`${ui.wrap} ${styles.hero}`}>
        <div className={styles.copy}>
          <h1 id="label-hero-heading">
            <Together>Every SaaS.</Together>{' '}
            <span className={styles.turn}>For Free.</span>
          </h1>
          <p>
            Beautifully made, <Together>open-source</Together> alternatives to
            Notion, Linear, Intercom and more.
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
        <div className={styles.art}>
          {shelf}
          <p className={`${styles.note} ${handwriting.className}`}>
            <svg
              className={styles.noteArrow}
              viewBox="0 0 64 44"
              aria-hidden="true"
            >
              <path
                d="M60 38C40 41 22 33 8 8M8 8l-1 13M8 8l12 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.noteText}>
              <span>More volumes on the way.</span>{' '}
              <span>Yours to run, change and keep.</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
