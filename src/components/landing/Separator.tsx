import type { CSSProperties } from 'react';

import styles from './separator.module.css';

/**
 * Each strip is painted 3840 CSS px wide (garden and meadow-path at 2x), its
 * sky transparent and its foot a flat ground edge. `height` is the full
 * height at 3840 wide; `width` and `height` are the SVG's own viewBox.
 */
const strips = {
  creek: { src: '/landing/separators/creek.svg', w: 3840, h: 220, show: 220 },
  garden: { src: '/landing/separators/garden.svg', w: 7680, h: 380, show: 190 },
  hedgerow: {
    src: '/landing/separators/hedgerow.svg',
    w: 3840,
    h: 188,
    show: 188,
  },
  'meadow-path': {
    src: '/landing/separators/meadow-path.svg',
    w: 7680,
    h: 400,
    show: 200,
  },
} as const;

export type SeparatorVariant = keyof typeof strips;

/** Every strip, in the order the seed pages rotate through them. */
export const separatorVariants = Object.keys(strips) as SeparatorVariant[];

/**
 * A painted strip that closes a section (never the page: the footer has its
 * own scene). It sits at the section's foot, cropped from the middle on
 * narrower screens, ignores the pointer and is decorative. Below the art its
 * ground colour holds and then fades over a long tail behind the next
 * section (separator.module.css), so the strip eases out instead of ending
 * on a line.
 */
export function Separator({ variant }: { variant: SeparatorVariant }) {
  const strip = strips[variant];
  return (
    <div
      className={`${styles.band} ${styles[variant === 'meadow-path' ? 'meadow' : variant]}`}
      style={{ '--show': `${strip.show}px` } as CSSProperties}
      aria-hidden="true"
    >
      <div className={styles.art}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={strip.src}
          alt=""
          aria-hidden="true"
          width={strip.w}
          height={strip.h}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  );
}
