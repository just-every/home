import Link from 'next/link';

import styles from './article.module.css';
import type { Essay } from './essays';

/**
 * The essay's end: the other essay, then a quiet line of links (the
 * collection first).
 */
export function EndNote({
  next,
  links,
}: {
  next: Essay;
  links: { label: string; href: string }[];
}) {
  return (
    <div className={styles.endInner}>
      <p className={styles.endEyebrow}>Read next</p>
      <p className={styles.endTitle}>
        <Link href={`/${next.slug}`}>
          {next.title}{' '}
          <span className={styles.endArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </p>
      <p className={styles.endDek}>{next.dek}</p>
      <ul className={styles.endLinks}>
        {links.map(link => {
          const external = /^https?:/.test(link.href);
          const label = (
            <>
              <span className={styles.endLinkText}>{link.label}</span>
              <span aria-hidden="true">{external ? '↗' : '→'}</span>
            </>
          );
          return (
            <li key={link.href}>
              {external ? (
                <a href={link.href}>{label}</a>
              ) : (
                <Link href={link.href}>{label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
