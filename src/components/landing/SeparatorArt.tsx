import type { CSSProperties } from 'react';

import type { ArtPart } from './separator-parts';
import styles from './separator-motion.module.css';
import { MotionStage } from './SeparatorMotion';

/**
 * A painted SVG shown still, with its moving parts laid exactly over it as
 * small images of their own. Only those images move, by CSS transform and
 * opacity, so the browser never repaints the large art.
 */
export function PaintedArt({
  src,
  width,
  height,
  parts,
  className,
  lazy = false,
}: {
  src: string;
  width: number;
  height: number;
  parts: readonly ArtPart[];
  className?: string;
  lazy?: boolean;
}) {
  return (
    <MotionStage
      className={className}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.base}
        src={src}
        alt=""
        width={width}
        height={height}
        loading={lazy ? 'lazy' : undefined}
        decoding="async"
        draggable={false}
      />
      {parts.map(part => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={part.src}
          className={`${styles.part} ${styles[part.motion]}`}
          src={part.src}
          alt=""
          loading={lazy ? 'lazy' : undefined}
          decoding="async"
          draggable={false}
          style={
            {
              left: `${part.box[0]}%`,
              top: `${part.box[1]}%`,
              width: `${part.box[2]}%`,
              height: `${part.box[3]}%`,
              transformOrigin: part.origin,
              '--amp': part.amp ?? 0,
              '--dur': `${part.dur}s`,
              animationDelay: `${part.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </MotionStage>
  );
}
