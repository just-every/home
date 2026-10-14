import type { ReactNode } from 'react';

import { handwriting } from '@/components/landing/fonts';
import { seeds } from '@/data/seeds';

import styles from './parts.module.css';

/**
 * Pieces the essays' figures are drawn from, in the site's card language:
 * soft fills, white sheets, the mono of a repository, ticks and crosses.
 */

export { styles as parts };

/** A check's outcome, as GitHub draws it: a green tick or a red cross. */
export function Status({ ok }: { ok: boolean }) {
  return (
    <span
      className={`${styles.status} ${ok ? styles.ok : styles.fail}`}
      role="img"
      aria-label={ok ? 'Passed' : 'Failed'}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        {ok ? (
          <path d="M4.2 8.4 6.9 11l5-5.8" />
        ) : (
          <path d="m5 5 6 6M11 5l-6 6" />
        )}
      </svg>
    </span>
  );
}

/** A product's real mark, in its light-surface colours. */
export function Mark({ slug, size = 22 }: { slug: string; size?: number }) {
  const seed = seeds.find(s => s.slug === slug);
  if (!seed) throw new Error(`No seed named ${slug}`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.mark}
      src={seed.markLight ?? seed.mark}
      alt=""
      width={size}
      height={size}
    />
  );
}

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

/** A clause ID in running text, kept on one line. */
export function Id({ children }: { children: ReactNode }) {
  return <span className={styles.nowrap}>{children}</span>;
}

/** One line of a terminal: what a check printed. */
export function Terminal({
  children,
  label,
  tone = 'ok',
}: {
  children: ReactNode;
  label?: string;
  tone?: 'ok' | 'fail';
}) {
  return (
    <div className={styles.terminal}>
      {label && <span className={styles.terminalLabel}>{label}</span>}
      <code className={tone === 'ok' ? styles.termOk : styles.termFail}>
        {children}
      </code>
    </div>
  );
}

/**
 * Lines of a source file, numbered as in the file; an excerpt that is not a
 * run of real lines (`numbered={false}`) goes without numbers.
 */
export function CodeFrame({
  file,
  lines,
  numbered = true,
}: {
  file: string;
  lines: { n?: number; code: ReactNode }[];
  numbered?: boolean;
}) {
  return (
    <div className={styles.code}>
      <p className={styles.codeFile}>{file}</p>
      <pre className={numbered ? undefined : styles.unnumbered}>
        {lines.map((line, index) => (
          <span key={line.n ?? index} className={styles.codeLine}>
            {numbered && (
              <span className={styles.codeNum} aria-hidden="true">
                {line.n}
              </span>
            )}
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
