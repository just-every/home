import styles from './contact.module.css';

/**
 * A country mailbox with its flag up, a letter peeking out and a bird on
 * top, painted in the footer's hand: the page's greeting. Decorative; the
 * handwritten note's arrow points at its open door.
 */
export function HelloArt() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.helloArt}
      src="/landing/painted/mailbox.svg"
      alt=""
      aria-hidden="true"
      width={360}
      height={230}
      decoding="async"
      draggable={false}
    />
  );
}
