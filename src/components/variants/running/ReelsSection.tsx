import { reels } from '@/content/landing';
import { seeds } from '@/data/seeds';

import { ReelPlayer } from './ReelPlayer';
import styles from './Reels.module.css';

/** Every seed with a reel, in collection order; new reels appear on their own. */
const reelSeeds = seeds.filter(seed => seed.reel !== null);

export function ReelsSection() {
  if (reelSeeds.length === 0) return null;

  return (
    <section
      id={reels.id}
      className={styles.live}
      aria-labelledby="running-reels-title"
    >
      <div className={styles.intro}>
        <h2 id="running-reels-title" className={styles.title}>
          {reels.heading}
        </h2>
        <p className={styles.line}>{reels.line}</p>
      </div>
      <ReelPlayer seeds={reelSeeds} />
    </section>
  );
}
