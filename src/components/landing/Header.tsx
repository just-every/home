import { nav, wordmark } from '@/content/landing';

import ui from './label.module.css';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${ui.wrap} ${styles.inner}`}>
        <a className={styles.brand} href="#top" aria-label="Just Every, top">
          {wordmark}
        </a>
        <nav aria-label="Main" className={styles.nav}>
          {nav.map(item => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
