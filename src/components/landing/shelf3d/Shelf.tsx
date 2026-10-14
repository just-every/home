'use client';

import dynamic from 'next/dynamic';
import { type CSSProperties, useSyncExternalStore } from 'react';

import styles from './shelf.module.css';
import type { ShelfTone } from './tones';
import type { ShelfVolume } from './types';

/** three.js loads on the client only, after first paint. */
const Shelf3D = dynamic(() => import('./Shelf3D'), { ssr: false });

export interface ShelfPoster {
  src: string;
  srcSet?: string;
  sizes?: string;
  /** The render's pixels, when not the page's own poster's. */
  width?: number;
  height?: number;
}

/**
 * How far the poster and the live scene may reach past the slot's left edge,
 * as a share of its width: room for the front box's contact shadow,
 * reflection and floor to fade out on the page instead of ending at an edge.
 * The poster is rendered with all of it; a layout with less room (the hero's
 * `--shelf-bleed`) shows less of the poster, which stays pinned to the slot.
 */
const BLEED = 0.18;

/** The static render's pixels: the scene at 1440 (2x), bleed included. */
const POSTER = { w: 1768, h: 860 };

/** The poster's bleed past the slot, for layouts that size their own. */
export const POSTER_BLEED = BLEED;

/** The static render of the shelf (`node scripts/render-shelf.mjs`). */
export const shelfPoster: ShelfPoster = {
  src: '/landing/shelf/shelf-1440.webp',
  srcSet: `/landing/shelf/shelf-800.webp 800w, /landing/shelf/shelf-1440.webp ${POSTER.w}w`,
  sizes: [
    `(min-width: 1440px) ${Math.round(749 * (1 + BLEED))}px`,
    `(min-width: 1024px) ${+(52 * (1 + BLEED)).toFixed(2)}vw`,
    `${+(100 * (1 + BLEED)).toFixed(2)}vw`,
  ].join(', '),
};

export interface ShelfProps {
  volumes: ShelfVolume[];
  featured: string;
  className?: string;
  /** Shown until the live scene's first frame, and instead of it on phones. */
  poster?: ShelfPoster | null;
  /** The room around the set: the page's light, or a dark stage. */
  tone?: ShelfTone;
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
 * focused). Behind both sits the room of the art: soft window light on the
 * wall and floor, and a potted plant out of focus past the row's far end,
 * so the poster, the live scene and phones all show it.
 */
export function Shelf({
  volumes,
  featured,
  className,
  poster = shelfPoster,
  tone = 'light',
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
      style={{ '--shelf-poster-bleed': `${BLEED * 100}cqw` } as CSSProperties}
      data-shelf
      data-tone={tone === 'light' ? undefined : tone}
    >
      <div className={styles.room} aria-hidden="true">
        <div className={styles.light}>
          <div className={styles.beam} />
        </div>
        <div className={styles.floor} />
        <div className={styles.plant} />
      </div>
      <div className={styles.view}>
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.poster}
            src={poster.src}
            srcSet={poster.srcSet}
            sizes={poster.sizes}
            width={poster.width ?? POSTER.w}
            height={poster.height ?? POSTER.h}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
          />
        ) : null}
        {live ? (
          <Shelf3D volumes={volumes} featured={featured} tone={tone} />
        ) : null}
      </div>
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
