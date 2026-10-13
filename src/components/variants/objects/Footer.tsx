import { footer, wordmark } from '@/content/landing';

import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a className={styles.brand} href="#top">
        {wordmark}
      </a>
      <div className={styles.text}>
        <p className={styles.line}>{footer.line}</p>
        <p className={styles.small}>{footer.smallPrint}</p>
      </div>
      <nav aria-label="Footer" className={styles.links}>
        {footer.links.map(link => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
