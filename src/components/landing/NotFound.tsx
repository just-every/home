import Link from 'next/link';

import { notFound } from '@/content/landing';

import { sans } from './fonts';
import header from './header.module.css';
import ui from './label.module.css';
import { Logo } from './Logo';
import { PaintedArt } from './SeparatorArt';
import { dogParts } from './separator-parts';
import styles from './not-found.module.css';

/**
 * The 404 page, in the landing page's own type, tokens and pill, with the
 * footer's painted dog looking down a path that runs out.
 */
export function NotFound() {
  return (
    <div className={`${ui.page} ${sans.variable} ${styles.page}`}>
      <header className={`${ui.wrap} ${header.header}`}>
        <Link className={header.brand} href="/">
          <Logo />
        </Link>
      </header>
      <main className={`${ui.wrap} ${styles.main}`}>
        <div className={styles.copy}>
          <h1 className={ui.h2}>{notFound.heading}</h1>
          <p className={`${ui.lead} ${styles.line}`}>{notFound.line}</p>
          <Link className={`${ui.pill} ${ui.pillSmall}`} href="/">
            {notFound.home}{' '}
            <span className={ui.arrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        {/* The footer's dog, wondering where the path went, wagging its
            tail. Decorative. */}
        <PaintedArt
          className={styles.art}
          src="/landing/painted/dog.svg"
          width={1120}
          height={840}
          parts={dogParts}
        />
      </main>
    </div>
  );
}
