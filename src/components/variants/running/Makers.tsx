import { ArrowRight, Plus } from 'lucide-react';
import Image from 'next/image';

import { makers, wordmark } from '@/content/landing';
import { seeds } from '@/data/seeds';

import styles from './Makers.module.css';
import ui from './running.module.css';
import { lightMark } from './seed-view';

/** An empty card joining the collection: the design's art, without its invented text. */
function JoinArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.yours}>
        <span className={styles.plus}>
          <Plus />
        </span>
        <span className={styles.skeleton} style={{ width: '72%' }} />
        <span className={styles.skeleton} style={{ width: '88%' }} />
        <span className={styles.skeleton} style={{ width: '54%' }} />
      </div>
      <svg
        className={styles.arrow}
        viewBox="0 0 165 23"
        preserveAspectRatio="none"
      >
        <path
          d="M2 12h156"
          stroke="#617caa"
          strokeWidth="1.7"
          strokeDasharray="5 6"
          fill="none"
        />
        <path
          d="m152 7 7 5-7 5"
          stroke="#617caa"
          strokeWidth="1.7"
          fill="none"
        />
      </svg>
      <div className={styles.stack}>
        <span className={styles.back} />
        <span className={styles.back} />
        <div className={styles.front}>
          <span className={styles.wordmark}>{wordmark}</span>
          <span className={styles.marks}>
            {seeds.map(seed => (
              <Image
                key={seed.slug}
                src={lightMark(seed)}
                alt=""
                width={22}
                height={22}
                unoptimized
              />
            ))}
            <span className={styles.slot}>
              <Plus />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Makers() {
  return (
    <section
      className={`${ui.panel} ${styles.makers}`}
      aria-labelledby="running-makers-title"
    >
      <div className={styles.copy}>
        <h2 id="running-makers-title" className={ui.sectionTitle}>
          {makers.heading}
        </h2>
        <p className={styles.line}>{makers.line}</p>
        <a className={`${ui.pill} ${styles.cta}`} href={makers.link.href}>
          {makers.link.label}
          <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
        </a>
      </div>
      <JoinArt />
    </section>
  );
}
