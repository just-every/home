import { collection } from '@/content/landing';
import type { Seed } from '@/data/seeds';

import styles from './collection.module.css';

interface RepoStateProps {
  seed: Seed;
  /** `circle` is the cover cards' round arrow; `text` the volume cards' link. */
  variant: 'circle' | 'text';
}

/**
 * A card's repo state: its public GitHub repo, or a quiet "Opening soon" pill
 * (never a link) while it is private. Seeds with a reel on this page also get
 * a link to it.
 */
export function RepoState({ seed, variant }: RepoStateProps) {
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
      {seed.status === 'public' && seed.repo ? (
        <a
          className={variant === 'circle' ? styles.repoCircle : styles.repoText}
          href={seed.repo}
          aria-label={`${seed.name} on ${collection.githubLabel}`}
        >
          <span>{collection.githubLabel}</span>
          <span className={styles.repoArrow} aria-hidden="true">
            →
          </span>
        </a>
      ) : (
        <span className={styles.soon}>{collection.notYetPublicLabel}</span>
      )}
    </div>
  );
}
