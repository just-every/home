import { ChevronRight, Play } from 'lucide-react';

import { collection } from '@/content/landing';
import type { Seed } from '@/data/seed-types';

import styles from './collection.module.css';
import { GitHubMark } from './icons';
import m from './manifesto.module.css';
import { MarkTile } from './MarkTile';

/** One product: mark, name, what it replaces, its line and where its source is. */
export function ProductCard({ seed }: { seed: Seed }) {
  const titleId = `product-${seed.slug}-name`;
  return (
    <article
      id={`product-${seed.slug}`}
      className={styles.card}
      aria-labelledby={titleId}
    >
      <div className={styles.cardBody}>
        <MarkTile seed={seed} size={55} />
        <div className={styles.cardText}>
          <h3 id={titleId}>{seed.name}</h3>
          <p className={styles.cardReplaces}>
            {collection.alternativeTo} {seed.primaryReplace}
          </p>
          <p className={styles.cardLine}>{seed.line}</p>
        </div>
      </div>
      <div className={styles.cardFoot}>
        {seed.repo ? (
          <a
            href={seed.repo}
            className={`${styles.cardGithub} ${seed.reel ? '' : styles.cardGithubWide}`}
          >
            <GitHubMark size={17} />
            <span>
              {collection.githubLabel}
              <span className={m.srOnly}>: {seed.name}</span>
            </span>
            {seed.reel ? null : (
              <ChevronRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className={styles.chevron}
              />
            )}
          </a>
        ) : (
          <span className={styles.soon}>{collection.notYetPublicLabel}</span>
        )}
        {seed.reel ? (
          <a href={`#reel-${seed.slug}`} className={styles.cardWatch}>
            <Play size={14} strokeWidth={2} aria-hidden="true" />
            <span>
              {collection.watchLabel}
              <span className={m.srOnly}>: {seed.name}</span>
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
