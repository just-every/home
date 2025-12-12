import { Terminal, ArrowRight, Github } from 'lucide-react';
import { WarpFieldCanvas } from '@/components/WarpFieldCanvas';
import { PrimaryCTA } from '@/components/PrimaryCTA';

const everyCodeHref = 'https://github.com/just-every/code';
const orgHref = 'https://github.com/just-every';
const docsHref = 'https://github.com/just-every/code/blob/main/docs/index.md';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <WarpFieldCanvas />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
            <Terminal className="h-3.5 w-3.5" />
            Every Code is live
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
            Push frontier AI further.
            <span className="from-brand-cyan via-brand-violet to-brand-pink mt-2 block bg-gradient-to-r bg-clip-text text-transparent">
              Ship faster.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-pretty text-white/80 sm:text-xl">
            We build professional tools that turn powerful models into reliable
            workflows — for software, design, management, and marketing.
          </p>
          <p className="mt-3 max-w-3xl text-base text-pretty text-white/60 sm:text-lg">
            Every Code is our flagship: a terminal-native coding agent focused
            on real developer ergonomics.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <PrimaryCTA
              href={everyCodeHref}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-white/90"
            >
              Install Every Code
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </PrimaryCTA>

            <a
              href={everyCodeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              See it on GitHub
              <Github className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-4 w-full max-w-md rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs text-white/80 sm:text-sm">
            <code>npx -y @just-every/code</code>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-white/60 sm:text-sm">
            <span>Auto Drive</span>
            <span className="text-white/30">·</span>
            <span>Auto Review</span>
            <span className="text-white/30">·</span>
            <span>Code Bridge</span>
            <span className="text-white/30">·</span>
            <span>Multi-agent</span>
            <span className="text-white/30">·</span>
            <span>Browser</span>
            <span className="text-white/30">·</span>
            <span>MCP</span>
            <span className="text-white/30">·</span>
            <span>Themes</span>
          </div>
        </div>
      </section>

      {/* Below-the-fold */}
      <section className="relative z-10 border-t border-white/5 bg-black/80 px-4 py-16 backdrop-blur">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="font-display text-lg font-semibold">Every Code</h2>
              <p className="mt-2 text-sm text-white/70">
                A fast local coding agent for your terminal — multi-agent
                orchestration, browser control, themes, MCP, and quality loops
                that run in parallel.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/70">
                <a
                  href={everyCodeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href={`${everyCodeHref}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Releases
                </a>
                <a
                  href={docsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Docs
                </a>
              </div>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="font-display text-lg font-semibold">
                Design <span className="text-white/40">(coming soon)</span>
              </h2>
              <p className="mt-2 text-sm text-white/70">
                AI-native design workflows that keep taste and consistency under
                control.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="font-display text-lg font-semibold">
                Manager <span className="text-white/40">(coming soon)</span>
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Operational command center for goal-driven execution (humans +
                agents).
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="font-display text-lg font-semibold">
                Marketing <span className="text-white/40">(coming soon)</span>
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Creative + distribution pipelines that iterate like engineering.
              </p>
            </article>
          </div>

          <div className="mt-12 grid gap-6 border-t border-white/5 pt-10 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-5">
              <h3 className="text-sm font-semibold text-white">
                Quality-first loops
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Verify, review, repair — automatically.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-5">
              <h3 className="text-sm font-semibold text-white">
                Operator control
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Approvals, safety modes, clear state.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-5">
              <h3 className="text-sm font-semibold text-white">
                Open by default
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Community-driven, fork-friendly.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-white/60 sm:justify-between sm:text-sm">
            <p>Open source. Built in public.</p>
            <div className="flex items-center gap-3">
              <a
                href={orgHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                GitHub
              </a>
              <span className="text-white/30">·</span>
              <a
                href="https://www.reddit.com/r/justevery"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Reddit
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
