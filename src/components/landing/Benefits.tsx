import type { CSSProperties } from 'react';

import { benefits } from '@/content/landing';

import styles from './benefits.module.css';
import ui from './label.module.css';

/** The page's soft card tints, one per benefit, in order. */
const tints = ['#e9f7f0', '#e8f3ff', '#f1ebff', '#fff8e3'];

/**
 * The benefits strip under the hero: four plain reasons to switch, each a
 * bold lead and one line, on the page's pastel cards.
 */
export function Benefits() {
  return (
    <section
      className={`${ui.wrap} ${styles.benefits}`}
      aria-label={benefits.label}
    >
      <ul className={styles.list}>
        {benefits.items.map((item, index) => (
          <li
            key={item.lead}
            className={`${ui.card} ${styles.item}`}
            style={{ '--tint': tints[index % tints.length] } as CSSProperties}
          >
            <p className={styles.lead}>{item.lead}</p>
            <p className={styles.line}>{item.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
