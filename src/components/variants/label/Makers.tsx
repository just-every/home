import { makers } from '@/content/landing';

import ui from './label.module.css';
import styles from './panels.module.css';

export function Makers() {
  return (
    <article className={styles.makers} aria-labelledby="label-makers-heading">
      <div className={styles.makersCopy}>
        <p className={ui.eyebrow}>For makers</p>
        <h2 className={styles.heading} id="label-makers-heading">
          {makers.heading}
        </h2>
        <p className={styles.text}>{makers.line}</p>
        <a className={`${ui.pill} ${styles.panelPill}`} href={makers.link.href}>
          {makers.link.label}{' '}
          <span className={ui.arrow} aria-hidden="true">
            →
          </span>
        </a>
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
