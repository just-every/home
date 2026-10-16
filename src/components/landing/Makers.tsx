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
    </article>
  );
}
