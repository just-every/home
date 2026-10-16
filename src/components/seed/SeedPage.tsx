import type { CSSProperties } from 'react';

import { Footer } from '@/components/landing/Footer';
import { sans } from '@/components/landing/fonts';
import { Header } from '@/components/landing/Header';
import ui from '@/components/landing/label.module.css';
import { Separator, separatorVariants } from '@/components/landing/Separator';
import { Terminal } from '@/components/landing/Terminal';
import { Reel } from '@/components/shared/Reel';
import { collection, runOne } from '@/content/landing';

import { seedPages } from './model';
import type { SeedPageModel } from './model';
import { seedJsonLd } from './seoData';
import styles from './seed.module.css';
import { SiteLink } from './SiteLink';

const host = (url: string) => new URL(url).host;

/** The commands that run this seed: the site's own, with this seed's repo. */
const installCommands = (page: SeedPageModel) => {
  const name = page.repo.split('/').pop()!;
  return [
    runOne.commands[0],
    `git clone ${page.repo}`,
    `cd ${name} && rer dev`,
  ];
};

/**
 * One seed's own page, /<slug>: its name, what it replaces and its video (or
 * a still of its homepage), then what it does, what it promises, what it
 * moves in, how to run it and where it runs. Prose at a reading measure, the
 * picture wider, the painted ground at the foot.
 */
export function SeedPage({ page }: { page: SeedPageModel }) {
  const style = {
    '--pastel': page.pastel,
    '--brand-ink': page.ink,
  } as CSSProperties;
  const primary = page.homepage
    ? { href: page.homepage, label: host(page.homepage) }
    : null;
  const alsoReplaces = page.replaces.filter(
    name => name !== page.primaryReplace
  );
  // The strip rotates with the seed's place in the list, so neighbours differ.
  const strip =
    separatorVariants[seedPages.indexOf(page) % separatorVariants.length];
  return (
    <div className={`${ui.page} ${sans.variable}`} style={style}>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seedJsonLd(page)),
          }}
        />
        <article className={styles.article}>
          <header className={styles.room}>
            <div className={styles.col}>
              <div className={styles.tile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.mark}
                  src={page.mark}
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                  decoding="async"
                  draggable={false}
                />
              </div>
              <h1 className={styles.title}>{page.name}</h1>
              {page.soon ? <p className={styles.soon}>Coming soon</p> : null}
              <p className={styles.alt}>
                {page.primaryReplace
                  ? `${collection.alternativeTo} ${page.primaryReplace}`
                  : page.category}
              </p>
              {alsoReplaces.length > 0 ? (
                <p className={styles.also}>
                  Also replaces {alsoReplaces.join(', ')}
                </p>
              ) : null}
              <p className={styles.line}>{page.line}</p>
            </div>
          </header>

          {page.reel || (page.homepageShot && page.homepage) ? (
            <div className={styles.media}>
              {page.reel ? (
                <Reel
                  seed={{ name: page.name, line: page.line, reel: page.reel }}
                  className={styles.picture}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.picture}
                  src={page.homepageShot!}
                  alt={`The ${page.name} homepage, ${host(page.homepage!)}`}
                  width={1280}
                  height={720}
                  decoding="async"
                  draggable={false}
                />
              )}
            </div>
          ) : null}

          <Separator variant={strip} />

          <div className={`${styles.col} ${styles.body}`}>
            <div className={styles.links}>
              {primary ? (
                <>
                  <SiteLink
                    className={`${ui.pill} ${ui.pillSmall}`}
                    href={primary.href}
                    name={page.name}
                  >
                    {primary.label}{' '}
                    <span className={ui.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </SiteLink>
                  <a
                    className={ui.under}
                    href={page.repo}
                    aria-label={`${page.name} on ${collection.githubLabel}`}
                  >
                    <span>{collection.githubLabel}</span>
                    <span className={ui.arrow} aria-hidden="true">
                      →
                    </span>
                  </a>
                </>
              ) : (
                <a
                  className={`${ui.pill} ${ui.pillSmall}`}
                  href={page.repo}
                  aria-label={`${page.name} on ${collection.githubLabel}`}
                >
                  {collection.githubLabel}{' '}
                  <span className={ui.arrow} aria-hidden="true">
                    →
                  </span>
                </a>
              )}
            </div>

            <p className={styles.summary}>{page.summary}</p>

            <section aria-labelledby="does-heading">
              <h2 className={styles.h2} id="does-heading">
                What it does
              </h2>
              <ul className={styles.list}>
                {page.does.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="promises-heading">
              <h2 className={styles.h2} id="promises-heading">
                What it promises
              </h2>
              <ul className={styles.promises}>
                {page.promises.map(promise => (
                  <li key={promise.id}>
                    {promise.id ? (
                      <span className={styles.promiseId}>{promise.id}</span>
                    ) : null}
                    {promise.text}
                  </li>
                ))}
              </ul>
              {page.contractUrl ? (
                <a className={ui.under} href={page.contractUrl}>
                  <span>Read the full contract</span>
                  <span className={ui.arrow} aria-hidden="true">
                    →
                  </span>
                </a>
              ) : null}
            </section>

            {page.moveIn.length > 0 ? (
              <section aria-labelledby="move-heading">
                <h2 className={styles.h2} id="move-heading">
                  Move in from
                </h2>
                <ul className={styles.chips}>
                  {page.moveIn.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section aria-labelledby="run-heading">
              <h2 className={styles.h2} id="run-heading">
                Run it yourself
              </h2>
              <p className={styles.runLine}>{runOne.line}</p>
              <Terminal commands={installCommands(page)} />
              <p className={styles.altLine}>
                {runOne.altLine.before} <code>{runOne.altLine.command}</code>{' '}
                {runOne.altLine.after}
              </p>
            </section>

            <dl className={styles.facts}>
              <div>
                <dt>Runs on</dt>
                <dd>{page.runsOn}</dd>
              </div>
              {page.version ? (
                <div>
                  <dt>Version</dt>
                  <dd>{page.version}</dd>
                </div>
              ) : null}
              <div>
                <dt>Licence</dt>
                <dd>MIT, free</dd>
              </div>
            </dl>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
