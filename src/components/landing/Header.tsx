import Link from 'next/link';

import { nav } from '@/content/landing';

import ui from './label.module.css';
import type { HeroTone } from './hero/layouts';
import { Logo } from './Logo';
import styles from './header.module.css';

/** The landing page's header, floating on the hero's room. */
export function Header({ tone }: { tone?: HeroTone }) {
  return (
    <header
      className={`${ui.wrap} ${styles.header} ${styles.floating} ${tone ? styles[tone] : ''}`}
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
