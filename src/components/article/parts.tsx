import type { ReactNode } from 'react';

import { handwriting } from '@/components/landing/fonts';

import styles from './parts.module.css';

/**
 * Pieces the essays' figures are drawn from, in the site's card language:
 * white sheets, the mono of a repository, a handwritten note.
 */

export { styles as parts };

/** A clause ID, in the accent pill. */
export function ClauseId({
  children,
  large = false,
}: {
  children: ReactNode;
  large?: boolean;
}) {
  return (
    <span className={`${styles.clauseId} ${large ? styles.clauseIdLarge : ''}`}>
      {children}
    </span>
  );
}

/** Lines of a source file, numbered as in the file. */
export function CodeFrame({
  file,
  lines,
}: {
  file: string;
  lines: { n: number; code: ReactNode }[];
}) {
  return (
    <div className={styles.code}>
      <p className={styles.codeFile}>{file}</p>
      <pre>
        {lines.map(line => (
          <span key={line.n} className={styles.codeLine}>
            <span className={styles.codeNum} aria-hidden="true">
              {line.n}
            </span>
            <code>{line.code}</code>
          </span>
        ))}
      </pre>
    </div>
  );
}

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
