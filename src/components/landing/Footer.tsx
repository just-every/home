import { footer, wordmark } from '@/content/landing';

import ui from './label.module.css';
import styles from './footer.module.css';
import { TokenCount } from './TokenCount';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${ui.wrap} ${styles.inner}`}>
        <a className={styles.brand} href="#top" aria-label="Just Every, top">
          {wordmark}
        </a>
        <nav aria-label="Footer" className={styles.nav}>
          {footer.links.map(link => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <TokenCount />
      </div>
    </footer>
  );
}
