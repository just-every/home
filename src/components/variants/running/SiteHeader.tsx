import { githubOrgUrl, nav, wordmark } from '@/content/landing';

import { GitHubMark } from './icons';
import styles from './SiteHeader.module.css';
import ui from './running.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#top">
        {wordmark}
      </a>
      <nav className={styles.nav} aria-label="Main">
        {nav.map(item => (
          <a
            key={item.href}
            href={item.href}
            // On wide screens "Star on GitHub" stands in for the GitHub item.
            className={
              item.href === githubOrgUrl ? styles.narrowOnly : undefined
            }
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className={styles.actions}>
        <a className={styles.github} href={githubOrgUrl}>
          <GitHubMark className={styles.githubIcon} />
          Star on GitHub
        </a>
        <span className={styles.divider} aria-hidden="true" />
        <a className={`${ui.pill} ${styles.cta}`} href="#all">
          See them all
        </a>
      </div>
    </header>
  );
}
