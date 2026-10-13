import { githubOrgUrl, nav, wordmark } from '@/content/landing';

import m from './manifesto.module.css';
import styles from './nav.module.css';

/** The design's call to action repeats the hero's fixed primary button. */
const ctaLabel = 'See the collection';

export function Nav() {
  return (
    <header className={`${m.container} ${styles.bar}`}>
      <a
        href="#top"
        className={styles.wordmark}
        aria-label="Just Every, back to top"
      >
        {wordmark}
      </a>
      <nav aria-label="Main" className={styles.links}>
        <ul>
          {nav.map(item => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <a href="#all" className={styles.cta}>
        {ctaLabel}
      </a>
      <a href={githubOrgUrl} className={styles.mobileGithub}>
        GitHub
      </a>
    </header>
  );
}
