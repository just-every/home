import { ArticleFigure } from '@/components/article/ArticleFigure';
import {
  ClauseId,
  CodeFrame,
  Handnote,
  Mark,
  parts,
  Status,
  Terminal,
} from '@/components/article/parts';

import styles from './process.module.css';

/**
 * Figure 1, the header: three real clauses from run-lamp's CONTRACT.md
 * (v1.4.0, 104 clauses) beside Lamp's pull request #5 with its real checks,
 * all of which passed on 13 Oct 2026.
 */
export function ContractAndPullRequest() {
  return (
    <ArticleFigure
      wide
      caption="Lamp’s contract, and one of its pull requests with every check passed. Across the fourteen products there are 1,088 promises like these."
    >
      <div className={styles.header}>
        <div className={`${parts.sheet} ${styles.contract}`}>
          <p className={parts.sheetHead}>
            <Mark slug="lamp" size={22} />
            CONTRACT.md
            <span className={parts.aside}>run-lamp</span>
          </p>
          <ol className={styles.clauses}>
            <li>
              <ClauseId>PAGE-005</ClauseId>
              <span>Snapshot read path.</span>
            </li>
            <li className={styles.ticked}>
              <ClauseId>PAGE-006</ClauseId>
              <span>Serving through a failure.</span>
              <svg
                className={styles.pencilTick}
                viewBox="0 0 40 30"
                aria-hidden="true"
              >
                <path d="M4 16c4 3 7 7 9 10C18 16 26 7 37 3" />
              </svg>
            </li>
            <li>
              <ClauseId>PAGE-007</ClauseId>
              <span>Publish latency and caching.</span>
            </li>
          </ol>
          <p className={styles.contractFoot}>104 promises, each with a test</p>
        </div>

        <div className={styles.between} aria-hidden="true">
          <Handnote className={styles.betweenNote}>
            The checks run <br />
            in public.
          </Handnote>
          <svg className={styles.dashed} viewBox="0 0 120 16">
            <path d="M2 8h104" />
            <path d="m104 2 8 6-8 6" />
          </svg>
          <svg className={styles.dashedDown} viewBox="0 0 16 48">
            <path d="M8 2v34" />
            <path d="m2 36 6 8 6-8" />
          </svg>
        </div>

        <div className={`${parts.sheet} ${styles.pr}`}>
          <p className={parts.sheetHead}>
            <svg
              className={styles.prIcon}
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <circle cx="4" cy="3.5" r="1.8" />
              <circle cx="4" cy="12.5" r="1.8" />
              <circle cx="12" cy="12.5" r="1.8" />
              <path d="M4 5.3v5.4M12 10.7V7.5c0-1.7-1-2.7-2.7-2.7H7" />
              <path d="m8.6 3 -1.8 1.8 1.8 1.8" />
            </svg>
            Pull request #5
            <span className={styles.passing}>
              <Status ok /> Checks passed
            </span>
          </p>
          <div className={styles.prBody}>
            <p className={styles.prTitle}>
              fix(sources): re-lock sources after the README banner
            </p>
            <p className={styles.prMeta}>
              just-every/run-lamp · merged 13 Oct 2026
            </p>
            <ul className={styles.checks}>
              <li>
                <Status ok /> verify
              </li>
              <li>
                <Status ok /> Analyze (actions)
              </li>
              <li>
                <Status ok /> Analyze (javascript-typescript)
              </li>
              <li>
                <Status ok /> CodeQL
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ArticleFigure>
  );
}

/**
 * Figure 2: PAGE-006 and its test, lines 496-502 of run-lamp
 * tests/e2e/app-api.test.mjs at v1.4.0 (line 497 shortened where marked),
 * and the coverage check's own line.
 */
export function ClauseAndTest() {
  const s = (text: string) => <span className={parts.str}>{text}</span>;
  return (
    <ArticleFigure caption="The promise, its test, and Lamp’s check that no promise goes untested.">
      <div className={`${parts.panel} ${styles.clauseTest}`}>
        <div className={`${parts.sheet} ${styles.clauseCard}`}>
          <ClauseId large>PAGE-006</ClauseId>
          <p className={styles.clauseTitle}>Serving through a failure.</p>
          <p className={styles.clauseText}>
            When the database, the queue, or object storage is unreachable…
          </p>
          <p className={styles.clauseText}>
            …no failed read ever produces the all-clear of PAGE-004.
          </p>
        </div>
        <span className={styles.link} aria-hidden="true" />
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
                  <span className={parts.hl}>
                    {s('"DROP TABLE page_settings"')}
                  </span>
                  ], <span className={parts.dim}>…</span>);
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
                <>
                  {'  '}assert.doesNotMatch(html,{' '}
                  {s('/All systems operational/')});
                </>
              ),
            },
          ]}
        />
        <div className={styles.clauseTestTerminal}>
          <Terminal label="tests/contract-coverage.test.mjs">
            ok 1 - every product contract clause has an executable tagged
            behavior test invoked by verify
          </Terminal>
        </div>
      </div>
    </ArticleFigure>
  );
}

/** Figure 3: Pencil pull request #9's two verify runs and the fix between. */
export function PencilChecks() {
  return (
    <ArticleFigure caption="Pencil #9: one test caught an old expectation, and the fix said why.">
      <div className={parts.panel}>
        <div className={`${parts.sheet} ${styles.runs}`}>
          <p className={parts.sheetHead}>
            <Mark slug="pencil" size={22} />
            just-every/run-pencil
            <span className={parts.aside}>#9</span>
          </p>
          <p className={styles.runsTitle}>
            Never restore sign-in authorization from a backup
          </p>
          <ol className={styles.runList}>
            <li className={styles.run}>
              <Status ok={false} />
              <span className={styles.runName}>Verify candidate</span>
              <span className={parts.mono}>7db7c16</span>
              <span className={styles.runResult}>
                Tests <b className={styles.failed}>1 failed</b> | 314 passed
              </span>
            </li>
            <li className={styles.commit}>
              <span className={styles.commitDot} aria-hidden="true" />
              <span className={parts.mono}>2ed8bdf</span>
              <span>
                Restored respondent progress no longer resumes with the old
                token
              </span>
            </li>
            <li className={styles.run}>
              <Status ok />
              <span className={styles.runName}>Verify candidate</span>
              <span className={parts.mono}>63dcb6e</span>
              <span className={styles.runResult}>
                Tests <b className={styles.passed}>315 passed</b>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </ArticleFigure>
  );
}

/**
 * Figure 4: UPDATE-006 changed in Lamp 1.4.0, its RELEASE.json entry (the
 * `was`/`now` sentences shortened where marked) and the release check's
 * refusal when a promise changes without one.
 */
export function PromiseChanged() {
  const s = (text: string) => <span className={parts.str}>{text}</span>;
  return (
    <ArticleFigure caption="Lamp 1.4.0 changed a promise, and wrote down why. Change one without that and the check says no.">
      <div className={`${parts.panel} ${styles.stack}`}>
        <div className={`${parts.sheet} ${styles.clauseCard}`}>
          <p className={styles.clauseHead}>
            <ClauseId>UPDATE-006</ClauseId>
            <span className={styles.clauseTitleSmall}>Scheduled publish.</span>
          </p>
          <p className={styles.clauseText}>
            An update given a future publish time publishes within{' '}
            <del className={styles.struck}>60</del>{' '}
            <ins className={styles.inserted}>240</ins> seconds of that time…
          </p>
        </div>
        <CodeFrame
          file="RELEASE.json · 1.4.0 · contractChanges"
          numbered={false}
          lines={[
            { code: <>&quot;UPDATE-006&quot;: {'{'}</> },
            {
              code: (
                <>
                  {'  '}&quot;change&quot;: {s('"changed"')},
                </>
              ),
            },
            {
              code: (
                <>
                  {'  '}&quot;summary&quot;:{' '}
                  {s(
                    '"…the latest became publicly visible 238.5 seconds after its due time…"'
                  )}
                  ,
                </>
              ),
            },
            {
              code: (
                <>
                  {'  '}&quot;was&quot;: {s('"…within 60 seconds…"')},
                </>
              ),
            },
            {
              code: (
                <>
                  {'  '}&quot;now&quot;: {s('"…within 240 seconds…"')}
                </>
              ),
            },
            { code: <>{'}'}</> },
          ]}
        />
        <Terminal label="scripts/validate-release.mjs" tone="fail">
          1.4.0 INCIDENT-004 changed meaning without a changed release entry.
        </Terminal>
      </div>
    </ArticleFigure>
  );
}

/** Four real upstream merges on Every Code's main, September 2026. */
const merges = [
  {
    title: 'Merge upstream/main: keep JustEvery root policy',
    commits: 114,
    date: '8 Sep',
  },
  {
    title: 'Merge upstream/main: refresh codex ancestry',
    commits: 152,
    date: '11 Sep',
  },
  {
    title: 'Merge upstream/main: preserve JustEvery workflow state',
    commits: 70,
    date: '16 Sep',
  },
  {
    title: 'Merge upstream/main into JustEvery main',
    commits: 618,
    date: '29 Sep',
  },
];

/** The first prefer_ours_globs of Every Code's .github/merge-policy.json. */
const preferOurs = [
  'codex-rs/tui/**',
  'codex-cli/**',
  'AGENTS.md',
  'README.md',
];

/** Figure 5: two lanes, the merges dropping from Codex into Every Code. */
export function ForkLanes() {
  return (
    <ArticleFigure caption="Every Code, April to September 2026: 5,306 upstream commits in 85 merges.">
      <div className={`${parts.panel} ${styles.forkPanel}`}>
        <div className={styles.lanes}>
          <p className={styles.laneHead}>
            <span>openai/codex</span>
            <span>just-every/code</span>
          </p>
          <ol className={styles.mergeList}>
            {merges.map(merge => (
              <li key={merge.date} className={styles.merge}>
                <span className={styles.from} aria-hidden="true" />
                <span className={styles.to} aria-hidden="true" />
                <span className={styles.mergeText}>
                  <span className={styles.mergeTitle}>{merge.title}</span>
                  <span className={styles.mergeMeta}>
                    {merge.commits} commits · {merge.date}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className={`${parts.sheet} ${styles.policy}`}>
          <p className={styles.policyFile}>.github/merge-policy.json</p>
          <pre>
            <code>
              <span className={parts.dim}>
                &quot;prefer_ours_globs&quot;: [
              </span>
              {preferOurs.map(glob => (
                <span key={glob} className={styles.glob}>
                  {'  '}
                  <span className={parts.str}>&quot;{glob}&quot;</span>,
                </span>
              ))}
              <span className={parts.dim}>{'  '}…</span>
            </code>
          </pre>
        </div>
      </div>
    </ArticleFigure>
  );
}
