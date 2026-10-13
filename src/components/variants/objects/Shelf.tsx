import type { CSSProperties } from 'react';

import { collection } from '@/content/landing';
import { seedsBySlug } from '@/data/seeds';

import { ObjectImage } from './ObjectImage';
import { shelfLabelX, shelfLabelY, shelves } from './objects';
import styles from './shelf.module.css';

/**
 * The fourteen objects with their names. On wide screens the scene behind
 * the hero draws the objects and this list only lays the labels onto the
 * shelf fronts; on narrower screens it becomes its own shelf of cut-outs.
 */
export function Shelf() {
  return (
    <ul className={styles.shelf} aria-label="The fourteen products">
      {shelves.flatMap((row, rowIndex) =>
        row.map(slug => {
          const seed = seedsBySlug[slug];
          const style = {
            '--x': shelfLabelX[slug],
            '--y': shelfLabelY[rowIndex],
          } as CSSProperties;
          return (
            <li key={slug} className={styles.item} style={style}>
              <span className={styles.art}>
                <ObjectImage slug={slug} className={styles.object} eager />
              </span>
              <span className={styles.label}>
                <strong>{seed.name}</strong>
                <span>
                  {collection.alternativeTo} {seed.primaryReplace}
                </span>
              </span>
            </li>
          );
        })
      )}
    </ul>
  );
}
