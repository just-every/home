import type { ReactNode } from 'react';

import { handwriting } from '@/components/landing/fonts';

import styles from './parts.module.css';

/**
 * Pieces the essays' figures are drawn from, in the site's card language:
 * white sheets, the mono of a repository, a handwritten note.
 */

export { styles as parts };

/** A handwritten note, as on the landing page. */
export function Handnote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`${styles.handnote} ${handwriting.className} ${className ?? ''}`}
    >
      {children}
    </p>
  );
}
