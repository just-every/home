import type { Metadata } from 'next';

import { sans } from '@/components/variants/label/fonts';

import styles from './review.module.css';
import { ReviewShelf } from './ReviewShelf';
import { featured, reviewVolumes } from './volumes';

export const metadata: Metadata = {
  title: 'Shelf review',
};

/**
 * Review route for the three.js box set: the real seeds at the Label hero's
 * size and place, with a target card per volume so clicks can be seen to land.
 */
export default function ShelfReview() {
  const volumes = reviewVolumes();
  return (
    <div className={`${styles.page} ${sans.variable}`}>
      <section className={styles.top} aria-labelledby="shelf-review-heading">
        <div className={styles.bar}>
          <span className={styles.brand}>JustEvery_</span>
          <span className={styles.note}>Shelf review</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <h1 id="shelf-review-heading">Just about every SaaS.</h1>
            <p>
              A collection of beautifully made, open-source alternatives to the
              software you rent. 100% free.
            </p>
          </div>
          <div className={styles.art}>
            <ReviewShelf volumes={volumes} featured={featured} />
          </div>
        </div>
      </section>
      <ol className={styles.cards} aria-label="Volumes">
        {volumes.map(volume => (
          <li
            key={volume.slug}
            id={volume.href.slice(1)}
            className={styles.card}
            style={{ background: volume.colour, color: volume.ink }}
          >
            <span>{volume.number}</span> {volume.name}
          </li>
        ))}
      </ol>
    </div>
  );
}
