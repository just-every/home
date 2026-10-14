import { Shelf, type ShelfPoster } from './shelf3d/Shelf';
import type { ShelfTone } from './shelf3d/tones';
import { labelVolumes } from './volumes';

/** The volume shown face out at the front of the box set. */
export const featured = 'uptime';

/**
 * The hero's box set, filling the width of its slot in Hero: every volume in
 * the page's own colours and marks, drawn live in three.js on tablets and
 * desktops, and as its static render on phones.
 */
export function HeroShelf({
  poster,
  tone,
}: {
  /** A layout's own static render, sized for its slot. */
  poster?: ShelfPoster;
  tone?: ShelfTone;
}) {
  return (
    <Shelf
      volumes={labelVolumes()}
      featured={featured}
      poster={poster}
      tone={tone}
    />
  );
}
