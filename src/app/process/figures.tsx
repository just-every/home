import { ArticleFigure } from '@/components/article/ArticleFigure';
import { autoDrive } from '@/components/article/autoDrive';
import { AutoDriveVideo } from '@/components/article/AutoDriveVideo';
import {
  ClauseId,
  CodeFrame,
  Handnote,
  parts,
} from '@/components/article/parts';

import styles from './process.module.css';

/**
 * Figure 1: Lamp's PAGE-006 beside the test that guards it, joined ID to ID.
 * run-lamp at v1.4.0: CONTRACT.md line 22 (opening and closing words) and
 * tests/e2e/app-api.test.mjs lines 496-502 (line 497 shortened where marked).
 */
export function PromiseAndTest() {
  const s = (text: string) => <span className={parts.str}>{text}</span>;
  return (
    <ArticleFigure caption="One of Lamp’s promises, and the test that breaks the database to check it.">
      <div className={styles.promiseTest}>
        <div className={styles.promise}>
          <p className={parts.codeFile}>CONTRACT.md</p>
          <div className={styles.promiseBody}>
            <ClauseId large>PAGE-006</ClauseId>
            <p className={styles.promiseTitle}>Serving through a failure.</p>
            <p className={styles.promiseText}>
              “When the database, the queue, or object storage is unreachable…
            </p>
            <p className={styles.promiseText}>
              …no failed read ever produces the all-clear of PAGE-004.”
            </p>
          </div>
        </div>
        <span className={styles.join} aria-hidden="true" />
        <CodeFrame
          file="tests/e2e/app-api.test.mjs"
          lines={[
            {
              n: 496,
              code: (
                <>
                  contract(
                  <span className={parts.hl}>&quot;PAGE-006&quot;</span>,{' '}
                  {s(
                    '"public reads survive a D1 failure and never invent an all-clear"'
                  )}
                  , async () =&gt; {'{'}
                </>
              ),
            },
            {
              n: 497,
              code: (
                <>
                  {'  '}execFileSync({s('"pnpm"')}, [{s('"exec"')},{' '}
                  {s('"wrangler"')}, {s('"d1"')}, {s('"execute"')},{' '}
                  <span className={parts.dim}>…</span>,{' '}
                  {s('"DROP TABLE page_settings"')}],{' '}
                  <span className={parts.dim}>…</span>);
                </>
              ),
            },
            {
              n: 498,
              code: (
                <>
                  {'  '}const response = await fetch(`${'{'}pageUrl{'}'}/`);
                </>
              ),
            },
            {
              n: 499,
              code: <>{'  '}assert.equal(response.status, 200);</>,
            },
            {
              n: 500,
              code: <>{'  '}const html = await response.text();</>,
            },
            {
              n: 501,
              code: (
                <>
                  {'  '}assert.match(html, {s('/Partially unavailable/')});
                </>
              ),
            },
            {
              n: 502,
              code: (
                <span className={styles.guard}>
                  {'  '}assert.doesNotMatch(html, /All systems operational/);
                </span>
              ),
            },
          ]}
        />
      </div>
    </ArticleFigure>
  );
}

/**
 * Figure 2: UPDATE-006 as Lamp 1.4.0 changed it (run-lamp v1.4.0
 * CONTRACT.md line 71, its opening words), and the measurement in
 * RELEASE.json contractChanges.UPDATE-006.summary.
 */
export function PromiseChanged() {
  return (
    <ArticleFigure caption="Lamp 1.4.0 changed a promise, and kept the reason.">
      <div className={styles.changed}>
        <div className={`${parts.sheet} ${styles.changedCard}`}>
          <p className={styles.changedHead}>
            <ClauseId>UPDATE-006</ClauseId>
            <span className={styles.changedTitle}>Scheduled publish.</span>
          </p>
          <p className={styles.changedText}>
            “An update given a future publish time publishes within{' '}
            <span className={styles.nowrap}>
              <del className={styles.struck}>
                60
                <svg
                  viewBox="0 0 40 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M1 15C11 12 25 8 39 4" />
                </svg>
              </del>{' '}
              <ins className={styles.inserted}>240</ins>
            </span>{' '}
            seconds of that time…”
          </p>
        </div>
        <div>
          <p className={styles.marginLabel}>RELEASE.json, 1.4.0</p>
          <Handnote className={styles.marginNote}>
            “…the latest became publicly visible 238.5 seconds after its due
            time.”
          </Handnote>
        </div>
      </div>
    </ArticleFigure>
  );
}

/** Figure 3: the Auto Drive video, playable in the page. */
export function AutoDrive() {
  return (
    <ArticleFigure
      caption={
        <>
          Auto Drive, built in our fork of Codex: hand it a planned task and it
          keeps going until it’s done.{' '}
          <a href={autoDrive.watchUrl}>
            Watch on YouTube <span aria-hidden="true">↗</span>
          </a>
        </>
      }
    >
      <AutoDriveVideo />
    </ArticleFigure>
  );
}
