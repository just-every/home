import type { Metadata } from 'next';

import { ArticlePage } from '@/components/article/ArticlePage';
import { EndNote } from '@/components/article/EndNote';
import { essayMetadata, essays } from '@/components/article/essays';
import { seeds } from '@/data/seeds';
import { numberWord } from '@/lib/number-word';

import { AutoDrive, FirstHomepage, Front, Morning, Shelf } from './figures';

export const metadata: Metadata = essayMetadata(essays.journey);

/**
 * /journey: "The long way round", from JOURNEY-ESSAY-v2.md, rewritten on
 * 17 Oct 2026 for readers outside AI tooling: plainer words, shorter
 * paragraphs and two painted figures (the quick front, the seven o'clock
 * table). Every fact is the v2 essay's or its v1 source's.
 */
export default function Journey() {
  return (
    <ArticlePage
      essay={essays.journey}
      art={<FirstHomepage />}
      end={
        <EndNote
          next={essays.process}
          links={[
            { label: `See all ${numberWord(seeds.length)}`, href: '/products' },
            { label: 'Every Code', href: 'https://github.com/just-every/code' },
            { label: '12ui', href: 'https://12ui.com' },
          ]}
        />
      }
    >
      <p>
        In May 2025 we put up our first homepage. Across the top, in big type,
        it asked: “What can you build in 30 seconds?”
      </p>
      <p>
        Underneath, in much smaller type, we added: “Fair warning: We’re an MVP
        that will fail sometimes.” In other words, a rough first version that
        would break now and then.
      </p>
      <p>The small line has aged better than the big one.</p>
      <p>
        AI could already make you an app in thirty seconds back then. You typed
        an idea, waited a moment, and something with buttons came back. It
        looked like software.
      </p>
      <p>
        What it couldn’t make, as far as we could tell, was software you’d move
        your team onto. The tool you open every morning, trust with your
        customers’ data, and then stop thinking about.
      </p>
      <p>
        We think the distance between those two things is less a list of
        features than a thousand quiet decisions. What happens when the internet
        drops? When two people edit the same page at once? When someone restores
        last week’s backup?
      </p>
      <p>
        A free Notion made that quickly in 2025 would, we suspect, have looked
        like Notion for an afternoon. Then it would have let you down in all the
        places Notion doesn’t.
      </p>
      <p>
        We could have shipped one anyway. We’d have known it wasn’t good enough,
        so we didn’t. We took the long way round.
      </p>
      <Front />

      <h2>First, better tools</h2>
      <p>If the tools weren’t good enough, we’d start with the tools.</p>
      <p>
        In August 2025 we took Codex, OpenAI’s open-source coding agent (an AI
        that writes and changes code for you), and started our own version of
        it: <a href="https://github.com/just-every/code">Every Code</a>.
        Programmers call that a fork. We gave ours a web browser it could drive,
        teams of agents that work together and, with a feature we called Auto
        Drive, the stamina to take a task you’d already planned and keep going
        until it was done.
      </p>
      <p>
        By December our homepage didn’t mention thirty seconds at all. It said
        “Push AI further, faster,” with a single button pointing to Every Code.
      </p>
      <AutoDrive />
      <p>
        Auto Drive was the exciting part. The lesson that stuck came from the
        boring part.
      </p>

      <h2>The boring part</h2>
      <p>
        A fork has to keep up with the original, and Codex moves fast. OpenAI’s
        changes keep coming, and each batch has to be folded into a copy that
        has drifted a little further from theirs. It’s slow, fiddly, expensive
        work, the unglamorous side of software, and we’d assumed it would always
        need a person.
      </p>
      <p>
        For six months, it didn’t. AI agents kept Every Code in step with Codex
        on their own.
      </p>
      <p>
        You can see it in the history. Most of those updates landed a few
        minutes after seven in the morning. That’s when a scheduled job runs,
        not when someone sits down with a coffee to untangle the changes by
        hand.
      </p>
      <Morning />
      <p>
        That changed our question. It was no longer whether AI could start a
        piece of software, but whether it could look after one. For this job, at
        least, it seemed it could.
      </p>
      <p>So what else was missing?</p>

      <h2>Everything looked the same</h2>
      <p>
        The answer was in our own work. AI made shipping fast, but everything we
        shipped looked the same: the same big centred headline, the same row of
        cards, the same soft gradient. AI seems to reach for safe defaults,
        perhaps because the average of everything it has seen is safe.
      </p>
      <p>
        We could test our way to software that worked. We couldn’t test our way
        to software that looked like someone cared.
      </p>
      <p>
        So at the end of 2025 we started <a href="https://12ui.com">12ui</a>,
        which puts design first. It searches real designs, drafts a few
        directions from them, and grows the one we pick into every screen. We
        decide how a page should feel by looking at real pictures and choosing
        one. Only then does anyone write code, and the code has to match the
        picture. This site started that way too.
      </p>

      <h2>Fourteen products</h2>
      <p>
        In September 2026 we finally started on the products themselves. By
        mid-October there were fourteen:{' '}
        <a href="https://github.com/just-every/run-slate">Slate</a> in place of
        Notion, <a href="https://github.com/just-every/run-dial">Dial</a> in
        place of Calendly,{' '}
        <a href="https://github.com/just-every/run-pencil">Pencil</a> in place
        of Typeform, and eleven more. Every one is 100% free, public on GitHub
        and MIT licensed, so you can use it, change it and keep it.
      </p>
      <Shelf />
      <p>
        What changed since 2025 isn’t only that AI types faster. The bigger
        change, we think, is that every product now carries its standards with
        it.
      </p>
      <p>
        Each has a plain file that says what it does, and what it doesn’t. Each
        has one command that runs all of its checks. Each has notes for the next
        AI that works on it.
      </p>
      <p>
        Coding agents wrote the code. We tried to say what good looks like, and
        wrote it down where the agents could hold us to it.
      </p>
      <p>Remember the backup from the beginning?</p>
      <p>
        A recent change to Pencil was titled “
        <a href="https://github.com/just-every/run-pencil/pull/9">
          Never restore sign-in authorization from a backup
        </a>
        .” Here’s the problem it fixed. Someone signs out. Later, you restore a
        backup taken before they did. Until this change, that old backup could
        quietly bring their sign-in back to life.
      </p>
      <p>
        Now a sign-out made after the backup stays in force, and everyone simply
        signs in again. Claude, Anthropic’s AI, co-wrote the fix, and its checks
        ran in public and passed.
      </p>
      <p>
        Nobody puts that on a homepage, so we’re putting it here. It’s the sort
        of detail a thirty-second app tends to miss, and you only notice it when
        it goes wrong.
      </p>

      <h2>What’s left</h2>
      <p>What comes next? Honestly, we’re not sure.</p>
      <p>
        Here’s what we think. When code is almost free, anyone can ship
        software, and we expect a lot of it will be slop. What’s left is
        quality: how it works, how it looks, what it promises, and whether it
        keeps that promise when nobody is watching.
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
