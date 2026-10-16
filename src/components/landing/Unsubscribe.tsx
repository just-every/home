import type { CSSProperties } from 'react';
import { Mail } from 'lucide-react';

import { collection } from '@/content/landing';

import { BrandMark } from './BrandMark';
import { moreCount, rows } from './hero/order';
import ui from './label.module.css';
import { PlayInView } from './PlayInView';
import styles from './unsubscribe.module.css';
import { volumeStyle } from './volumes';

/**
 * The hero says "Stop renting your software."; this section shows the
 * renewals that stop, so its heading names what the rows do.
 */
const heading = 'Cross off the renewals.';

/**
 * Each tool you rent, as a renewal email in a soft neutral card, beside the
 * product that replaces it. The tool is struck through as its product
 * arrives. The rows are the hero's dozen, in its order (hero/order.ts), and
 * the rest wait in the collection behind an "and N more" link, so the
 * collection stays the one complete list.
 */
export function Unsubscribe() {
  return (
    <section
      className={styles.unsubscribe}
      aria-labelledby="label-unsubscribe-heading"
    >
      <div className={ui.wrap}>
        <h2
          className={`${ui.h2} ${styles.head}`}
          id="label-unsubscribe-heading"
        >
          {heading}
        </h2>
        <PlayInView className={styles.play}>
          <ol
            className={styles.ledger}
            aria-label="Each tool you rent, and the product that replaces it"
          >
            {rows.map((volume, index) => (
              <li
                key={volume.slug}
                className={styles.row}
                style={
                  { ...volumeStyle(volume), '--i': index } as CSSProperties
                }
              >
                <span className={`${ui.card} ${styles.email}`}>
                  <Mail
                    aria-hidden="true"
                    className={styles.mail}
                    strokeWidth={1.5}
                  />
                  <span className={styles.vendor}>
                    {volume.seed.primaryReplace}
                    <svg
                      className={styles.strike}
                      viewBox="0 0 100 8"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M1 5.2C24 3.4 52 5.6 99 3.1" pathLength={1} />
                    </svg>
                  </span>
                </span>
                <span className={styles.to} aria-hidden="true">
                  →
                </span>
                <span className={ui.srOnly}>, replaced by </span>
                <a
                  className={`${ui.card} ${ui.tinted} ${styles.volume}`}
                  href={volume.href}
                >
                  <span className={styles.number}>{volume.number}</span>
                  <BrandMark
                    className={styles.mark}
                    volume={volume}
                    size={24}
                  />
                  <span className={styles.name}>{volume.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </PlayInView>
        {moreCount > 0 ? (
          <a
            className={`${ui.under} ${styles.more}`}
            href={`#${collection.id}`}
          >
            <span>and {moreCount} more</span>
            <span className={ui.arrow} aria-hidden="true">
              →
            </span>
          </a>
        ) : null}
      </div>
    </section>
  );
}
