import { Play } from 'lucide-react';

import { collection, reels } from '@/content/landing';
import type { Seed } from '@/data/seed-types';

import { GitHubMark } from './icons';
import { MarkTile } from './MarkTile';
import styles from './running.module.css';

function clock(seconds: number): string {
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
}

type ReelFactsProps = {
  seed: Seed;
  /** Starts the reel that is showing. */
  onPlay: () => void;
};

/** The selected reel's product, a play control and where its source lives. */
export function ReelFacts({ seed, onPlay }: ReelFactsProps) {
  const repoLabel = seed.repo?.replace(/^https:\/\//, '');
  return (
    <ul className={styles.facts}>
      <li>
        <MarkTile seed={seed} size={64} />
        <span className={styles.factText}>
          <strong>{seed.name}</strong>
          <span>
            {collection.alternativeTo} {seed.primaryReplace}
          </span>
        </span>
      </li>
      <li>
        <button type="button" className={styles.factAction} onClick={onPlay}>
          <span className={`${styles.factIcon} ${styles.factPlay}`}>
            <Play size={26} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className={styles.factText}>
            <strong>
              {collection.watchLabel}
              <span className={styles.srOnly}>: {seed.name}</span>
            </strong>
            {seed.reel ? <span>{clock(seed.reel.durationSeconds)}</span> : null}
          </span>
        </button>
      </li>
      <li>
        {seed.repo ? (
          <a href={seed.repo} className={styles.factAction}>
            <span className={`${styles.factIcon} ${styles.factCode}`}>
              <GitHubMark size={26} />
            </span>
            <span className={styles.factText}>
              <strong>{reels.githubLabel}</strong>
              <span>{repoLabel}</span>
            </span>
          </a>
        ) : (
          <>
            <span className={`${styles.factIcon} ${styles.factCode}`}>
              <GitHubMark size={26} />
            </span>
            <span className={styles.factText}>
              <strong>{collection.notYetPublicLabel}</strong>
              <span>{seed.category}</span>
            </span>
          </>
        )}
      </li>
    </ul>
  );
}
