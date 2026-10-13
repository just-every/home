import type { ReactNode } from 'react';

export type GlyphShape =
  | 'circle'
  | 'triangle'
  | 'heptagon'
  | 'square'
  | 'star'
  | 'folded';

interface GlyphProps {
  shape: GlyphShape;
  color: string;
  className?: string;
}

/**
 * A plain coloured shape that marks a question card, as in the approved
 * design. It stands for no product and is always decorative.
 */
export function Glyph({ shape, color, className }: GlyphProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      aria-hidden="true"
      style={{ color }}
    >
      {paths[shape]}
    </svg>
  );
}

const sheen = (d: string, opacity: number) => (
  <path d={d} fill="#fff" opacity={opacity} />
);

const paths: Record<GlyphShape, ReactNode> = {
  folded: (
    <>
      <path d="M9 4h32v42H9z" fill="currentColor" />
      <path d="M9 4h14L9 18z" fill="#fff" opacity=".35" />
      {sheen('M41 4v42H25z', 0.1)}
    </>
  ),
  heptagon: (
    <>
      <path d="m25 3 15 7 5 16-9 15H14L5 26l5-16z" fill="currentColor" />
      {sheen('m25 3 15 7 5 16H5l5-16z', 0.1)}
    </>
  ),
  square: (
    <>
      <path d="M6 4h38v42H6z" fill="currentColor" />
      {sheen('M6 4h38L6 46z', 0.08)}
    </>
  ),
  triangle: (
    <>
      <path d="M25 3 47 46H3z" fill="currentColor" />
      {sheen('M25 3 14 46H3z', 0.14)}
    </>
  ),
  circle: (
    <>
      <circle cx="25" cy="25" r="21" fill="currentColor" />
      {sheen('M9 13Q30 1 43 26Q21 19 9 13', 0.1)}
    </>
  ),
  star: (
    <path
      d="M25 2c2 13 9 21 23 23-14 2-21 10-23 23-2-13-9-21-23-23 14-2 21-10 23-23z"
      fill="currentColor"
    />
  ),
};
