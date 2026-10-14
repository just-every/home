import Link from 'next/link';

import { ArticleFigure } from '@/components/article/ArticleFigure';
import { Handnote, Mark, parts } from '@/components/article/parts';
import { Logo } from '@/components/landing/Logo';
import { seeds } from '@/data/seeds';

import styles from './journey.module.css';

const VIDEO_URL = 'https://youtu.be/UOASHZPruQk';

/**
 * Figure 1, the header: our first homepage (commit f47ba68 in
 * just-every/home, src/app/page.tsx, 30 May 2025), redrawn in ink with its
 * own strings: the wordmark, the hero line, the fair warning, the question
 * and the titles of its first two example cards.
 */
export function FirstHomepage() {
  return (
    <ArticleFigure
      className={styles.firstFigure}
      caption="Our first homepage, 30 May 2025, redrawn from its source."
    >
      <div className={styles.browser}>
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.url}>justevery.com</span>
        </div>
        <div className={styles.screen}>
          <div className={styles.oldNav}>
            <Logo />
          </div>
          <p className={styles.oldHero}>When apps end, ideas begin.</p>
          <p className={styles.oldWarn}>
            <strong>Fair warning:</strong> We’re an MVP that will fail
            sometimes.
          </p>
          <p className={styles.oldAsk}>
            What can you build in{' '}
            <span className={styles.circled}>
              30 seconds
              <svg
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M30 9C70 1 168 3 191 20c13 11-6 29-62 34C66 59 10 52 6 33 3 18 32 7 74 6" />
              </svg>
            </span>
            ?
          </p>
          <div className={styles.oldCards}>
            <div>
              <span className={styles.thumb} />
              <p>Startup Metrics Dashboard</p>
            </div>
            <div>
              <span className={`${styles.thumb} ${styles.thumbTwo}`} />
              <p>AI Study Buddy</p>
            </div>
          </div>
        </div>
        <Handnote className={styles.stamp}>30 May 2025</Handnote>
      </div>
    </ArticleFigure>
  );
}

/** Five real upstream merges on Every Code's main, newest first, local time. */
const merges = [
  {
    title: 'Merge upstream/main into JustEvery code',
    date: '30 Sep 2026',
    time: '07:02',
  },
  {
    title: 'Merge upstream/main into JustEvery main',
    date: '29 Sep 2026',
    time: '07:05',
  },
  {
    title: 'Merge upstream/main: refresh Codex history',
    date: '18 Sep 2026',
    time: '07:03',
  },
  {
    title: 'Merge upstream/main: preserve JustEvery workflow state',
    date: '17 Sep 2026',
    time: '07:05',
  },
  {
    title: 'Merge upstream/main: keep JustEvery workflow state',
    date: '15 Sep 2026',
    time: '07:04',
  },
];

/** Figure 2: the Auto Drive video, and the merges that landed after seven. */
export function AutoDriveAndMerges() {
  return (
    <ArticleFigure caption="Every Code kept up with Codex on its own. The merges landed a few minutes after seven.">
      <div className={styles.pair}>
        <a className={styles.video} href={VIDEO_URL}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/articles/journey/auto-drive.webp"
            alt="Every Code’s poster for the Auto Drive video: the word CODE in neon on a dark wall, with a play button."
            width={960}
            height={544}
            loading="lazy"
            decoding="async"
          />
          <span className={styles.videoLabel}>
            <span>Auto Drive Explained · 2:36</span>
            <span className={styles.videoWatch}>
              Watch on YouTube <span aria-hidden="true">↗</span>
            </span>
          </span>
        </a>
        <div className={`${parts.sheet} ${styles.commits}`}>
          <div className={styles.commitsHead}>
            <p className={styles.repo}>just-every/code</p>
            <p className={styles.forked}>forked from openai/codex</p>
          </div>
          <ol>
            {merges.map(merge => (
              <li key={merge.date}>
                <span className={styles.commitTitle}>{merge.title}</span>
                <span className={styles.commitWhen}>
                  {merge.date} · <strong>{merge.time}</strong>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ArticleFigure>
  );
}

/** 12ui's four steps, in its own numbering. */
const steps = [
  ['01', 'Search'],
  ['02', 'Draft'],
  ['0u', 'Branch'],
  ['0i', 'Convert'],
];

/** Figure 3: the 12ui design picked for this site, and the first build of it. */
export function DesignAndBuild() {
  return (
    <ArticleFigure caption="The 12ui design we picked for this site, and the first build of it. The hero has since been rewritten.">
      <div className={parts.panel}>
        <ol className={styles.steps} aria-label="12ui’s steps">
          {steps.map(([number, label]) => (
            <li key={number}>
              <span className={parts.mono}>{number}</span> {label}
            </li>
          ))}
        </ol>
        <div className={styles.compare}>
          <div>
            <p className={parts.label}>12ui image</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/articles/journey/12ui-design.webp"
              alt="The 12ui design for justevery.com: the headline “Just about every SaaS.” beside a box set of fourteen coloured volumes, then the first row of product cards."
              width={1040}
              height={650}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className={parts.label}>First build, 13 Oct 2026</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/articles/journey/first-build.webp"
              alt="The first build of the same page: the same headline, box set and card row, built in code."
              width={1040}
              height={650}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </ArticleFigure>
  );
}

/** Figure 4: the shelf render from the landing page, and the fourteen repos. */
export function Shelf() {
  return (
    <ArticleFigure
      caption={
        <>
          Fourteen products, all public and MIT licensed.{' '}
          <Link href="/#all">
            See all fourteen <span aria-hidden="true">→</span>
          </Link>
        </>
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.shelf}
        src="/landing/shelf/shelf-1440.webp"
        alt={`The fourteen products as a row of book spines, each in its own colour with its own mark: ${seeds.map(s => s.name).join(', ')}.`}
        width={2242}
        height={1092}
        loading="lazy"
        decoding="async"
      />
      <ul className={styles.repos} aria-label="The fourteen repositories">
        {seeds.map(seed => (
          <li key={seed.slug}>
            <a href={seed.repo}>{seed.repo.split('/').pop()}</a>
          </li>
        ))}
      </ul>
    </ArticleFigure>
  );
}

/** Figure 5: Uptime's promise, from the page to the contract to the test. */
export function PromiseTraced() {
  return (
    <ArticleFigure caption="One promise, from the page to the contract to the test.">
      <ol className={`${parts.panel} ${styles.trace}`}>
        <li className={parts.sheet}>
          <p className={parts.label}>
            <Mark slug="uptime" size={20} /> Homepage
          </p>
          <p className={styles.traceText}>
            “Alerts you only when a failure is confirmed.”
          </p>
        </li>
        <li className={parts.sheet}>
          <p className={parts.label}>CONTRACT.md</p>
          <p className={styles.traceText}>
            “Failing requires terminal target failures from two distinct runner
            network labels, or one failing vantage with its passing canary in
            the same slot.”
          </p>
        </li>
        <li className={parts.sheet}>
          <p className={parts.label}>The check</p>
          <p className={`${styles.traceText} ${parts.mono}`}>
            tests/resilience/attempts.mjs
          </p>
        </li>
      </ol>
    </ArticleFigure>
  );
}
