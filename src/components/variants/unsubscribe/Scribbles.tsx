/**
 * Hand-drawn strokes for the margin notes: arrows, burst marks and an
 * underline. Purely decorative.
 */

type ScribbleProps = { className?: string };

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** A curved arrow that falls from a note down to the left. */
export function ArrowDown({ className }: ScribbleProps) {
  return (
    <svg className={className} viewBox="0 0 34 70" aria-hidden="true">
      <path {...stroke} d="M14 2C3 18 1 40 18 64" />
      <path {...stroke} d="M8 57l10 8 3-12" />
    </svg>
  );
}

/** A curved arrow that sweeps from a note back down to the left. */
export function ArrowSweep({ className }: ScribbleProps) {
  return (
    <svg className={className} viewBox="0 0 60 40" aria-hidden="true">
      <path {...stroke} d="M58 4C36 4 16 12 6 34" />
      <path {...stroke} d="M3 22l3 13 12-6" />
    </svg>
  );
}

/** Three short strokes that say "look here". */
export function Burst({ className }: ScribbleProps) {
  return (
    <svg className={className} viewBox="0 0 40 72" aria-hidden="true">
      <path {...stroke} d="M30 4 10 24" />
      <path {...stroke} d="M8 37l28-4" />
      <path {...stroke} d="M10 50l22 16" />
    </svg>
  );
}

/** Three short strokes fanning upwards. */
export function BurstUp({ className }: ScribbleProps) {
  return (
    <svg className={className} viewBox="0 0 60 40" aria-hidden="true">
      <path {...stroke} d="M8 6l3 20" />
      <path {...stroke} d="M30 2 22 24" />
      <path {...stroke} d="M52 16 34 28" />
    </svg>
  );
}

/** A loose underline. */
export function Underline({ className }: ScribbleProps) {
  return (
    <svg className={className} viewBox="0 0 90 12" aria-hidden="true">
      <path {...stroke} d="M2 10C30 5 58 3 88 2" />
    </svg>
  );
}
