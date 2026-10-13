import { ChevronRight } from 'lucide-react';

import { collection } from '@/content/landing';
import { seeds } from '@/data/seeds';

import styles from './product-index.module.css';
import { MarkTile } from './MarkTile';

/* "Fourteen products so far" is the opening of the copy deck's collection line. */
const title = `${collection.line.split(',')[0]}.`;
const linkLabel = collection.heading.replace(/\.$/, '');

/** The hero's index of every product, each row jumping to its card. */
export function ProductIndex() {
  return (
    <nav className={styles.panel} aria-labelledby="manifesto-index-title">
      <div className={styles.head}>
        <p id="manifesto-index-title" className={styles.title}>
          {title}
        </p>
        <a href="#all" className={styles.all}>
          {linkLabel}
          <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
      <ul className={styles.list}>
        {seeds.map(seed => (
          <li key={seed.slug}>
            <a href={`#product-${seed.slug}`} className={styles.row}>
              <MarkTile seed={seed} size={56} />
              <span className={styles.text}>
                <span className={styles.name}>{seed.name}</span>
                <span className={styles.replaces}>
                  {collection.alternativeTo} {seed.primaryReplace}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
