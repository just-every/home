import { collection } from '@/content/landing';
import type { Seed } from '@/data/seeds';

import styles from './collection.module.css';

interface RepoStateProps {
  seed: Seed;
  /** `circle` is the cover cards' round arrow; `text` the volume cards' link. */
  shape: 'circle' | 'text';
}

/**
 * A card's repo state: a link to its public GitHub repo. Seeds with a reel on
 * this page also get a link to it.
 */
export function RepoState({ seed, shape }: RepoStateProps) {
  return (
    <div className={styles.repoState}>
      {seed.reel ? (
        <a
          className={styles.watch}
          href="#running"
          data-reel={seed.slug}
          aria-label={`${collection.watchLabel}: ${seed.name}`}
        >
          <span>{collection.watchLabel}</span>
        </a>
      ) : null}
      <a
        className={shape === 'circle' ? styles.repoCircle : styles.repoText}
        href={seed.repo}
        aria-label={`${seed.name} on ${collection.githubLabel}`}
      >
        <span>{collection.githubLabel}</span>
        <span className={styles.repoArrow} aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
}
