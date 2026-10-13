import { collection } from '@/content/landing';

import { BrandMark } from '../BrandMark';
import ui from '../label.module.css';
import { cardId } from '../volumes';
import styles from './collection.module.css';
import { cardStyle } from './cardStyle';
import type { Placed } from './types';

/**
 * A product in the grid: its mark, number, name and what it replaces, and
 * GitHub. The whole card selects it (its name is the link); the selected
 * one is ringed, and the box above shows it.
 */
export function ProductCard({
  placed,
  current,
}: {
  placed: Placed;
  current: boolean;
}) {
  const { item, role, replaces, reason } = placed;
  return (
    <li
      className={`${ui.card} ${ui.tinted} ${styles.card} ${styles[role]}${
        current ? ` ${styles.current}` : ''
      }`}
      id={cardId(item.slug)}
      style={cardStyle(item)}
    >
      <BrandMark
        className={styles.mark}
        volume={item}
        size={role === 'cover' ? 96 : 40}
      />
      <div className={styles.body}>
        <p className={styles.num}>{item.number}</p>
        <h3 className={styles.name}>
          <a
            className={styles.select}
            href={`#${cardId(item.slug)}`}
            aria-current={current ? 'true' : undefined}
          >
            {item.name}
          </a>
        </h3>
        <p className={styles.alt}>
          {collection.alternativeTo} {replaces}
        </p>
        {/* The box above already gives the selected pick's reason. */}
        {reason && !current ? <p className={styles.reason}>{reason}</p> : null}
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
    </li>
  );
}
