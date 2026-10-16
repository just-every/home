import Link from 'next/link';

import { nav } from '@/content/landing';

import ui from './label.module.css';
import { Logo } from './Logo';
import styles from './header.module.css';

/**
 * The landing page's header, floating on the hero's room. `dusk` is the home
 * page's: over the hero's dusk sky the wordmark (and, stacked, the links)
 * turn light.
 */
export function Header({ dusk = false }: { dusk?: boolean }) {
  return (
    <header
      className={`${ui.wrap} ${styles.header} ${styles.floating} ${dusk ? styles.dusk : ''}`}
    >
      {/* The page links to itself: no prefetch needed. */}
      <Link className={styles.brand} href="/" prefetch={false}>
        <Logo />
      </Link>
      <nav aria-label="Main" className={styles.nav}>
        {nav.map(item => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
