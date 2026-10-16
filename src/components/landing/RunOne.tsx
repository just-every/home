import { runOne } from '@/content/landing';

import ui from './label.module.css';
import styles from './panels.module.css';
import { Terminal } from './Terminal';
import { volumes } from './volumes';

/** The product the commands clone, found from the clone URL itself. */
const cloned = volumes.find(volume =>
  runOne.commands.some(command => command.endsWith(volume.seed.repo))
);

export function RunOne() {
  return (
    <article
      className={`${ui.card} ${styles.install}`}
      aria-labelledby="label-run-heading"
    >
      <div>
        {cloned ? (
          <p className={ui.eyebrow}>
            {cloned.number} · {cloned.seed.name}
          </p>
        ) : null}
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
