import { githubOrgUrl } from '@/content/landing';

import { handwriting } from './fonts';
import ui from './label.module.css';
import styles from './hero.module.css';
import { volumeCount, volumes } from './volumes';

/** The box-set art is a fixed picture of the first fourteen volumes. */
const pictured = volumes.slice(0, 14);
const boxSetAlt = `A box set of ${pictured.length} numbered volumes, one colour each: ${pictured
  .map(volume => `${volume.number} ${volume.seed.name}`)
  .join(', ')}.`;

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
        <figure className={styles.art}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/variants/label/box-set.webp"
            srcSet="/variants/label/box-set-800.webp 800w, /variants/label/box-set.webp 1588w"
            sizes="(min-width: 1440px) 749px, (min-width: 1024px) 52vw, 100vw"
            width={1588}
            height={912}
            alt={boxSetAlt}
            fetchPriority="high"
            decoding="async"
          />
          <figcaption className={`${styles.note} ${handwriting.className}`}>
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
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
