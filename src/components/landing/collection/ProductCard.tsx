import Link from 'next/link';

import { collection } from '@/content/landing';
import { track, X_EVENTS } from '@/lib/x-pixel';

import { BrandMark } from '../BrandMark';
import ui from '../label.module.css';
import styles from './collection.module.css';
import { cardStyle } from './cardStyle';
import type { Shown } from './types';

/**
 * A product among the others: its mark, name, what it replaces, what it
 * does (its line) and GitHub, on its pastel. The whole card opens the seed's
 * own page (its name is the link).
 */
export function ProductCard({
  shown,
  level,
}: {
  shown: Shown;
  /** h4 under an area's heading; h3 in a search's results. */
  level: 'h3' | 'h4';
}) {
  const { item, replaces, reason } = shown;
  const Name = level;
  return (
    <li
      className={`${ui.card} ${ui.tinted} ${styles.card}`}
      style={cardStyle(item)}
    >
      <BrandMark className={styles.mark} volume={item} size={36} />
      <div className={styles.head}>
        <Name className={styles.name}>
          <Link
            className={styles.select}
            href={`/${item.slug}`}
            prefetch={false}
            onClick={() =>
              track(X_EVENTS.contentView, {
                content_name: item.name,
                content_type: 'product',
              })
            }
          >
            {item.name}
          </Link>
        </Name>
        <p className={styles.alt}>
          {collection.alternativeTo} {replaces}
        </p>
      </div>
      <a
        className={styles.repo}
        href={item.repo}
        aria-label={`${item.name} on ${collection.githubLabel}`}
      >
        <span>{collection.githubLabel}</span>
        <span className={styles.repoArrow} aria-hidden="true">
          →
        </span>
      </a>
      <p className={styles.cardLine}>{item.line}</p>
      {reason ? <p className={styles.reason}>{reason}</p> : null}
    </li>
  );
}
