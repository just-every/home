/**
 * The hand-drawn strokes of design G, as drawn in the 12ui conversion:
 * the arrows that tie the notes to the lists and the trust row's three line
 * icons. All are decoration.
 */

type Props = { className?: string };

export const StartArrow = ({ className }: Props) => (
  <svg className={className} viewBox="0 0 62 40" aria-hidden="true">
    <path d="M55 3C28 7 39 29 4 29m8-5-9 5 8 5" />
  </svg>
);

export const FromArrow = ({ className }: Props) => (
  <svg className={className} viewBox="0 0 35 56" aria-hidden="true">
    <path d="M3 5c18 12 20 29 17 47m-4-8 4 9 6-8" />
  </svg>
);

export const SwitchArrow = ({ className }: Props) => (
  <svg className={className} viewBox="0 0 65 48" aria-hidden="true">
    <path
      d="M7 30Q32 8 52 26L44 9 61 28 38 36l13-12"
      fill="#9b86df"
      stroke="#9b86df"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

export const SixArrow = ({ className }: Props) => (
  <svg className={className} viewBox="0 0 53 42" aria-hidden="true">
    <path d="M47 3Q39 30 5 29m8-5-9 5 8 5" />
  </svg>
);

export const UpArrow = ({ className }: Props) => (
  <svg className={className} viewBox="0 0 47 56" aria-hidden="true">
    <path d="M38 50Q6 44 8 5m-5 8 5-9 5 9" />
  </svg>
);

export const LeafIcon = () => (
  <svg viewBox="0 0 24 28" aria-hidden="true">
    <path d="M3 24C17 6 20 8 20 8M3 18C-1 8 8 3 22 2c0 14-5 23-15 19" />
  </svg>
);

export const CodeIcon = () => (
  <svg viewBox="0 0 26 28" aria-hidden="true">
    <path d="m7 8-6 6 6 6m12-12 6 6-6 6M16 5l-6 18" />
  </svg>
);

export const DocIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 2h9l5 5v15H5zM14 2v6h5M9 12h6M9 16h6" />
  </svg>
);
