import { CircleCheck, FileText, KeyRound } from 'lucide-react';
import type { CSSProperties } from 'react';

import { stand } from '@/content/landing';

import styles from './StandRun.module.css';
import ui from './running.module.css';

/** One icon and tint per point, in copy-deck order. */
const looks = [
  { Icon: FileText, color: '#2684ff', bg: '#eaf3ff' },
  { Icon: CircleCheck, color: '#0eab73', bg: '#e6faf2' },
  { Icon: KeyRound, color: '#9768ff', bg: '#f2edff' },
];

export function Stand() {
  return (
    <section
      className={`${ui.panel} ${styles.stand}`}
      aria-labelledby="running-stand-title"
    >
      <h2 id="running-stand-title" className={ui.sectionTitle}>
        {stand.heading}
      </h2>
      {stand.lines.map(line => (
        <p key={line} className={`${ui.sectionSubtitle} ${styles.standLine}`}>
          {line}
        </p>
      ))}
      <ul className={styles.points}>
        {stand.points.map((point, index) => {
          const { Icon, color, bg } = looks[index % looks.length];
          return (
            <li key={point.title} className={styles.point}>
              <span
                className={`${ui.circleIcon} ${styles.pointIcon}`}
                style={
                  { '--icon-color': color, '--icon-bg': bg } as CSSProperties
                }
              >
                <Icon className={styles.pointGlyph} aria-hidden="true" />
              </span>
              <div>
                <h3 className={styles.pointTitle}>{point.title}</h3>
                <p className={styles.pointText}>{point.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
