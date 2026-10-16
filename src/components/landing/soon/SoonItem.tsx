import type { CSSProperties } from 'react';

import { comingSoon } from '@/data/upcoming';
import type { UpcomingSeed } from '@/data/upcoming';

import styles from './soon.module.css';

/**
 * A seed in the works as one quiet row: its mark on its pastel, its name,
 * what it replaces (or, where its repo names nothing, what it is), its line
 * and its public source. Nothing here selects, plays or opens a product.
 */
export function SoonItem({
  seed,
  level,
  replaces = seed.primaryReplace,
}: {
  seed: UpcomingSeed;
  /** The name's heading level under the list's own heading. */
  level: 'h3' | 'h4';
  /**
   * The incumbent to name: in a search's results, the one the visitor typed
   * where the seed replaces it (search/localMatch.ts `namedReplace`).
   */
  replaces?: string;
}) {
  const Name = level;
  return (
    <li
      className={styles.item}
      style={{ '--pastel': seed.pastel } as CSSProperties}
    >
      <span className={styles.tile}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.mark}
          src={seed.mark}
          alt={`${seed.name} mark`}
          width={28}
          height={28}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
      <div className={styles.head}>
        <Name className={styles.name}>{seed.name}</Name>
        <p className={styles.alt}>
          {replaces ? `${comingSoon.alternativeTo} ${replaces}` : seed.category}
        </p>
      </div>
      <p className={styles.text}>{seed.line}</p>
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
  );
}
