'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';

import styles from './shelf.module.css';
import type { ShelfVolume } from './types';

/** three.js loads on the client only, after first paint. */
const Shelf3D = dynamic(() => import('./Shelf3D'), { ssr: false });

export interface ShelfPoster {
  src: string;
  srcSet?: string;
  sizes?: string;
}

/** The static render of the shelf (`node scripts/render-shelf.mjs`). */
export const shelfPoster: ShelfPoster = {
  src: '/landing/shelf/shelf-1440.webp',
  srcSet:
    '/landing/shelf/shelf-800.webp 800w, /landing/shelf/shelf-1440.webp 1498w',
  sizes: '(min-width: 1440px) 749px, (min-width: 1024px) 52vw, 100vw',
};

export interface ShelfProps {
  volumes: ShelfVolume[];
  featured: string;
  className?: string;
  /** Shown until the live scene's first frame, and instead of it on phones. */
  poster?: ShelfPoster | null;
}

/** Phones keep the static render: the live scene starts at this width. */
const LIVE_QUERY = '(min-width: 768px)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(LIVE_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/**
 * The hero's box set: the static render first, crossfading to the live
 * three.js scene once it has drawn, with every volume as a real link (shown
 * as a name tag, "HappyToHelp · Support", when its volume is hovered or
 * focused).
 */
export function Shelf({
  volumes,
  featured,
  className,
  poster = shelfPoster,
}: ShelfProps) {
  const live = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(LIVE_QUERY).matches,
    () => false
  );
  const lead = volumes.find(volume => volume.slug === featured);
  const ordered = lead
    ? [lead, ...volumes.filter(volume => volume !== lead)]
    : volumes;

  return (
    <div
      className={className ? `${styles.shelf} ${className}` : styles.shelf}
      data-shelf
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.poster}
          src={poster.src}
          srcSet={poster.srcSet}
          sizes={poster.sizes}
          width={1498}
          height={860}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
        />
      ) : null}
      {live ? <Shelf3D volumes={volumes} featured={featured} /> : null}
      <ul
        className={styles.list}
        aria-label="The collection, as a box set of numbered volumes"
      >
        {ordered.map(volume => (
          <li key={volume.slug}>
            <a
              className={styles.tag}
              href={volume.href}
              data-slug={volume.slug}
            >
              {volume.name}
              <span className={styles.tagFamily}> · {volume.family}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Shelf;
