import {
  Boxes,
  CircleHelp,
  Database,
  MonitorPlay,
  PenLine,
  Scale,
  Wrench,
} from 'lucide-react';
import type { CSSProperties } from 'react';

import { questions } from '@/content/landing';

import styles from './Questions.module.css';
import ui from './running.module.css';

/** One icon and tint per question, in copy-deck order. */
const looks = [
  { Icon: CircleHelp, color: '#ff853a', bg: '#fff2e7' },
  { Icon: Boxes, color: '#2684ff', bg: '#eaf3ff' },
  { Icon: MonitorPlay, color: '#14ac72', bg: '#e8fbf3' },
  { Icon: Wrench, color: '#9065ff', bg: '#f1ebff' },
  { Icon: PenLine, color: '#2684ff', bg: '#eaf3ff' },
  { Icon: Database, color: '#15ab71', bg: '#e8faf1' },
  { Icon: Scale, color: '#ff853a', bg: '#fff2e7' },
];

export function Questions() {
  return (
    <section
      id={questions.id}
      className={`${ui.panel} ${styles.faq}`}
      aria-labelledby="running-questions-title"
    >
      <h2 id="running-questions-title" className={ui.sectionTitle}>
        {questions.heading}
      </h2>
      <p className={ui.sectionSubtitle}>{questions.line}</p>
      <ul className={styles.grid}>
        {questions.items.map((item, index) => {
          const { Icon, color, bg } = looks[index % looks.length];
          return (
            <li key={item.question} className={styles.card}>
              <span
                className={ui.circleIcon}
                style={
                  { '--icon-color': color, '--icon-bg': bg } as CSSProperties
                }
              >
                <Icon className={styles.icon} aria-hidden="true" />
              </span>
              <h3 className={styles.question}>{item.question}</h3>
              <p className={styles.answer}>{item.answer}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
