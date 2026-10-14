import { footer, wordmark } from '@/content/landing';

import type { ChromeTone } from './Header';
import ui from './label.module.css';
import styles from './footer.module.css';
import { TokenCount } from './TokenCount';

export function Footer({ tone = 'light' }: { tone?: ChromeTone }) {
  return (
    <footer
      className={`${ui.wrap} ${styles.footer}${tone === 'dark' ? ` ${styles.dark}` : ''}`}
    >
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
    </footer>
  );
}
