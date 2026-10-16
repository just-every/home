import { collection } from '@/content/landing';

import { BrandMark } from '../BrandMark';
import ui from '../label.module.css';
import { cardId } from '../volumes';
import styles from './collection.module.css';
import { cardStyle } from './cardStyle';
import type { Shown } from './types';

/**
 * A product among the others: its mark, name, what it replaces, what it
 * does (its line) and GitHub, on its pastel. The whole card selects it (its
 * name is the link); the selected one is ringed, and the box above shows it.
 */
export function ProductCard({
  shown,
  current,
  level,
}: {
  shown: Shown;
  current: boolean;
  /** h4 under an area's heading; h3 in a search's results. */
  level: 'h3' | 'h4';
}) {
  const { item, replaces, reason } = shown;
  const Name = level;
  return (
    <li
      className={`${ui.card} ${ui.tinted} ${styles.card}${
        current ? ` ${styles.current}` : ''
      }`}
      id={cardId(item.slug)}
      style={cardStyle(item)}
    >
      <BrandMark className={styles.mark} volume={item} size={36} />
      <div className={styles.head}>
        <Name className={styles.name}>
          <a
            className={styles.select}
            href={`#${cardId(item.slug)}`}
            aria-current={current ? 'true' : undefined}
          >
            {item.name}
          </a>
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
      {/* The box above already gives the selected pick's reason. */}
      {reason && !current ? <p className={styles.reason}>{reason}</p> : null}
    </li>
  );
}
