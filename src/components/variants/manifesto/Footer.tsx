import { footer, wordmark } from '@/content/landing';

import styles from './footer.module.css';
import m from './manifesto.module.css';

/** The footer, in the strip style the design puts under its sections. */
export function Footer() {
  return (
    <footer className={m.container}>
      <div className={styles.strip}>
        <div className={styles.brand}>
          <a
            href="#top"
            className={styles.wordmark}
            aria-label="Just Every, back to top"
          >
            {wordmark}
          </a>
          <p className={styles.line}>{footer.line}</p>
        </div>
        <nav aria-label="Footer" className={styles.links}>
          <ul>
            {footer.links.map(link => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.small}>{footer.smallPrint}</p>
      </div>
    </footer>
  );
}
