import Image from 'next/image';

import { collection } from '@/content/landing';
import { seedsBySlug } from '@/data/seeds';

import styles from './Hero.module.css';
import { lightMark } from './seed-view';
import type { WallTile } from './wall-tiles';

interface AppTileProps {
  tile: WallTile;
  /** The `sizes` attribute for this slot. */
  sizes: string;
}

/** One window on the wall: a title bar with the product, over a real screenshot crop. */
export function AppTile({ tile, sizes }: AppTileProps) {
  const seed = seedsBySlug[tile.slug];
  const { width, height } = tile.crop;
  const base = `/variants/running/wall/${tile.slug}`;

  return (
    <figure className={styles.tile}>
      <figcaption className={styles.bar}>
        <Image
          className={styles.barMark}
          src={lightMark(seed)}
          alt=""
          width={16}
          height={16}
          unoptimized
        />
        <span className={styles.barName}>{seed.name}</span>
        <span className={styles.barAlt}>
          {collection.alternativeTo} {seed.primaryReplace}
        </span>
      </figcaption>
      <picture className={styles.window}>
        <source
          type="image/webp"
          srcSet={`${base}.webp ${width}w, ${base}-half.webp ${Math.round(width / 2)}w`}
          sizes={sizes}
        />
        <img
          className={styles.shot}
          src={`${base}.webp`}
          alt={tile.alt}
          width={width}
          height={height}
          style={tile.focus ? { objectPosition: tile.focus } : undefined}
          decoding="async"
        />
      </picture>
    </figure>
  );
}
