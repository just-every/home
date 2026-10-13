import { Fragment } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { reels, runOne } from '@/content/landing';

import { CopyButton } from './CopyButton';
import p from './page.module.css';
import { ArrowSweep } from './Scribbles';
import s from './run.module.css';

/** Lets long commands wrap after a slash rather than mid-word. */
function breakable(command: string) {
  const parts = command.split('/');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <>
          /<wbr />
        </>
      )}
    </Fragment>
  ));
}

/** The repository the snippet clones, read from its own command. */
const repoUrl = runOne.commands
  .map(command => command.match(/https:\/\/github\.com\/\S+/)?.[0])
  .find(Boolean);

export function RunOne() {
  return (
    <section className={s.run} aria-labelledby="run-title">
      <h2 id="run-title" className={s.title}>
        {runOne.heading}
      </h2>
      <p className={s.lede}>{runOne.line}</p>
      <div className={s.noteWrap} aria-hidden="true">
        <ArrowSweep className={s.arrow} />
        <p className={`${p.note} ${s.note}`}>The three lines.</p>
      </div>

      <div className={s.panel}>
        <div className={s.tabs}>
          <span className={s.tab}>Using npm</span>
          {repoUrl && (
            <a href={repoUrl} className={s.repo}>
              {reels.githubLabel}
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
            </a>
          )}
        </div>
        <div className={s.code}>
          <ol className={s.lines}>
            {runOne.commands.map(command => (
              <li key={command}>
                <code>{breakable(command)}</code>
              </li>
            ))}
          </ol>
          <CopyButton text={runOne.commands.join('\n')} className={s.copy} />
        </div>
      </div>

      <p className={s.after}>{runOne.afterLine}</p>
      <p className={s.alt}>
        {runOne.altLine.before} <code>{breakable(runOne.altLine.command)}</code>{' '}
        {runOne.altLine.after}
      </p>
    </section>
  );
}
