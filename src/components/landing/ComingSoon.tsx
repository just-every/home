import { comingSoon, upcoming } from '@/data/upcoming';

import { GroundBand } from './GroundBand';
import ui from './label.module.css';
import styles from './coming-soon.module.css';
import { SoonItem } from './soon/SoonItem';
import soon from './soon/soon.module.css';

/**
 * Seeds in the works, below the collection: one quiet row each (see
 * SoonItem), under a heading that says they are coming soon.
 */
export function ComingSoon() {
  return (
    <section
      className={styles.section}
      id={comingSoon.id}
      aria-labelledby="label-soon-heading"
    >
      <div className={`${ui.wrap} ${styles.soon}`}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <h2 className={ui.h2} id="label-soon-heading">
              {comingSoon.heading}
            </h2>
            <p className={`${ui.lead} ${styles.line}`}>{comingSoon.line}</p>
          </div>
        </div>
        <ul className={soon.list}>
          {upcoming.map(seed => (
            <SoonItem key={seed.slug} seed={seed} level="h3" />
          ))}
        </ul>
      </div>
      <GroundBand />
    </section>
  );
}
