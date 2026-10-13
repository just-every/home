import type { ReactNode } from 'react';

import type { VolumeShape } from './volumes';

interface VolumeMarkProps {
  shape: VolumeShape;
  color: string;
  className?: string;
}

/**
 * The shape printed on a volume's spine. It stands in for a product mark in
 * this variant, so it is always decorative: the product name sits beside it.
 */
export function VolumeMark({ shape, color, className }: VolumeMarkProps) {
  if (shape === 'cover-slate') {
    return (
      <svg className={className} viewBox="0 0 120 110" aria-hidden="true">
        <defs>
          <linearGradient id="label-slate-ball" x2="1" y2="1">
            <stop stopColor="#54a0ff" />
            <stop offset="1" stopColor="#347afa" />
          </linearGradient>
        </defs>
        <circle cx="43" cy="33" r="31" fill="url(#label-slate-ball)" />
        <path d="M25 67h47v40H25z" fill="#3c6bdc" />
        <path d="M78 28h31v79H78z" fill="#81b9fc" />
      </svg>
    );
  }
  if (shape === 'cover-vector') {
    return (
      <svg className={className} viewBox="0 0 120 110" aria-hidden="true">
        <path d="M60 3 117 105H3z" fill="#a596f8" />
        <path d="m77 34 40 71H32z" fill="#7760db" />
        <path d="m91 60 26 45H64z" fill="#4731a0" />
      </svg>
    );
  }
  if (shape === 'cover-cradle') {
    return (
      <svg className={className} viewBox="0 0 110 110" aria-hidden="true">
        <circle cx="55" cy="38" r="35" fill="#43c79e" opacity=".9" />
        <circle cx="34" cy="72" r="31" fill="#65dcb8" opacity=".7" />
        <circle cx="76" cy="70" r="34" fill="#15a379" opacity=".78" />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      aria-hidden="true"
      style={{ color }}
    >
      {shapePaths[shape]}
    </svg>
  );
}

const sheen = (d: string, opacity = 0.12) => (
  <path d={d} fill="#fff" opacity={opacity} />
);

const shapePaths: Record<
  Exclude<VolumeShape, 'cover-slate' | 'cover-vector' | 'cover-cradle'>,
  ReactNode
> = {
  ring: (
    <>
      <circle
        cx="25"
        cy="25"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
    </>
  ),
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
  tab: (
    <>
      <path d="M8 4h34v24c0 10-8 18-18 18H8z" fill="currentColor" />
      {sheen('M8 4h16v42H8z', 0.16)}
    </>
  ),
  star: (
    <>
      <path
        d="M25 2c2 13 9 21 23 23-14 2-21 10-23 23-2-13-9-21-23-23 14-2 21-10 23-23z"
        fill="currentColor"
      />
    </>
  ),
};
