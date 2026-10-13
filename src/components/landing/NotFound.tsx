import Link from 'next/link';

import { notFound, wordmark } from '@/content/landing';

import { sans } from './fonts';
import header from './header.module.css';
import ui from './label.module.css';
import styles from './not-found.module.css';

/** The 404 page, in the landing page's own type, tokens and pill. */
export function NotFound() {
  return (
    <div className={`${ui.page} ${sans.variable} ${styles.page}`}>
      <header className={`${ui.wrap} ${header.header}`}>
        <Link className={header.brand} href="/" aria-label="Just Every, home">
          {wordmark}
        </Link>
      </header>
      <main className={`${ui.wrap} ${styles.main}`}>
        <p className={ui.eyebrow}>404</p>
        <h1 className={ui.h2}>{notFound.heading}</h1>
        <p className={`${ui.lead} ${styles.line}`}>{notFound.line}</p>
        <Link className={`${ui.pill} ${ui.pillSmall}`} href="/">
          {notFound.home}{' '}
          <span className={ui.arrow} aria-hidden="true">
            →
          </span>
        </Link>
      </main>
    </div>
  );
}
