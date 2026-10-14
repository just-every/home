import type { Metadata } from 'next';

import { ArticlePage } from '@/components/article/ArticlePage';
import { EndNote } from '@/components/article/EndNote';
import { essayMetadata, essays } from '@/components/article/essays';

import {
  AutoDriveAndMerges,
  DesignAndBuild,
  FirstHomepage,
  PromiseTraced,
  Shelf,
} from './figures';

export const metadata: Metadata = essayMetadata(essays.journey);

/** /journey: "We could have built this in 2025.", from JOURNEY-ESSAY.md. */
export default function Journey() {
  return (
    <ArticlePage
      essay={essays.journey}
      art={<FirstHomepage />}
      end={
        <EndNote
          next={essays.process}
          links={[
            { label: 'See all fourteen', href: '/#all' },
            { label: 'Every Code', href: 'https://github.com/just-every/code' },
            { label: '12ui', href: 'https://12ui.com' },
          ]}
        />
      }
    >
      <h2>The thirty-second app</h2>
      <p>
        We registered justevery.com on 22 May 2025. Eight days later it had its
        first homepage, and the question at the top of it was “What can you
        build in 30 seconds?” Underneath sat a line we still like: “Fair
        warning: We’re an MVP that will fail sometimes.” It was the most honest
        sentence on the page, and it turned out to be the important one.
      </p>
      <p>
        Agents could already make an app in thirty seconds. You typed an idea,
        waited, and something with buttons came back. What they couldn’t make
        was software you’d move your team onto: a tool you open every morning,
        trust with your customers’ data, and stop thinking about. The gap
        between those two things isn’t a feature list. It’s the thousand small
        decisions about what happens when the network drops, when two people
        edit the same thing, when someone restores last week’s backup. A free
        Notion built that way in 2025 would have looked like Notion for an
        afternoon and then let you down in all the places Notion doesn’t. That’s
        slop, and we’d have known it. So we didn’t build it.
      </p>
      <p>
        By December the homepage said something else entirely: “Push AI further,
        faster.”, with one button pointing at a coding agent. If the tools
        weren’t good enough to make the products, we’d work on the tools.
      </p>

      <h2>A detour through the agent</h2>
      <p>
        In August 2025 we forked OpenAI’s Codex CLI and started{' '}
        <a href="https://github.com/just-every/code">Every Code</a>. We wanted
        an agent that could do more of the job on its own, so we gave it a
        browser it could drive, teams of agents that could plan, code and solve
        together, themes, and Auto Drive. It now has more than 4,000 stars on
        GitHub, which for a fork of someone else’s project still surprises us.
      </p>
      <p>
        Auto Drive is easier to watch than to describe, so{' '}
        <a href="https://youtu.be/UOASHZPruQk">watch it (2:36)</a>. The idea is
        simple. You hand it a task you’ve already planned, and it keeps going
        until the task is done. Several agents try different routes and it keeps
        the best one, while another team of agents watches the progress as it
        goes. The video’s own advice is to grab some lunch or leave it
        overnight. That was the first time “come back to finished work” felt
        like a real way to work rather than a demo.
      </p>
      <p>
        The more important lesson came from something less exciting. A fork has
        to keep up with its parent, and Codex moves fast. Every Code has merged
        OpenAI’s changes more than a hundred times, and for six months straight
        agents did it on their own. You can see it in the history: most of the
        upstream merges since March landed between 7:01 and 7:05 in the morning,
        which is when a scheduled job runs, not when a person sits down with a
        coffee to resolve conflicts. Keeping a large, diverged codebase healthy
        is the boring, expensive part of software, and it’s the part everyone
        assumed would always need a human. Watching agents do it, week after
        week, was when we stopped asking whether agents could maintain real
        software and started asking what else was missing.
      </p>
      <AutoDriveAndMerges />

      <h2>The last gap was design</h2>
      <p>
        Every Code made shipping fast. It also showed us the next problem in our
        own work: everything we shipped looked the same. Agents reach for safe,
        generic defaults, the same centred hero, the same cards, the same
        gradient, because that’s the average of everything they’ve seen. You can
        make software correct with enough tests. You can’t test your way to
        software that looks like someone cared.
      </p>
      <p>
        So at the end of 2025 we started on <a href="https://12ui.com">12ui</a>.
        It searches more than 23,000 real designs, drafts directions from them,
        grows the one we pick into every screen, and turns the image into code.
        The order matters to us. We decide what a page should feel like by
        looking at real pixels and choosing, and only then does anyone write
        code. The image is the authority, and the code has to match it.
      </p>
      <p>
        Our homepages start as 12ui images now. So did this site: the picture
        below is the design we picked for justevery.com next to the first build
        of it. The rule we wrote for it was blunt. The built page has to match
        the picked image at desktop width and at phone width, and when the two
        disagree, the image wins. That sounds fussy until you notice what it
        removes: the slow drift where every small implementation choice nudges
        the page back toward the generic thing an agent would have made anyway.
      </p>
      <DesignAndBuild />

      <h2>Fourteen products we’re proud of</h2>
      <p>
        In September 2026 we started on the products themselves. By mid-October
        there were fourteen, from{' '}
        <a href="https://github.com/just-every/run-slate">
          a Notion alternative
        </a>{' '}
        to <a href="https://github.com/just-every/run-spool">a Sentry one</a>.
        Every one is public on GitHub, MIT licensed and 100% free.
      </p>
      <p>
        The difference from 2025 isn’t that agents type faster. It’s that every
        product now carries its standards with it. Each ships a contract, a
        plain file that says what it does and what it doesn’t, one numbered
        promise at a time. Each has one command that runs all of its checks.
        Each has instructions for the next agent that works on it, so the
        knowledge of how the product is meant to behave doesn’t live in anyone’s
        head. Coding agents wrote the code. We decided what good looks like, and
        wrote it down where the agents could hold us to it.
      </p>
      <p>
        It also means the standards travel. Because every product is MIT
        licensed and the contract, the checks and the agent instructions live in
        the repository next to the code, anyone can take one, change it for
        their own team, and hand it to their own agent with the same promises
        attached. Owning the software stops being a maintenance burden you sign
        up for and becomes something your agent can carry, the same way ours
        carries Every Code.
      </p>
      <p>
        Here’s what that looks like on an ordinary day. This week Pencil, our
        forms product, merged{' '}
        <a href="https://github.com/just-every/run-pencil/pull/9">
          pull request #9
        </a>
        , “Never restore sign-in authorization from a backup”. Before it,
        restoring an old backup could quietly bring old sign-ins back to life,
        including ones someone had signed out of since. After it, backups no
        longer carry sign-in authorization, and after a restore everyone signs
        in again. The commits were co-authored by Claude, and the checks ran in
        public and passed. That’s the kind of thing a thirty-second app never
        gets right, and it’s exactly the kind of thing we care about now.
      </p>
      <Shelf />

      <h2>What comes next</h2>
      <p>
        We’re not sure. We are sure of one thing. When code is almost free,
        anyone can ship software, and a lot of what gets shipped will be slop.
        What’s left to compete on is quality: how it works, how it looks, what
        it promises and whether it keeps that promise when nobody is watching.
      </p>
      <p>
        That last part is the one we think about most. A promise on a homepage
        is cheap. A promise you can trace is not. Uptime, our monitoring
        product, says on its card that it alerts you only when a failure is
        confirmed. Behind that sentence is a clause in its contract that says
        exactly what “confirmed” means, and behind the clause is a test that
        proves it. If the code ever stops keeping the promise, the check fails
        before anyone ships it. That chain, from a sentence a person reads to a
        check a machine runs, is what we think good software looks like when
        agents write it.
      </p>
      <PromiseTraced />
      <p>
        So that’s what we’re trying to perfect. Not more products for the sake
        of it, and not faster ones, but software you’d be glad to move your team
        onto, that you own, and that keeps its word.
      </p>
    </ArticlePage>
  );
}
