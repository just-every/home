import { nav, wordmark } from '@/content/landing';

import ui from './label.module.css';
import styles from './header.module.css';

/** The header and footer's colour: the page's own, or the black bar. */
export type ChromeTone = 'light' | 'dark';

export interface HeaderProps {
  tone?: ChromeTone;
  /** A page look's own placement and colours for the header. */
  className?: string;
}

export function Header({ tone = 'light', className }: HeaderProps) {
  const classes = [ui.wrap, styles.header];
  if (tone === 'dark') classes.push(styles.dark);
  if (className) classes.push(className);
  return (
    <header className={classes.join(' ')}>
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
    </header>
  );
}
