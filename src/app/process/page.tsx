import type { Metadata } from 'next';

import { ArticlePage } from '@/components/article/ArticlePage';
import { EndNote } from '@/components/article/EndNote';
import { essayMetadata, essays } from '@/components/article/essays';
import { seeds } from '@/data/seeds';
import { numberWord } from '@/lib/number-word';

import { ForkedStream, LampInTheRain, PromiseChanged } from './figures';

export const metadata: Metadata = essayMetadata(essays.process);

const lamp = 'https://github.com/just-every/run-lamp/blob/v1.4.0';

/**
 * /process: "Quality, written down", from PROCESS-ESSAY-v2.md, retold for a
 * reader outside AI tooling (17 Oct 2026): the same facts, plainer words, and
 * two painted figures where the story turns.
 */
export default function Process() {
  return (
    <ArticlePage
      essay={essays.process}
      end={
        <EndNote
          next={essays.journey}
          links={[
            { label: `See all ${numberWord(seeds.length)}`, href: '/products' },
            {
              label: 'Lamp on GitHub',
              href: 'https://github.com/just-every/run-lamp',
            },
            { label: 'Every Code', href: 'https://github.com/just-every/code' },
          ]}
        />
      }
    >
      <p>
        Picture the worst ten minutes of your quarter. Your database has gone
        down. Customers can’t sign in, so they do what customers do: they open
        your status page.
      </p>
      <p>It says: All systems operational.</p>
      <p>
        Nobody lied, exactly. The page tried to check on your systems, couldn’t
        reach them, and fell back on the friendliest thing it knew how to say.
        Nobody writes that bug on purpose, and nobody notices it until the
        moment it matters.
      </p>
      <p>
        That page is a good picture of where software is now. An AI agent will
        build you a status page in an afternoon, and it will look finished.
        Writing the code has become the cheap part. The hard part is everything
        after. Is it still right after the next change? After you’ve bent it to
        fit your business, and we’ve shipped an update underneath you?
      </p>
      <p>
        That answer used to live in people’s heads. Someone reviewed each
        change; someone remembered why the fallback works the way it does. It
        never scaled well, and it doesn’t scale at all once agents write most of
        the code and anyone can take a copy and make it their own.
      </p>
      <p>So we wrote the answer down.</p>

      <h2>Promises in plain English</h2>
      <p>
        Every product we publish comes with a list of promises, in a file called{' '}
        <a href={`${lamp}/CONTRACT.md`}>CONTRACT.md</a>. Each one is a plain
        sentence about what the product must do, specific enough to argue about.
        Across our {numberWord(seeds.length)} products there are more than a
        thousand of them.
      </p>
      <p>
        Lamp is our status page, and one of its promises covers exactly those
        ten minutes. If the database or storage can’t be reached, the public
        page still loads from its last saved copy, labelled as the last known
        state, and “no failed read ever produces the all-clear.”
      </p>
      <LampInTheRain />
      <p>
        A sentence like that used to be a good intention on a wiki page. What
        changed is who reads it. Agents write the code and the tests for our
        products, and they work from these sentences. So the promise became{' '}
        <a href={`${lamp}/tests/e2e/app-api.test.mjs#L496-L512`}>a test</a>, and
        the test is unkind on purpose. It starts Lamp, pulls a table out from
        under its running database, opens the public page, and checks that “All
        systems operational” appears nowhere on it. Then it takes away the
        page’s way to find its saved copy, and checks again.
      </p>
      <p>
        Lamp goes one step further. Every time it builds, it reads its own list
        of promises and stops if any of them has no test. You can’t add a
        promise to Lamp and leave it unchecked.
      </p>
      <p>
        That’s the quietly remarkable part. Whoever reviews a change, person or
        agent, no longer needs the whole product in their head, just the
        promises it touches and whether they still hold.
      </p>

      <h2>Promises change on purpose</h2>
      <p>
        Code can change all day. A promise changes only when someone decides it
        should, and writes down why.
      </p>
      <p>
        Lamp used to promise that a scheduled update goes live within 60 seconds
        of its time. Then we stress-tested it: forty scheduled updates and
        maintenance windows, all due in the same minute, on a busy page. The
        last one went live 238.5 seconds late.
      </p>
      <p>
        We could have called that an edge case and moved on. Instead,{' '}
        <a href="https://github.com/just-every/run-lamp/tree/v1.4.0">
          Lamp 1.4.0
        </a>{' '}
        promises 240 seconds. Its release record keeps the old promise, the new
        one and the measurement behind it, including the plain admission that
        this was one run on one machine. And Lamp’s release check turns away any
        changed promise that arrives without a record like that.
      </p>
      <PromiseChanged />
      <p>
        We would rather promise four minutes we’ve watched than sixty we
        haven’t.
      </p>

      <h2>Forks used to fall behind</h2>
      <p>
        This would be tidy bookkeeping if only we changed these products. It
        matters because of forks.
      </p>
      <p>
        Every product here is open source under the MIT licence, so you can take
        one and make it yours: the screens, the way it stores data, even the
        framework underneath. Your copy is a fork; the original is upstream. The
        trouble with forks was never the first change. It was the hundredth
        update from upstream, merged in by hand, forever. A fork was a promise
        to fall behind.
      </p>
      <p>
        We stopped believing that because we’ve lived the other side of it. For
        more than a year we’ve run{' '}
        <a href="https://github.com/just-every/code">Every Code</a>, our fork of
        OpenAI’s Codex CLI (a coding agent that works in your terminal), with
        thousands of changes of our own on top. Between April and September
        2026, our agents merged 5,306 of OpenAI’s changes into it, in 85 merges.
      </p>
      <ForkedStream />
      <p>
        It began as a job that woke every half hour and asked Every Code to
        merge in OpenAI’s latest work. The agent worked from a written list of
        what made the fork ours: which parts to keep, and which features must
        never break. Read it today and it’s plainly a list of promises, just an
        early, rougher one. It’s where this whole way of working started.
      </p>

      <h2>If the fork is yours</h2>
      <p>
        So here’s how it works when you take one of ours. Change anything. If
        you change what the product promises, write down the new promise, and
        why.
      </p>
      <p>
        Lamp does this itself. Our shared rules say to put a speed limit on
        anything public. Lamp{' '}
        <a href={`${lamp}/DIVERGENCE.md`}>overrides that in writing</a> for its
        public page, because a status page is read hardest during the very
        outage it exists to report. Your agent treats your written promises
        exactly the way ours treat theirs.
      </p>
      <p>
        When an update arrives, Lamp’s release lists every promise it changed,
        old wording beside new. Your agent reads that list beside yours and asks
        one question from <a href={`${lamp}/AGENTS.md#L123`}>our agent guide</a>
        : what did upstream intend, what does this installation intend, and what
        satisfies both? Sometimes the answer is a clean merge. Sometimes it’s
        our change, rewritten to fit yours. Either way, the check at the end is
        the same: both lists of promises, both sets of tests.
      </p>
      <p>
        Code is the cheap part now, and it keeps getting cheaper. What’s worth
        keeping is a short list of sentences that says what a product is for,
        and a machine that won’t let anyone, us included, break one without
        saying so.
      </p>
      <p>
        In the worst ten minutes of your quarter, that’s the difference between
        a page that says everything is fine and a page that tells the truth.
      </p>
    </ArticlePage>
  );
}
