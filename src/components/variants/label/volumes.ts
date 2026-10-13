import { seeds } from '@/data/seeds';
import type { Seed } from '@/data/seeds';

/**
 * The label device: every product is a numbered volume in one box set, with
 * its own spine colour and spine shape. Numbers follow seeds.ts order, so a
 * new seed simply becomes the next volume.
 */
export type VolumeShape =
  | 'cover-slate'
  | 'cover-vector'
  | 'cover-cradle'
  | 'ring'
  | 'folded'
  | 'heptagon'
  | 'square'
  | 'triangle'
  | 'circle'
  | 'tab'
  | 'star';

interface VolumeStyle {
  /** Spine colour in the box-set art. */
  spine: string;
  /** Colour of the spine's shape. */
  ink: string;
  /** Card background. */
  tint: string;
  shape: VolumeShape;
}

/** Colours and shapes sampled from the approved box-set art. */
const styles: Record<string, VolumeStyle> = {
  slate: {
    spine: '#f1eeec',
    ink: '#3c7bf0',
    tint: '#e9f3fd',
    shape: 'cover-slate',
  },
  vector: {
    spine: '#aebafb',
    ink: '#6a50dc',
    tint: '#eee9fd',
    shape: 'cover-vector',
  },
  cradle: {
    spine: '#ace0c1',
    ink: '#1fa77a',
    tint: '#e9f6f0',
    shape: 'cover-cradle',
  },
  penny: { spine: '#fcb5a1', ink: '#d2492a', tint: '#fff0ea', shape: 'ring' },
  pencil: {
    spine: '#fedd66',
    ink: '#e0a312',
    tint: '#fff8e3',
    shape: 'folded',
  },
  mango: {
    spine: '#f8b27e',
    ink: '#d4600f',
    tint: '#fff1e6',
    shape: 'heptagon',
  },
  lamp: { spine: '#93c8fc', ink: '#1f6fd0', tint: '#e8f3ff', shape: 'square' },
  dial: {
    spine: '#f9bed5',
    ink: '#c23c71',
    tint: '#fceef5',
    shape: 'triangle',
  },
  happytohelp: {
    spine: '#cac4fb',
    ink: '#6152c4',
    tint: '#f1eeff',
    shape: 'heptagon',
  },
  orbit: { spine: '#abd6c4', ink: '#118a5f', tint: '#e8f6f0', shape: 'circle' },
  nook: { spine: '#e6d2c4', ink: '#b07a55', tint: '#f8f0ea', shape: 'tab' },
  uptime: { spine: '#d6b6ea', ink: '#9446a8', tint: '#f6eefc', shape: 'star' },
  oncall: {
    spine: '#9fcdfd',
    ink: '#1a7fd4',
    tint: '#e9f3ff',
    shape: 'circle',
  },
  spool: { spine: '#c6deaf', ink: '#1b9a4f', tint: '#eef7e7', shape: 'circle' },
};

const fallback: VolumeStyle = {
  spine: '#e4e2ee',
  ink: '#6b6a80',
  tint: '#f3f2f8',
  shape: 'square',
};

export interface Volume extends VolumeStyle {
  seed: Seed;
  /** Two-digit volume number, 01 upward. */
  number: string;
}

export const volumes: Volume[] = seeds.map((seed, index) => ({
  ...(styles[seed.slug] ?? fallback),
  seed,
  number: String(index + 1).padStart(2, '0'),
}));

/** Volumes 01 to 03 are shown face-out, as covers. */
export const coverVolumes = volumes.slice(0, 3);
export const spineVolumes = volumes.slice(3);

export const volumeCount = volumes.length;
