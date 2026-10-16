import type { ReactNode } from 'react';

import { Footer } from '@/components/landing/Footer';
import { sans } from '@/components/landing/fonts';
import { Header } from '@/components/landing/Header';
import ui from '@/components/landing/label.module.css';

import styles from './article.module.css';
import { essayJsonLd, type Essay } from './essays';

/**
 * An essay on justevery.com, laid out as a blog post: the site's header
 * floating on a short lavender room that holds the meta line, the title, the
 * dek and, when there is one, a header figure; then the prose at a reading measure, with
 * figures breaking out a little wider; then a short end note.
 */
export function ArticlePage({
  essay,
  art,
  children,
  end,
}: {
  essay: Essay;
  /** The header figure, if any. */
  art?: ReactNode;
  children: ReactNode;
  /** The end note. */
  end: ReactNode;
}) {
  return (
    <div className={`${ui.page} ${sans.variable}`}>
      <Header />
      <main>
        <article className={styles.article}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(essayJsonLd(essay)),
            }}
          />
          <header className={`${styles.room} ${art ? '' : styles.bare}`}>
            <div className={styles.grid}>
              <p className={styles.meta}>
                <time dateTime={essay.published}>{essay.date}</time>
                <span aria-hidden="true">·</span>
                <span>{essay.readingTime}</span>
              </p>
              <h1 className={styles.title}>{essay.title}</h1>
              <p className={styles.dek}>{essay.dek}</p>
              {art}
            </div>
          </header>
          <div className={`${styles.grid} ${styles.body}`}>{children}</div>
          <footer className={`${styles.grid} ${styles.end}`}>{end}</footer>
        </article>
      </main>
      <Footer />
    </div>
  );
}
