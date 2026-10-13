import type { Seed } from '@/data/seed-types';

/** The mark drawn for a light surface, which this page always is. */
export function lightMark(seed: Seed): string {
  return seed.markLight ?? seed.mark;
}

/** Seconds as m:ss, for reel lengths. */
export function formatDuration(seconds: number): string {
  const whole = Math.round(seconds);
  const minutes = Math.floor(whole / 60);
  const rest = String(whole % 60).padStart(2, '0');
  return `${minutes}:${rest}`;
}

/** Cards link to `#reel-<slug>`; arriving there selects that reel. */
export function reelAnchor(slug: string): string {
  return `reel-${slug}`;
}
