import type { CSSProperties } from 'react';

import { comingSoon, upcoming } from '@/data/upcoming';

import ui from './label.module.css';
import styles from './coming-soon.module.css';

/**
 * Seeds in the works, below the collection: each is a quiet card in its own
 * pastel with its real mark, what it replaces, one line and its public
 * source. Nothing here selects, plays or opens a product.
 */
export function ComingSoon() {
  return (
    <section
      className={`${ui.wrap} ${styles.soon}`}
      id={comingSoon.id}
      aria-labelledby="label-soon-heading"
    >
      <div className={styles.head}>
        <div className={styles.headText}>
          <h2 className={ui.h2} id="label-soon-heading">
            {comingSoon.heading}
          </h2>
          <p className={`${ui.lead} ${styles.line}`}>{comingSoon.line}</p>
        </div>
        {/* Sprouts at different stages in a planter: seeds still growing.
            Decorative. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.sprouts}
          src="/landing/painted/sprouts.svg"
          alt=""
          aria-hidden="true"
          width={300}
          height={116}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <ul className={styles.grid}>
        {upcoming.map(seed => (
          <li
            key={seed.slug}
            className={`${ui.card} ${ui.tinted} ${styles.card}`}
            style={{ '--pastel': seed.pastel } as CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.mark}
              src={seed.mark}
              alt={`${seed.name} mark`}
              width={40}
              height={40}
              decoding="async"
              draggable={false}
            />
            <div className={styles.body}>
              <h3 className={styles.name}>{seed.name}</h3>
              <p className={styles.status}>{comingSoon.label}</p>
              <p className={styles.alt}>
                {comingSoon.alternativeTo} {seed.primaryReplace}
              </p>
              <p className={styles.text}>{seed.line}</p>
            </div>
            <a
              className={styles.repo}
              href={seed.repo}
              aria-label={`${seed.name} on ${comingSoon.githubLabel}`}
            >
              <span>{comingSoon.githubLabel}</span>
              <span className={styles.repoArrow} aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
