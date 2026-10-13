import { githubOrgUrl } from '@/content/landing';

import { handwriting } from './fonts';
import { HeroShelf } from './HeroShelf';
import ui from './label.module.css';
import styles from './hero.module.css';
import { volumeCount } from './volumes';

export function Hero() {
  return (
    <section className={styles.top} aria-labelledby="label-hero-heading">
      <div className={`${ui.wrap} ${styles.hero}`}>
        <div className={styles.copy}>
          <h1 id="label-hero-heading">Just about every SaaS.</h1>
          <p>
            A collection of beautifully made, open-source alternatives to the
            software you rent. 100% free.
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
          <HeroShelf />
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
              <span>{volumeCount} open-source products.</span>{' '}
              <span>Yours to run, change and keep.</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
