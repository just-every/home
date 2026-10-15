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
      {/* A watering can tending someone's flower, painted in the footer's
          hand. Decorative. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.makersArt}
        src="/landing/painted/watering-can.svg"
        alt=""
        aria-hidden="true"
        width={170}
        height={155}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </article>
  );
}
