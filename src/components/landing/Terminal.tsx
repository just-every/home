import { Fragment } from 'react';

import { CopyCommands } from './CopyCommands';
import styles from './panels.module.css';
import { runCommand } from './runCommand';

/** The dark terminal that shows the run command, with a Copy button. */
export function Terminal({ target }: { target: string }) {
  const command = runCommand(target);
  return (
    <div className={styles.terminal}>
      <div className={styles.terminalHead}>
        <span className={styles.lights} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.terminalTitle}>Terminal</span>
        <CopyCommands target={target} />
      </div>
      <pre className={styles.commands}>
        <code>
          <span className={styles.commandLine}>
            <span className={styles.prompt} aria-hidden="true">
              ${' '}
            </span>
            {command.split(' ').map((word, index) => (
              <Fragment key={index}>
                {index > 0 ? ' ' : null}
                <span className={styles.word}>{word}</span>
              </Fragment>
            ))}
          </span>
        </code>
      </pre>
    </div>
  );
}
