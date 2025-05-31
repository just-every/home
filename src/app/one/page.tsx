'use client';

import Link from 'next/link';
import { Github as GitHubIcon, GitBranch, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OnePage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="font-display mb-8 text-5xl font-bold md:text-6xl">
            One repo. All the layers.
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl text-white/80">
            Everything you just saw—Ensemble, MECH, Magi, the JustEvery_ web
            client—is published under{' '}
            <span className="text-brand-cyan font-bold">MIT</span>.
          </p>
        </motion.div>

        {/* Core Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-display mb-8 text-2xl font-bold">
            We keep it simple:
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-brand-cyan text-2xl font-bold">1.</span>
              <p className="text-lg text-white/80">
                <span className="font-semibold">
                  Fork it, ship it, break it, improve it.
                </span>
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-brand-pink text-2xl font-bold">2.</span>
              <p className="text-lg text-white/80">
                If you build a commercial product, we <em>ask</em> (but do not
                legally require) you to donate{' '}
                <span className="text-brand-amber font-bold">
                  90% of net profit
                </span>{' '}
                to a future-positive project.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-brand-amber text-2xl font-bold">3.</span>
              <p className="text-lg text-white/80">
                We list every donor transparently at{' '}
                <Link
                  href="/future"
                  className="text-brand-cyan hover:text-brand-pink transition-colors"
                >
                  /future
                </Link>
                .
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-dark-100 border-dark-50 mb-16 rounded-lg border p-8"
        >
          <h2 className="font-display mb-6 text-2xl font-bold">Quick links</h2>

          <div className="space-y-4">
            <a
              href="https://github.com/just-every/ONE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="font-semibold">Mono-repo</span>
              <span className="text-white/40">→ github.com/JustEvery/ONE</span>
            </a>

            <a
              href="https://github.com/just-every/ONE/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
            >
              <Users className="h-5 w-5" />
              <span className="font-semibold">Contributing guide</span>
              <span className="text-white/40">→ CONTRIBUTING.md</span>
            </a>

            <a
              href="https://github.com/just-every/ONE/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
            >
              <GitBranch className="h-5 w-5" />
              <span className="font-semibold">Roadmap</span>
              <span className="text-white/40">→ GitHub Projects board</span>
            </a>
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 border-brand-pink/20 rounded-lg border bg-gradient-to-r p-8 text-center"
        >
          <p className="mb-4 text-xl">
            PRs welcome. Break reality responsibly.
          </p>
          <a
            href="https://github.com/just-every/ONE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan hover:text-brand-pink inline-flex items-center gap-2 transition-colors"
          >
            <GitHubIcon className="h-5 w-5" />
            View on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
}
