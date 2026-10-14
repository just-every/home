import type { Metadata } from 'next';

import { ArticlePage } from '@/components/article/ArticlePage';
import { EndNote } from '@/components/article/EndNote';
import { essayMetadata, essays } from '@/components/article/essays';
import { Id } from '@/components/article/parts';

import {
  ClauseAndTest,
  ContractAndPullRequest,
  ForkLanes,
  PencilChecks,
  PromiseChanged,
} from './figures';

export const metadata: Metadata = essayMetadata(essays.process);

const lamp = 'https://github.com/just-every/run-lamp';

/** /process: "Quality, written down", from PROCESS-ESSAY.md. */
export default function Process() {
  return (
    <ArticlePage
      essay={essays.process}
      art={<ContractAndPullRequest />}
      end={
        <EndNote
          next={essays.journey}
          links={[
            { label: 'See all fourteen', href: '/#all' },
            { label: 'Every Code', href: 'https://github.com/just-every/code' },
          ]}
        />
      }
    >
      <p>
        Writing software has become the cheap part. An agent will build you a
        status page or a CRM in an afternoon, and it will look finished. The
        expensive part is the question that comes after: is it still right? Is
        it right after the next change, and the one after that, and after you
        have bent it to fit your business and we have shipped an update
        underneath you?
      </p>
      <p>
        For most of software’s history the answer lived in people. Someone
        reviewed the pull request, someone remembered why the cache works the
        way it does, someone knew which test mattered. That doesn’t scale to
        fourteen products built mostly by agents, and it certainly doesn’t scale
        to every owner who forks one. So we wrote the answer down.
      </p>

      <h2>A promise you can read</h2>
      <p>
        Every product we publish has a file called{' '}
        <a href={`${lamp}/blob/main/CONTRACT.md`}>CONTRACT.md</a> at the root of
        its repository. It is a list of promises in plain English. Each one has
        a stable ID and says one thing the product does, specifically enough
        that you could argue about whether it is true.
      </p>
      <p>
        Here is one from Lamp, our status page. <Id>PAGE-006</Id>, “Serving
        through a failure”: when the database, the queue or object storage is
        unreachable, the public page still loads from its last saved copy,
        labelled as the last known state, and “no failed read ever produces the
        all-clear.” That last part is the whole point of a status page. The
        worst thing it can do during an outage is say everything is fine because
        it couldn’t check.
      </p>
      <p>
        Across the fourteen products there are 1,088 of these promises today.
        Slate, our wiki, has 221. Spool has 10. They are not marketing. They are
        the thing we hold ourselves to, written so that a founder can read them
        over coffee and a coding agent can test them.
      </p>
      <p>
        That second reader is what changed. A sentence like <Id>PAGE-006</Id>{' '}
        used to be a nice intention sitting in a wiki. Now an agent can read it,
        find the code that serves the page, write a test that breaks the
        database on purpose, and report whether the sentence is still true. Our
        agents write the code and the tests in these repositories, working from
        the sentences. The contract has become a bridge between what we want, in
        words, and what the code actually does. It is a proxy we can finally
        rely on, because something tireless is checking it.
      </p>

      <h2>Every promise gets a test</h2>
      <p>
        The test carries the promise’s ID in its name. Lamp’s{' '}
        <a href={`${lamp}/blob/v1.4.0/tests/e2e/app-api.test.mjs#L496`}>
          <Id>PAGE-006</Id> test
        </a>{' '}
        starts the app, drops a table out of the running database, loads the
        public page, and checks two things: it still says “Partially
        unavailable”, and it never says “All systems operational”. Then it
        deletes the pointer to the saved snapshot as well, loads the page again,
        and checks that it still answers with “Last known state”. The test reads
        like the promise, because it was written from the promise.
      </p>
      <ClauseAndTest />
      <p>
        Lamp goes one step further. Its checks read the contract, list every
        promise, and fail if any of its 104 has no test. You cannot add a
        promise to Lamp and leave it unchecked; the build stops.
      </p>
      <p>
        The checks run in public. Open a pull request on Pencil, our forms
        product, and the full verification runs on GitHub where anyone can
        watch.{' '}
        <a href="https://github.com/just-every/run-pencil/pull/9">
          Pull request #9
        </a>{' '}
        changed what a backup carries: after a restore, everyone signs in again,
        rather than old sign-ins coming back to life. Its first run failed, 314
        tests passed and one did not. An older recovery test still expected a
        session from before the backup to return. That is the system doing its
        job: the new rule contradicted an old expectation, and the old
        expectation was written down where a machine could see it. The agent
        updated that test to check the new rule, refusing the pre-backup token,
        said exactly that in its commit message, and pushed again. 315 passed.
      </p>
      <PencilChecks />
      <p>
        This is what makes maintenance tractable. A reviewer, human or agent,
        doesn’t need to hold the whole product in their head to judge a change.
        They need to know which promises it touches and whether those still
        hold.
      </p>

      <h2>Promises change on purpose</h2>
      <p>
        Code can change all day. A promise changes only when someone decides it
        should, and writes down why. That asymmetry is the most useful thing
        about the arrangement: everyday work moves fast, and the rare change to
        what the product actually promises gets the slower, more deliberate
        attention it deserves.
      </p>
      <p>
        Lamp used to promise that a scheduled update goes out within 60 seconds
        of its time. Then we stress-tested it: twenty updates and twenty
        maintenance windows all due in the same minute, on a page with 200
        components and a thousand subscribers. The last update went out 238.5
        seconds late. We could have quietly called that an edge case. Instead{' '}
        <a href={`${lamp}/tree/v1.4.0`}>Lamp 1.4.0</a>, tagged today, promises
        240 seconds, and its release record keeps the old promise, the new one,
        and the measurement behind it, including the honest note that this was
        one run on one local machine. We would rather promise four minutes we
        have watched than sixty we haven’t.
      </p>
      <p>
        The record isn’t optional. Lamp’s release check compares every promise
        with its wording in the previous release. Change the meaning of a
        promise without a matching entry and it refuses, naming the clause: “
        <Id>INCIDENT-004</Id> changed meaning without a changed release entry.”
      </p>
      <PromiseChanged />
      <p>
        The same instinct runs down to the bytes. Each repository keeps a lock
        file listing every source file and its fingerprint; Lamp’s lists 1,158
        files. Change one byte anywhere and the check stops and names the file.
        We know it works because it caught us. On 13 October we added a banner
        picture to the READMEs of four products, and the checks failed on all
        four. Each got a follow-up change that recorded the new picture, and
        each passed. Nothing gets into a product by accident, not even a
        picture.
      </p>

      <h2>Forks can keep up now</h2>
      <p>
        All of this would be tidy bookkeeping if the only people changing these
        products were us. The reason it matters is forks.
      </p>
      <p>
        Every product here is MIT licensed, every file, and every repository is
        public. You can take one and change anything: the UI, the schema, the
        framework. The old objection to forking was never the first change. It
        was the hundredth upstream update you would now have to merge by hand,
        forever. A fork used to be a promise to fall behind.
      </p>
      <p>
        We don’t think that is true any more, and we have evidence, because we
        have been running a large fork for over a year.{' '}
        <a href="https://github.com/just-every/code">Every Code</a> is our fork
        of OpenAI’s Codex CLI. It carries about 5,000 commits of its own on top
        of OpenAI’s, touching nearly 2,400 files. From April to September 2026
        our agents merged 5,306 upstream commits into it, in 85 merges, keeping
        our changes intact while OpenAI’s kept arriving. It is also where we
        built Auto Drive, which takes a planned task and keeps going until it’s
        done; <a href="https://youtu.be/UOASHZPruQk">the two-minute video</a>{' '}
        shows it working.
      </p>
      <p>
        It began as a{' '}
        <a href="https://github.com/just-every/code/blob/main/.github/workflows/upstream-merge.yml">
          workflow
        </a>{' '}
        that woke every 30 minutes and asked Every Code itself to do the merge.
        The agent worked from a written list of what makes the fork ours: which
        parts of the tree to prefer our version of, and the features in core
        that must not regress. Read it now and it is plainly a contract, just an
        early and rougher one.
      </p>
      <ForkLanes />

      <h2>If you fork one</h2>
      <p>
        So here is how it works when the fork is yours. Change anything. If you
        change what the product promises, write down the new promise and why,
        the way Lamp does in its own{' '}
        <a href={`${lamp}/blob/main/DIVERGENCE.md`}>divergence record</a>. Our
        shared baseline says to rate-limit public endpoints. Lamp overrides that
        for its public page, in writing, because “a status page is read hardest
        at the moment it matters most.” Your agent treats your written promise
        exactly the way ours treat theirs.
      </p>
      <p>
        When we ship a release, it lists every promise it changed, old and new.
        Lamp 1.4.0 changed nine. Your agent reads that list next to yours and
        takes the update with one question from our agent guide: what did
        upstream intend, what does this installation intend, and what satisfies
        both? Sometimes the answer is a clean merge. Sometimes it is a rewrite
        of our change in the shape of yours. Either way, the check at the end is
        the same: both contracts, both sets of tests.
      </p>
      <p>
        That is the whole process. The code is the cheap part now, and it will
        keep getting cheaper. What’s worth keeping is a short list of sentences
        that says what the product is for, and a machine that won’t let anyone,
        us included, break one without saying so.
      </p>
    </ArticlePage>
  );
}
