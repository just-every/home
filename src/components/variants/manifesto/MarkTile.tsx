import type { CSSProperties } from 'react';

import type { Seed } from '@/data/seed-types';

import styles from './mark-tile.module.css';

type MarkTileProps = {
  seed: Pick<Seed, 'name' | 'mark' | 'markLight' | 'accent'>;
  /** Tile edge in CSS pixels. */
  size?: number;
  className?: string;
};

/**
 * A product's real mark on a soft tile tinted with its own accent. The page is
 * light, so marks that adapt to a dark colour scheme use their light version.
 */
export function MarkTile({ seed, size = 56, className }: MarkTileProps) {
  const style = {
    '--tile-size': `${size}px`,
    '--tile-accent': seed.accent,
  } as CSSProperties;

  return (
    <span
      className={[styles.tile, className].filter(Boolean).join(' ')}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={seed.markLight ?? seed.mark}
        alt={`${seed.name} logo`}
        width={Math.round(size * 0.5)}
        height={Math.round(size * 0.5)}
        className={styles.mark}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
