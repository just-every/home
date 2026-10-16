import { caveat } from './hero/fonts';
import styles from './footer-note.module.css';

/**
 * A handwritten aside to a footer link, in the hero's hand and ink, written
 * on the line under the link and sharing its left edge, with a short drawn
 * arrow from its end up toward the link's end (footer-note.module.css). The
 * link's list item takes `notedItem`. Decorative: hidden from assistive
 * tech, so the link's name stays its own label.
 */
export function FooterNote({ text }: { text: string }) {
  return (
    <span className={`${caveat.className} ${styles.note}`} aria-hidden="true">
      {text}
      {/* The drawing's units are px from the note's start (x) and its
          baseline (y), so the viewBox reads in the page's own px. */}
      <svg className={styles.arrow} viewBox="62 -34 26 25" focusable="false">
        <path d="M64.5 -11.5Q67.5 -23.5 85.5 -31" />
        <path d="M80.1 -31.9L85.5 -31L82.3 -26.5" />
      </svg>
    </span>
  );
}

/** The class for the list item that holds a noted link. */
export const notedItem = styles.noted;
