import { ArrowUpRight } from 'lucide-react';

import { makers } from '@/content/landing';

import styles from './bottom.module.css';
import shared from './page.module.css';

export function Makers() {
  return (
    <article
      id="makers"
      className={`${styles.panel} ${styles.makers}`}
      aria-labelledby="objects-makers-title"
    >
      <h2 id="objects-makers-title" className={styles.title}>
        {makers.heading}
      </h2>
      <p className={styles.line}>{makers.line}</p>
      <div className={styles.actions}>
        <a className={shared.pill} href={makers.link.href}>
          {makers.link.label}
          <ArrowUpRight aria-hidden="true" className={styles.icon} />
        </a>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.plane}
        src="/variants/objects/plane.webp"
        alt="A folded wooden paper plane"
        width={292}
        height={176}
        loading="lazy"
      />
    </article>
  );
}
