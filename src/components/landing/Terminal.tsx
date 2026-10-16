import { Fragment } from 'react';

import { CopyCommands } from './CopyCommands';
import styles from './panels.module.css';

/** The dark terminal that shows install commands, with a Copy button. */
export function Terminal({ commands }: { commands: readonly string[] }) {
  return (
    <div className={styles.terminal}>
      <div className={styles.terminalHead}>
        <span className={styles.lights} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.terminalTitle}>Terminal</span>
        <CopyCommands text={commands.join('\n')} />
      </div>
      <pre className={styles.commands}>
        <code>
          {commands.map(command => (
            <span key={command} className={styles.commandLine}>
              <span className={styles.prompt} aria-hidden="true">
                ${' '}
              </span>
              {command.split(' ').map((word, index) => (
                <Fragment key={index}>
                  {index > 0 ? ' ' : null}
                  <span className={styles.word}>{word}</span>
                </Fragment>
              ))}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
