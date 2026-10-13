import { HandHeart, SquareArrowOutUpRight } from 'lucide-react';

import { makers } from '@/content/landing';

import m from './manifesto.module.css';
import styles from './makers.module.css';

/** The invitation to other makers, in the design's soft banner. */
export function Makers() {
  return (
    <section
      id="makers"
      className={styles.section}
      aria-labelledby="manifesto-makers-title"
    >
      <div className={m.container}>
        <div className={styles.band}>
          <span className={styles.icon}>
            <HandHeart size={34} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div className={styles.text}>
            <h2
              id="manifesto-makers-title"
              className={`${m.display} ${styles.title}`}
            >
              {makers.heading}
            </h2>
            <p className={styles.lede}>{makers.line}</p>
          </div>
          <a
            href={makers.link.href}
            className={`${m.buttonPrimary} ${styles.button}`}
          >
            {makers.link.label}
            <SquareArrowOutUpRight
              size={19}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
