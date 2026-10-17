import { caveat } from './hero/fonts';
import styles from './footer-note.module.css';

/**
 * A handwritten aside to a footer link, in the hero's hand and ink, written
 * on the line under the link and sharing its left edge, with a short arrow
 * drawn out of its end, round and up into the link (footer-note.module.css).
 * The link's list item takes `notedItem`. Decorative: hidden from assistive
 * tech, so the link's name stays its own label.
 */
export function FooterNote({ text }: { text: string }) {
  return (
    <span className={`${caveat.className} ${styles.note}`} aria-hidden="true">
      {text}
      {/* The drawing's units are px from the note's start (x) and its
          baseline (y), so the viewBox reads in the page's own px. */}
      <svg className={styles.arrow} viewBox="64 -34 34 31" focusable="false">
        <path d="M65.2 -4.4C79.5 -4.6 94.6 -13.3 93.4 -32.1" />
        <path d="M90.1 -27.1L93.4 -32.1L96.2 -27.8" />
      </svg>
    </span>
  );
}

/** The class for the list item that holds a noted link. */
export const notedItem = styles.noted;
