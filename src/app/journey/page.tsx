import type { Metadata } from 'next';

import { ArticlePage } from '@/components/article/ArticlePage';
import { EndNote } from '@/components/article/EndNote';
import { essayMetadata, essays } from '@/components/article/essays';
import { seeds } from '@/data/seeds';
import { numberWord } from '@/lib/number-word';

import { AutoDrive, FirstHomepage, Shelf } from './figures';

export const metadata: Metadata = essayMetadata(essays.journey);

/** /journey: "The long way round", from JOURNEY-ESSAY-v2.md. */
export default function Journey() {
  return (
    <ArticlePage
      essay={essays.journey}
      art={<FirstHomepage />}
      end={
        <EndNote
          next={essays.process}
          links={[
            { label: `See all ${numberWord(seeds.length)}`, href: '/#all' },
            { label: 'Every Code', href: 'https://github.com/just-every/code' },
            { label: '12ui', href: 'https://12ui.com' },
          ]}
        />
      }
    >
      <p>
        In May 2025 we put up our first homepage. It asked, “What can you build
        in 30 seconds?” Under the headline, in smaller type, we added: “Fair
        warning: We’re an MVP that will fail sometimes.”
      </p>
      <p>That sentence has aged better than the headline.</p>
      <p>
        Agents could already make an app in thirty seconds. You typed an idea,
        waited, and something with buttons came back. It looked like software.
        What they couldn’t yet make, as far as we could tell, was software you’d
        move your team onto: the tool you open every morning, trust with your
        customers’ data, and then stop thinking about.
      </p>
      <p>
        We think the distance between those two things is less a feature list
        than a thousand quiet decisions about what happens when the network
        drops, when two people edit the same page, when someone restores last
        week’s backup. A free Notion built that way in 2025 would, we suspect,
        have looked like Notion for an afternoon, then let you down in the
        places Notion doesn’t.
      </p>
      <p>
        We could have shipped one anyway. We’d have known it wasn’t good enough,
        so we didn’t.
      </p>

      <h2>Fixing the tools first</h2>
      <p>
        If the tools weren’t good enough, we figured we’d work on the tools
        first. In August 2025 we forked OpenAI’s Codex CLI and started{' '}
        <a href="https://github.com/just-every/code">Every Code</a>, a coding
        agent that could drive a browser, work in teams and, with a feature we
        called Auto Drive, take a task you’d already planned and keep going
        until it was done.
      </p>
      <AutoDrive />
      <p>
        Auto Drive was the exciting part. The lesson that stayed with us came
        from the boring part.
      </p>
      <p>
        A fork has to keep up with its parent, and Codex moves fast. OpenAI’s
        changes keep coming, and each batch has to be folded into a codebase
        that has drifted further from the original. It’s the slow, expensive,
        unglamorous side of software, and we’d assumed it would always need a
        person.
      </p>
      <p>
        For six months, it didn’t. Agents kept Every Code in step with Codex on
        their own. You can see it in the history: most of those merges landed a
        few minutes after seven in the morning, which is when a scheduled job
        runs, not when someone sits down with a coffee to untangle conflicts.
      </p>
      <p>
        That changed our question. It was no longer whether agents could start a
        piece of software, but whether they could look after one. For that job,
        it seemed they could. So what else was missing?
      </p>

      <h2>The part that all looked the same</h2>
      <p>
        The answer was in our own work. Agents made shipping fast, but
        everything we shipped looked the same: the same centred hero, the same
        cards, the same gradient. Agents seem to reach for safe defaults,
        perhaps because the average of everything they’ve seen is safe. We could
        test our way to software that worked. We couldn’t test our way to
        software that looked like someone cared.
      </p>
      <p>
        So at the end of 2025 we started <a href="https://12ui.com">12ui</a>,
        which puts design first. It searches real designs, drafts directions
        from them and grows the one we pick into every screen. We decide what a
        page should feel like by looking at real pixels and choosing. Only then
        does anyone write code, and the code has to match the picture. This site
        started that way too.
      </p>

      <h2>Fourteen products</h2>
      <p>
        In September 2026 we finally started on the products. By mid-October
        there were fourteen, from{' '}
        <a href="https://github.com/just-every/run-slate">Slate</a>, our Notion
        alternative, to{' '}
        <a href="https://github.com/just-every/run-spool">Spool</a>, our Sentry
        one. Every one is public on GitHub, MIT licensed and 100% free.
      </p>
      <Shelf />
      <p>
        What changed since 2025 isn’t only that agents type faster. We think the
        bigger change is that every product now carries its standards with it.
        Each has a contract, a plain file that says what it does and what it
        doesn’t. Each has one command that runs all of its checks. Each has
        instructions for the next agent that works on it. Coding agents wrote
        the code. We tried to say what good looks like, and wrote it down where
        the agents could hold us to it.
      </p>
      <p>Remember the backup?</p>
      <p>
        A recent change to Pencil, our forms product, was titled “
        <a href="https://github.com/just-every/run-pencil/pull/9">
          Never restore sign-in authorization from a backup
        </a>
        .” Before it, restoring an old backup could quietly bring back a sign-in
        that someone had since signed out of. After it, a sign-out made after
        the backup stays in force, and everyone signs in again. Claude co-wrote
        the fix, and its checks ran in public and passed.
      </p>
      <p>
        Nobody puts that on a homepage, so we’re putting it here. It’s the sort
        of detail a thirty-second app tends to miss, and you only notice it when
        it goes wrong.
      </p>

      <h2>What’s left</h2>
      <p>What comes next? We’re not sure.</p>
      <p>
        Here is what we think. When code is almost free, anyone can ship
        software, and we expect a lot of it will be slop. That leaves quality:
        how it works, how it looks, what it promises, and whether it keeps that
        promise when nobody is watching.
      </p>
      <p>
        That’s what we’re trying to get right, and we’re not there yet. Not more
        products for the sake of it, and not faster ones. Software you’d be glad
        to move your team onto, that you own outright, and that keeps its word.
      </p>
      <p>
        The thirty-second app was the easy part. This is the part we’re still
        working on.
      </p>
    </ArticlePage>
  );
}
