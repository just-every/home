import type { ReactNode } from 'react';

import styles from './hero-e.module.css';
import { ChangeIcon, CodeIcon, LockIcon } from './icons';

const features: { icon: ReactNode; lead: string; line: string }[] = [
  { icon: <LockIcon />, lead: 'Free to use', line: 'No per-seat bills' },
  { icon: <CodeIcon />, lead: 'Open source', line: 'MIT licensed' },
  {
    icon: <ChangeIcon />,
    lead: 'Yours to change',
    line: 'Your code, your data',
  },
];

/** The design's feature row under the button. */
export function Features() {
  return (
    <ul className={styles.features}>
      {features.map(feature => (
        <li key={feature.lead}>
          <span className={styles.featureIcon}>{feature.icon}</span>
          <div>
            <p className={styles.featureLead}>{feature.lead}</p>
            <p className={styles.featureLine}>{feature.line}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
