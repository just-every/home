import { makers } from '@/content/landing';

import ui from './label.module.css';
import styles from './panels.module.css';

export function Makers() {
  return (
    <article
      className={`${ui.card} ${styles.makers}`}
      aria-labelledby="label-makers-heading"
    >
      <div>
        <p className={ui.eyebrow}>For makers</p>
        <h2 className={ui.h3} id="label-makers-heading">
          {makers.heading}
        </h2>
        <p className={styles.text}>
          {makers.line} {makers.welcome}
        </p>
        <div className={styles.makersActions}>
          <a className={`${ui.pill} ${ui.pillSmall}`} href={makers.link.href}>
            {makers.link.label}{' '}
            <span className={ui.arrow} aria-hidden="true">
              →
            </span>
          </a>
          <a className={ui.under} href={makers.reposLink.href}>
            <span>
              {makers.reposLink.label}{' '}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </span>
          </a>
        </div>
      </div>
      <svg
        className={styles.makersArt}
        viewBox="0 0 170 155"
        aria-hidden="true"
      >
        <path d="M54 1 101 85H7z" fill="#4bcfa3" opacity=".85" />
        <circle cx="108" cy="72" r="46" fill="#28c291" opacity=".75" />
        <path d="M99 83h66v67H99z" fill="#24b68a" opacity=".8" />
      </svg>
    </article>
  );
}
