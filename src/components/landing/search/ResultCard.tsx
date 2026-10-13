import type { CSSProperties } from 'react';

import { collection } from '@/content/landing';

import cards from '../collection.module.css';
import styles from './search.module.css';
import type { SearchVolume } from './localMatch';

interface ResultCardProps {
  volume: SearchVolume;
  /** The incumbent to name: the one the visitor typed, if this replaces it. */
  replaces: string;
  /** Claude's reason; while typing, the volume's own line instead. */
  reason: string | null;
}

/** A matching volume, in the collection's card language. */
export function ResultCard({ volume, replaces, reason }: ResultCardProps) {
  const style = {
    '--pastel': volume.pastel,
    '--brand-ink': volume.ink,
  } as CSSProperties;
  return (
    <li className={styles.card} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.mark}
        src={volume.mark}
        alt=""
        width={44}
        height={44}
        decoding="async"
        draggable={false}
      />
      <div className={styles.cardBody}>
        <p className={styles.num}>{volume.number}</p>
        <h3 className={styles.name}>{volume.name}</h3>
        <p className={styles.meta}>
          {volume.category} · {collection.alternativeTo} {replaces}
        </p>
        <p className={reason ? styles.reason : styles.line}>
          {reason ?? volume.line}
        </p>
      </div>
      <div className={`${cards.repoState} ${styles.cardFoot}`}>
        {volume.reel ? (
          <a
            className={cards.watch}
            href="#running"
            data-reel={volume.slug}
            aria-label={`${collection.watchLabel}: ${volume.name}`}
          >
            <span>{collection.watchLabel}</span>
          </a>
        ) : null}
        {volume.repo ? (
          <a
            className={cards.repoText}
            href={volume.repo}
            aria-label={`${volume.name} on ${collection.githubLabel}`}
          >
            <span>{collection.githubLabel}</span>
            <span className={cards.repoArrow} aria-hidden="true">
              →
            </span>
          </a>
        ) : (
          <span className={cards.soon}>{collection.notYetPublicLabel}</span>
        )}
      </div>
    </li>
  );
}
