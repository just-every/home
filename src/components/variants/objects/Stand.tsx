import { BadgeCheck, FileText, KeyRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { stand } from '@/content/landing';

import styles from './stand.module.css';

const scene = '/variants/objects';

/** One symbol per point, in the copy deck's order. */
const symbols: { Icon: LucideIcon; tone: string }[] = [
  { Icon: FileText, tone: styles.blue },
  { Icon: BadgeCheck, tone: styles.green },
  { Icon: KeyRound, tone: styles.amber },
];

export function Stand() {
  return (
    <section className={styles.stand} aria-labelledby="objects-stand-title">
      <div className={styles.copy}>
        <h2 id="objects-stand-title" className={styles.title}>
          {stand.heading}
        </h2>
        {stand.lines.map(line => (
          <p key={line} className={styles.lead}>
            {line}
          </p>
        ))}
        <ul className={styles.points}>
          {stand.points.map((point, i) => {
            const { Icon, tone } = symbols[i % symbols.length];
            return (
              <li key={point.title} className={styles.point}>
                <span className={`${styles.symbol} ${tone}`} aria-hidden="true">
                  <Icon />
                </span>
                <span>
                  <strong className={styles.pointTitle}>{point.title}</strong>
                  <span className={styles.pointText}>{point.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={`${scene}/values-1536.webp 1536w, ${scene}/values-3072.webp 3072w`}
          sizes="(min-width: 1536px) 1536px, 100vw"
        />
        <img
          className={styles.scene}
          src={`${scene}/values-crop-680.webp`}
          srcSet={`${scene}/values-crop-680.webp 680w, ${scene}/values-crop-1360.webp 1360w`}
          sizes="100vw"
          alt="Four books on a sunlit desk with Written down, Checked, Yours and MIT licensed on their spines, beside a potted plant"
          width={1360}
          height={646}
          loading="lazy"
        />
      </picture>
    </section>
  );
}
