'use client';

import Link from 'next/link';
import { Zap, Leaf, Heart, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FuturePage() {
  const impactAreas = [
    {
      title: 'Energy abundance',
      description: 'fusion, advanced solar, grid storage',
      icon: Zap,
      color: 'text-brand-cyan',
    },
    {
      title: 'Food autonomy',
      description: 'precision fermentation, vertical farming',
      icon: Leaf,
      color: 'text-brand-pink',
    },
    {
      title: 'Universal healthcare R&D',
      description: 'open medical research, accessible treatments',
      icon: Heart,
      color: 'text-brand-amber',
    },
    {
      title: 'Education access',
      description: 'open curricula, low-cost devices',
      icon: GraduationCap,
      color: 'text-brand-cyan',
    },
  ];

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
            The Future Fund
          </h1>

          <p className="mb-8 text-2xl text-white/80">
            Profit is a tool. Use it to delete scarcity.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <p className="mb-8 text-lg text-white/80">
            We believe software should wipe out involuntary suffering—hunger,
            lack of shelter, unearned illness.
          </p>

          <p className="mb-12 text-lg text-white/80">
            That&apos;s why{' '}
            <span className="text-brand-amber font-bold">
              90% of any commercial revenue
            </span>{' '}
            derived from the JustEvery_ stack is routed to projects that move
            the needle on:
          </p>
        </motion.div>

        {/* Impact Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 grid gap-6 md:grid-cols-2"
        >
          {impactAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="bg-dark-100 border-dark-50 rounded-lg border p-6"
              >
                <div className="flex items-start gap-4">
                  <Icon className={`h-6 w-6 ${area.color} mt-0.5`} />
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {index + 1}. {area.title}
                    </h3>
                    <p className="text-sm text-white/60">{area.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-display mb-8 text-2xl font-bold">How it works</h2>

          <div className="bg-dark-100 border-dark-50 overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead className="bg-dark-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Step</th>
                  <th className="px-6 py-4 text-left font-semibold">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-dark-50 border-t">
                  <td className="text-brand-cyan px-6 py-4 font-semibold">
                    1. You donate
                  </td>
                  <td className="px-6 py-4 text-white/60">
                    Directly to an approved non-profit or open-research org.
                  </td>
                </tr>
                <tr className="border-dark-50 border-t">
                  <td className="text-brand-pink px-6 py-4 font-semibold">
                    2. You file a PR
                  </td>
                  <td className="px-6 py-4 text-white/60">
                    Add your receipt hash to DONATIONS.md.
                  </td>
                </tr>
                <tr className="border-dark-50 border-t">
                  <td className="text-brand-amber px-6 py-4 font-semibold">
                    3. We verify & shout-out
                  </td>
                  <td className="px-6 py-4 text-white/60">
                    Your logo appears on this page and the docs sidebar.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 border-brand-pink/20 mb-12 rounded-lg border bg-gradient-to-r p-8 text-center"
        >
          <blockquote className="mb-2 text-lg italic">
            &quot;Abundance is not a dream—just a well-allocated budget away.&quot;
          </blockquote>
          <cite className="text-sm text-white/60">
            — 2040 Annual Report, we hope
          </cite>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/one"
            className="text-brand-cyan hover:text-brand-pink inline-flex items-center gap-2 transition-colors"
          >
            View the open source project <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
