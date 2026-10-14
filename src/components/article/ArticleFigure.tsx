import type { ReactNode } from 'react';

import styles from './article.module.css';

/**
 * A figure in an essay: a little wider than the text (`wide` for the header
 * figure, wider still), with its caption under it.
 */
export function ArticleFigure({
  children,
  caption,
  wide = false,
  className,
}: {
  children: ReactNode;
  caption: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`${styles.figure} ${wide ? styles.wide : ''} ${className ?? ''}`}
    >
      {children}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
