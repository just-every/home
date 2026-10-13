import type { ReactNode } from 'react';

/**
 * The small sculpted icons over each question, ported from the approved
 * design's SVG symbols. Gradients live once in <QuestionIconDefs />.
 */
export type QuestionIconName =
  | 'box'
  | 'shield'
  | 'target'
  | 'gear'
  | 'globe'
  | 'refresh';

export function QuestionIconDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      style={{ position: 'absolute' }}
    >
      <defs>
        <linearGradient id="objects-q-green" x2="1" y2="1">
          <stop stopColor="#91c795" />
          <stop offset="1" stopColor="#397344" />
        </linearGradient>
        <linearGradient id="objects-q-gold" x2="0" y2="1">
          <stop stopColor="#ffd275" />
          <stop offset="1" stopColor="#d38c2c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const shapes: Record<QuestionIconName, ReactNode> = {
  box: (
    <>
      <path d="M15 26 57 17 94 29 90 73 25 76Z" fill="#d79c63" />
      <path
        d="m15 26 22-17 26 10-22 19Zm42-9 24-8 26 13-27 17Z"
        fill="#edbd8c"
      />
      <path d="m15 26-13 9 27 13 14-10M80 39l14-10 15 6-20 16" fill="#f3c99d" />
      <text
        x="36"
        y="65"
        fontSize="35"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fill="#69432b"
      >
        14
      </text>
    </>
  ),
  shield: (
    <>
      <path
        d="M55 5Q70 14 85 15L82 47Q74 69 55 80 28 67 26 44L25 15Q41 13 55 5Z"
        fill="url(#objects-q-green)"
        stroke="#9cb69a"
        strokeWidth="3"
      />
      <path
        d="m40 41 11 12 21-25"
        fill="none"
        stroke="#fff9df"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  target: (
    <>
      <ellipse cx="55" cy="43" rx="33" ry="38" fill="#cc4d43" />
      <ellipse cx="55" cy="42" rx="25" ry="30" fill="#ffe9d8" />
      <ellipse cx="55" cy="42" rx="17" ry="22" fill="#e66759" />
      <ellipse cx="55" cy="42" rx="8" ry="12" fill="#ffe9d8" />
    </>
  ),
  gear: (
    <g fill="#60728a" stroke="#3e5067" strokeWidth="2">
      <path d="m47 5 16 0 3 13 10 4 12-6 10 13-10 10 1 11 11 8-8 14-14-4-9 6-1 10H49l-3-12-10-5-12 5-10-14 10-9-1-11-10-8 9-14 13 5 10-6Z" />
      <circle cx="56" cy="45" r="15" fill="#f7f0e9" />
    </g>
  ),
  globe: (
    <>
      <circle cx="55" cy="43" r="37" fill="#459dcc" />
      <path
        d="m35 13 14-7 15 5 0 7 16 3-8 10-11-4-10 7 5 9-5 13-10-5-5-14-12-6 4-10Zm28 38 14-8 10 9-5 15-11 10-12-4 2-12ZM76 12l12 10 1 12-8-4-5-9"
        fill="#8db643"
      />
      <path
        d="M30 22Q17 51 45 72"
        stroke="#c5e4e4"
        strokeWidth="3"
        opacity=".5"
        fill="none"
      />
    </>
  ),
  refresh: (
    <>
      <path
        d="M27 36a28 28 0 0 1 49-14l7 8M82 51a28 28 0 0 1-48 15l-8-10"
        stroke="url(#objects-q-gold)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path d="m66 30 22 5 8-22M42 56l-22-5-8 22" fill="url(#objects-q-gold)" />
    </>
  ),
};

export function QuestionIcon({
  name,
  className,
}: {
  name: QuestionIconName;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 110 85" aria-hidden="true" className={className}>
      {shapes[name]}
    </svg>
  );
}
