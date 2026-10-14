import { handwriting } from '@/components/landing/fonts';
import { open } from '@/content/contact';

import styles from './contact.module.css';
import { HeartIcon } from './icons';

/** The strip under the cards: every repo takes issues and pull requests. */
export function OpenStrip() {
  return (
    <section className={styles.strip} aria-labelledby="contact-open-heading">
      <span className={styles.stripIcon} aria-hidden="true">
        <HeartIcon />
      </span>
      <div className={styles.stripText}>
        <h2 id="contact-open-heading">{open.heading}</h2>
        <p>{open.line}</p>
      </div>
      <p className={`${styles.stripNote} ${handwriting.className}`}>
        {open.note}
      </p>
    </section>
  );
}
