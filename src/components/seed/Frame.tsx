import type { CSSProperties, ReactNode } from 'react';

import styles from './frame.module.css';

/**
 * A light browser window around one picture in a seed's gallery, as in the
 * Journey essay's first figure: three dots and, where the picture is of a web
 * page, its host in the address bar (null leaves the bar neutral), and the
 * caption under it. `ratio` is the picture's width over its height: the
 * window keeps a 16:9 screen's height and narrows for a taller picture, so
 * every window in a gallery stands level. On a phone a picture a little
 * taller than 16:9 (down to 3:2) fills the window's width instead, its foot
 * trimmed, so the next slide peeks in at the same place.
 */
export function Frame({
  host,
  ratio,
  caption,
  children,
}: {
  host: string | null;
  ratio: number;
  caption: string;
  children: ReactNode;
}) {
  const fill = ratio >= 1.5 && ratio < 16 / 9;
  return (
    <figure
      className={`${styles.figure} ${fill ? styles.fill : ''}`}
      style={{ '--ratio': ratio } as CSSProperties}
    >
      <div className={styles.window}>
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          {host ? <span className={styles.url}>{host}</span> : null}
        </div>
        <div className={styles.screen}>{children}</div>
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
