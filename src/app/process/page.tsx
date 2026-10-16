import type { Metadata } from 'next';

import { ArticlePage } from '@/components/article/ArticlePage';
import { EndNote } from '@/components/article/EndNote';
import { essayMetadata, essays } from '@/components/article/essays';
import { seeds } from '@/data/seeds';
import { numberWord } from '@/lib/number-word';

import { AutoDrive, PromiseAndTest, PromiseChanged } from './figures';

export const metadata: Metadata = essayMetadata(essays.process);

const lamp = 'https://github.com/just-every/run-lamp/blob/v1.4.0';

/** /process: "Quality, written down", from PROCESS-ESSAY-v2.md. */
export default function Process() {
  return (
    <ArticlePage
      essay={essays.process}
      end={
        <EndNote
          next={essays.journey}
          links={[
            { label: `See all ${numberWord(seeds.length)}`, href: '/#all' },
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
        down. Customers can’t sign in, and the first thing they do is open your
        status page.
      </p>
      <p>It says: All systems operational.</p>
      <p>
        Nobody lied. The page tried to read the state of your systems, couldn’t,
        and fell back on the friendliest thing it knew how to say. Nobody writes
        that bug on purpose, and nobody notices it until the one moment it
        matters.
      </p>
      <p>
        We think about that page a lot, because it holds the question now at the
        centre of building software. An agent will build you a status page in an
        afternoon, and it will look finished. Writing the code has become the
        cheap part. The expensive part is what comes after. Is it still right?
        Is it right after the next change, and the one after that, after you’ve
        bent it to fit your business and we’ve shipped an update underneath you?
      </p>
      <p>
        For most of software’s history, that answer lived in people. Someone
        reviewed the change. Someone remembered why the fallback works the way
        it does. That never scaled well, and it doesn’t scale at all to products
        built mostly by agents and forked by anyone who wants one.
      </p>
      <p>So we wrote the answer down.</p>

      <h2>A sentence an agent can check</h2>
      <p>
        Every product we publish has a file called{' '}
        <a href={`${lamp}/CONTRACT.md`}>CONTRACT.md</a> at the root of its
        repository. It’s a list of promises in plain English, each one specific
        enough to argue about. Across our {numberWord(seeds.length)} products
        there are more than a thousand of them.
      </p>
      <p>
        Lamp is our status page, and one of its promises is about exactly that
        outage. When the database or storage can’t be reached, the public page
        still loads from its last saved copy, labelled as the last known state,
        and “no failed read ever produces the all-clear.”
      </p>
      <p>
        A sentence like that used to be a good intention in a wiki. What changed
        is who reads it. Our agents write the code and the tests in these
        repositories, and they work from the sentences. So the promise became a
        test, and the test does the unkind thing on purpose. It starts Lamp,
        pulls a table out from under the running database, loads the public
        page, and checks that the words “All systems operational” appear nowhere
        on it. Then it takes away the pointer to the saved copy as well, and
        checks again.
      </p>
      <PromiseAndTest />
      <p>
        Lamp takes it one step further. Its build reads the contract, lists
        every promise, and stops if any of them has no test. You can’t add a
        promise to Lamp and leave it unchecked.
      </p>
      <p>
        This is the part we find quietly remarkable. The contract is a bridge
        between what we want, in words, and what the code actually does, and for
        the first time something walks across that bridge on every change. A
        reviewer, human or agent, no longer needs the whole product in their
        head. They need to know which promises a change touches, and whether
        those still hold.
      </p>

      <h2>Promises change on purpose</h2>
      <p>
        Code can change all day. A promise changes only when someone decides it
        should, and writes down why.
      </p>
      <p>
        Lamp used to promise that a scheduled update goes out within 60 seconds
        of its time. Then we stress-tested it, with forty scheduled updates and
        maintenance windows falling due in the same minute on a busy page. The
        last one went out 238.5 seconds late.
      </p>
      <p>
        We could have called that an edge case and moved on. Instead,{' '}
        <a href="https://github.com/just-every/run-lamp/tree/v1.4.0">
          Lamp 1.4.0
        </a>{' '}
        promises 240 seconds. Its release record keeps the old promise, the new
        one and the measurement behind it, including the plain admission that
        this was one run on one machine. And Lamp’s release check refuses any
        changed promise that arrives without a record like that.
      </p>
      <p>
        We would rather promise four minutes we’ve watched than sixty we
        haven’t.
      </p>
      <PromiseChanged />

      <h2>Forks used to fall behind</h2>
      <p>
        All of this would be tidy bookkeeping if we were the only ones changing
        these products. The reason it matters is forks.
      </p>
      <p>
        Every product here is MIT licensed and public. Take one and change
        anything: the screens, the schema, the framework. The old objection to
        forking was never the first change. It was the hundredth update from
        upstream that you’d have to merge by hand, forever. A fork was a promise
        to fall behind.
      </p>
      <p>
        We stopped believing that because we’ve lived the other side of it. For
        more than a year we’ve run{' '}
        <a href="https://github.com/just-every/code">Every Code</a>, our fork of
        OpenAI’s Codex CLI, with thousands of commits of our own on top. Between
        April and September 2026, our agents merged 5,306 of OpenAI’s commits
        into it, in 85 merges. It’s also where we built Auto Drive, which takes
        a task you’ve planned and keeps going until it’s done.
      </p>
      <AutoDrive />
      <p>
        Those merges began as a workflow that woke every half hour and asked
        Every Code to merge its own parent. The agent worked from a written list
        of what made the fork ours: which parts to keep, and which features must
        never regress. Read it today and it’s plainly a contract, just an early
        and rougher one. It’s where this whole way of working started.
      </p>

      <h2>If the fork is yours</h2>
      <p>
        So here is how it works when you take one of ours. Change anything. If
        you change what the product promises, write down the new promise and
        why.
      </p>
      <p>
        Lamp does this itself. Our shared baseline says to rate-limit public
        endpoints, and Lamp{' '}
        <a href={`${lamp}/DIVERGENCE.md`}>overrides that in writing</a> for its
        public page, because a status page is read hardest during the very
        outage it exists to report. Your agent treats your written promise
        exactly the way ours treat theirs.
      </p>
      <p>
        When an update arrives, Lamp’s release lists every promise it changed,
        old wording beside new. Your agent reads that list next to yours and
        asks one question from{' '}
        <a href={`${lamp}/AGENTS.md#L123`}>our agent guide</a>: what did
        upstream intend, what does this installation intend, and what satisfies
        both? Sometimes the answer is a clean merge. Sometimes it’s our change,
        rewritten in the shape of yours. Either way the check at the end is the
        same: both contracts, both sets of tests.
      </p>
      <p>
        The code is the cheap part now, and it will keep getting cheaper. What’s
        worth keeping is a short list of sentences that says what a product is
        for, and a machine that won’t let anyone, us included, break one without
        saying so.
      </p>
      <p>
        That’s the difference, in the worst ten minutes of your quarter, between
        a page that says everything is fine and a page that tells the truth.
      </p>
    </ArticlePage>
  );
}
