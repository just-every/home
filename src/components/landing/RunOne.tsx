import { runOne } from '@/content/landing';

import ui from './label.module.css';
import styles from './panels.module.css';
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
        <Terminal commands={runOne.commands} />
        <p className={styles.altLine}>
          {runOne.altLine.before} <code>{runOne.altLine.command}</code>{' '}
          {runOne.altLine.after}
        </p>
      </div>
    </article>
  );
}
