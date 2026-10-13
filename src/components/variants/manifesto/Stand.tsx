import {
  ChevronRight,
  FileText,
  KeyRound,
  ShieldCheck,
  SquareArrowOutUpRight,
} from 'lucide-react';

import { githubOrgUrl, runOne, stand } from '@/content/landing';

import m from './manifesto.module.css';
import styles from './stand.module.css';

const pointIcons = [
  { icon: FileText, tone: styles.toneBlue },
  { icon: ShieldCheck, tone: styles.toneGreen },
  { icon: KeyRound, tone: styles.tonePurple },
] as const;

/** What Just Every stands for: the copy deck's three points, in the design's card. */
export function Stand() {
  const [opening, ...rest] = stand.lines[0].split(': ');
  return (
    <section className={styles.section} aria-labelledby="manifesto-stand-title">
      <div id="stand" className={styles.copy}>
        <h2
          id="manifesto-stand-title"
          className={`${m.display} ${styles.title}`}
        >
          {stand.heading}
        </h2>
        <p className={styles.lede}>
          <strong>{opening}:</strong> {rest.join(': ')}
        </p>
        <div className={styles.actions}>
          <a href="#run" className={m.buttonPrimary}>
            {runOne.heading.replace(/\.$/, '')}
            <ChevronRight size={22} strokeWidth={2.25} aria-hidden="true" />
          </a>
          <a href={githubOrgUrl} className={m.textLink}>
            <span>GitHub</span>
            <SquareArrowOutUpRight
              size={19}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
      <ul className={styles.points}>
        {stand.points.map((point, index) => {
          const { icon: Icon, tone } = pointIcons[index % pointIcons.length];
          return (
            <li key={point.title}>
              <span className={`${styles.pointIcon} ${tone}`}>
                <Icon size={32} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
