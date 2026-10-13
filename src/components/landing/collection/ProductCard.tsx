import { collection } from '@/content/landing';

import { BrandMark } from '../BrandMark';
import ui from '../label.module.css';
import { cardId } from '../volumes';
import styles from './collection.module.css';
import { cardStyle } from './cardStyle';
import type { Placed } from './types';

/**
 * Every product that is not the feature: its mark, number, name and what it
 * replaces, and GitHub. The whole card selects it (its name is the link).
 */
export function ProductCard({ placed }: { placed: Placed }) {
  const { item, role, replaces, reason } = placed;
  const side = role === 'side';
  return (
    <li
      className={`${ui.card} ${ui.tinted} ${styles.card} ${styles[role]}`}
      id={cardId(item.slug)}
      style={cardStyle(item)}
    >
      <BrandMark className={styles.mark} volume={item} size={side ? 88 : 40} />
      <div className={styles.body}>
        <p className={styles.num}>{item.number}</p>
        <h3 className={styles.name}>
          <a className={styles.select} href={`#${cardId(item.slug)}`}>
            {item.name}
          </a>
        </h3>
        <p className={styles.alt}>
          {collection.alternativeTo} {replaces}
        </p>
        {reason ? <p className={styles.reason}>{reason}</p> : null}
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
