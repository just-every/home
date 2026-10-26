import { runOne } from '@/content/landing';

import ui from './label.module.css';
import styles from './panels.module.css';
import { AltLine } from './AltLine';
import { Terminal } from './Terminal';

export function RunOne() {
  return (
    <article
      className={`${ui.card} ${styles.install}`}
      aria-labelledby="label-run-heading"
    >
      <div>
        <h2 className={ui.h3} id="label-run-heading">
          {runOne.heading}
        </h2>
        <p className={styles.text}>{runOne.line}</p>
      </div>
      <div className={styles.terminalWrap}>
        <Terminal target={runOne.target} />
        <AltLine target={runOne.target} />
      </div>
    </article>
  );
}
