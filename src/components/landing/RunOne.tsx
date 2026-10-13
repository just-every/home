import { Fragment } from 'react';

import { runOne } from '@/content/landing';

import { CopyCommands } from './CopyCommands';
import ui from './label.module.css';
import styles from './panels.module.css';
import { volumes } from './volumes';

/** The volume the commands clone, found from the clone URL itself. */
const cloned = volumes.find(
  volume =>
    volume.seed.repo &&
    runOne.commands.some(command => command.endsWith(volume.seed.repo ?? ''))
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
            Volume {cloned.number} · {cloned.seed.name}
          </p>
        ) : null}
        <h2 className={ui.h3} id="label-run-heading">
          {runOne.heading}
        </h2>
        <p className={styles.text}>{runOne.line}</p>
        <p className={styles.after}>{runOne.afterLine}</p>
      </div>
      <div className={styles.terminalWrap}>
        <div className={styles.terminal}>
          <div className={styles.terminalHead}>
            <span className={styles.lights} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.terminalTitle}>Terminal</span>
            <CopyCommands text={runOne.commands.join('\n')} />
          </div>
          <pre className={styles.commands}>
            <code>
              {runOne.commands.map(command => (
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
        <p className={styles.altLine}>
          {runOne.altLine.before} <code>{runOne.altLine.command}</code>{' '}
          {runOne.altLine.after}
        </p>
      </div>
    </article>
  );
}
