import { CircleCheck, Package } from 'lucide-react';

import { Fragment } from 'react';

import { runOne } from '@/content/landing';

import { CopyCommands } from './CopyCommands';
import styles from './StandRun.module.css';
import ui from './running.module.css';

/** Lets a long command wrap after a slash rather than mid-word. */
function breakable(text: string) {
  return text.split('/').map((part, index, parts) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 && (
        <>
          /<wbr />
        </>
      )}
    </Fragment>
  ));
}

export function RunOne() {
  return (
    <section
      className={`${ui.panel} ${styles.run}`}
      aria-labelledby="running-run-title"
    >
      <h2 id="running-run-title" className={ui.sectionTitle}>
        {runOne.heading}
      </h2>
      <p className={ui.sectionSubtitle}>{runOne.line}</p>
      <div className={styles.runBody}>
        <div className={styles.note}>
          <span className={styles.noteIcon}>
            <CircleCheck aria-hidden="true" />
          </span>
          <p>{runOne.afterLine}</p>
        </div>
        <div className={styles.terminal}>
          <div className={styles.terminalBar}>
            <span className={styles.lights} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className={styles.terminalTitle} aria-hidden="true">
              Terminal
            </span>
            <CopyCommands text={runOne.commands.join('\n')} />
          </div>
          <pre className={styles.commands}>
            <code>
              {runOne.commands.map(command => (
                <span key={command} className={styles.command}>
                  <span className={styles.prompt} aria-hidden="true">
                    ${' '}
                  </span>
                  {breakable(command)}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
      <div className={`${styles.note} ${styles.altNote}`}>
        <span className={styles.noteIcon}>
          <Package aria-hidden="true" />
        </span>
        <p>
          {runOne.altLine.before}{' '}
          <code className={styles.inlineCode}>
            {breakable(runOne.altLine.command)}
          </code>{' '}
          {runOne.altLine.after}
        </p>
      </div>
    </section>
  );
}
