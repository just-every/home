/** The design's line icons, all decorative. */

export const PeopleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 28" aria-hidden="true">
    <circle cx="10" cy="9" r="4" fill="currentColor" />
    <circle cx="23" cy="9" r="4.5" fill="currentColor" />
    <path d="M1 22c0-9 16-9 16 0zm12 0c0-10 18-10 18 0z" fill="currentColor" />
  </svg>
);

export const TransferArrow = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 71 67" aria-hidden="true">
    <defs>
      <linearGradient id="hero-e-arrow-fill">
        <stop stopColor="#dcd6ff" />
        <stop offset="1" stopColor="#6c54ff" />
      </linearGradient>
    </defs>
    <path
      d="M9 34h52M45 15l19 19-19 19"
      fill="none"
      stroke="url(#hero-e-arrow-fill)"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Rays = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 50" aria-hidden="true">
    <path d="m9 17 3-15m11 25 17-13M29 44l15 1" />
  </svg>
);

/** The notes' hand-drawn arrows: down-right from the left note, down-left from the right. */
export const NoteArrow = ({
  className,
  side,
}: {
  className?: string;
  side: 'left' | 'right';
}) => (
  <svg className={className} viewBox="0 0 96 68" aria-hidden="true">
    <path
      d={
        side === 'left'
          ? 'M12 8q10 28 51 32m-10-12 11 13-13 8'
          : 'M62 5q-7 29-46 35m8-12-9 13 12 8'
      }
    />
  </svg>
);

export const LockIcon = () => (
  <svg viewBox="0 0 30 30" aria-hidden="true">
    <path d="M8 13h15v13H8zM11 13V9a5 5 0 0 1 9 0v4" />
  </svg>
);

export const CodeIcon = () => (
  <svg viewBox="0 0 30 30" aria-hidden="true">
    <path d="m9 10-6 5 6 5m12-10 6 5-6 5M18 6l-6 18" />
  </svg>
);

/** Sliders: the code is yours to change. */
export const ChangeIcon = () => (
  <svg viewBox="0 0 30 30" aria-hidden="true">
    <path d="M5 9h20M5 15h20M5 21h20" />
    <circle cx="11" cy="9" r="2.6" fill="#e9e5ff" />
    <circle cx="19" cy="15" r="2.6" fill="#e9e5ff" />
    <circle cx="9" cy="21" r="2.6" fill="#e9e5ff" />
  </svg>
);
