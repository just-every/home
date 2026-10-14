import Link from 'next/link';

import { footer } from '@/content/landing';

import ui from './label.module.css';
import { Logo } from './Logo';
import styles from './footer.module.css';
import { TokenCount } from './TokenCount';

export function Footer() {
  return (
    <footer className={`${ui.wrap} ${styles.footer}`}>
      {/* The page links to itself: no prefetch needed. */}
      <Link className={styles.brand} href="/" prefetch={false}>
        <Logo />
      </Link>
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
