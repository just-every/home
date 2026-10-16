import { caveat } from './hero/fonts';
import styles from './footer-note.module.css';

/**
 * A handwritten aside to a footer link, in the hero's hand and ink, with a
 * drawn arrow back to the link: on phones the note sits after the link on
 * its line, wider it tucks under the link (footer-note.module.css). The
 * link's list item takes `notedItem`. Decorative: hidden from assistive
 * tech, so the link's name stays its own label.
 */
export function FooterNote({ text }: { text: string }) {
  return (
    <span className={`${caveat.className} ${styles.note}`} aria-hidden="true">
      {text}
      {/* The drawings' units are px from the note's start (x) and its
          baseline (y), so the viewBoxes read in the page's own px. */}
      <svg
        className={`${styles.arrow} ${styles.beside}`}
        viewBox="-28 -32 44 20"
        focusable="false"
      >
        <path d="M15 -19.5C11 -29 -10 -30 -21 -14" />
        <path d="M-21.5 -20L-21 -14L-15.5 -15.5" />
      </svg>
      <svg
        className={`${styles.arrow} ${styles.under}`}
        viewBox="10 -52 62 40"
        focusable="false"
      >
        <path d="M15.5 -16.5C27 -25 58 -22 64 -30C67 -34 65 -42 62 -47" />
        <path d="M62 -42L62 -47L66.4 -44.6" />
      </svg>
    </span>
  );
}

/** The class for the list item that holds a noted link. */
export const notedItem = styles.noted;
