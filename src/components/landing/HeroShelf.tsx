import { Shelf } from './shelf3d/Shelf';
import { labelVolumes } from './volumes';

/** The volume shown face out at the front of the box set. */
export const featured = 'uptime';

/**
 * The hero's box set, filling the width of its slot in Hero: every volume in
 * the page's own colours and marks, drawn live in three.js on tablets and
 * desktops, and as its static render on phones.
 */
export function HeroShelf() {
  return <Shelf volumes={labelVolumes()} featured={featured} />;
}
