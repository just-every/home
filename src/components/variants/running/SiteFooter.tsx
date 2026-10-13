import { ArrowRight } from 'lucide-react';

import { footer, wordmark } from '@/content/landing';

import styles from './SiteFooter.module.css';
import ui from './running.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <a className={styles.brand} href="#top">
          {wordmark}
        </a>
        <nav className={styles.nav} aria-label="Footer">
          {footer.links.map(link => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className={`${ui.pill} ${styles.cta}`} href="#all">
          See them all
          <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
        </a>
      </div>
      <div className={styles.small}>
        <p>{footer.line}</p>
        <p>{footer.smallPrint}</p>
      </div>
    </footer>
  );
}
