import { PaintedArt } from '@/components/landing/SeparatorArt';
import { mailboxParts } from '@/components/landing/separator-parts';

import styles from './contact.module.css';

/**
 * A country mailbox with its flag up, a letter peeking out and a bird on
 * top, painted in the footer's hand: the page's greeting. Decorative; the
 * handwritten note's arrow points at its open door. The bird bobs and the
 * grass and flowers stir while it is on screen.
 */
export function HelloArt() {
  return (
    <PaintedArt
      className={styles.helloArt}
      src="/landing/painted/mailbox.svg"
      width={720}
      height={460}
      parts={mailboxParts}
    />
  );
}
