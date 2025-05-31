'use client';

import Link from 'next/link';
import { Book, Code, Zap, AlertCircle, FileCode, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DocsPage() {
  const sections = [
    {
      title: 'Quickstart',
      icon: Zap,
      description: 'Get up and running in 5 minutes',
      href: '/docs/quickstart',
    },
    {
      title: 'API Reference',
      icon: Code,
      description: 'Complete API documentation',
      href: '/docs/api',
    },
    {
      title: 'CLI Usage',
      icon: Terminal,
      description: 'Command line interface guide',
      href: '/docs/cli',
    },
    {
      title: 'Authentication',
      icon: FileCode,
      description: 'Auth setup and configuration',
      href: '/docs/auth',
    },
    {
      title: 'Cost Tracking',
      icon: Book,
      description: 'Monitor and control usage costs',
      href: '/docs/costs',
    },
    {
      title: 'Error Handling',
      icon: AlertCircle,
      description: 'Debug and handle errors',
      href: '/docs/errors',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="font-display mb-6 text-5xl font-bold md:text-6xl">
            Documentation
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-white/80">
            Everything you need to build with JustEvery_ stack.
          </p>
        </motion.div>

        {/* Documentation Sections */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              >
                <Link href={section.href} className="group block">
                  <div className="bg-dark-100 border-dark-50 hover:border-brand-cyan/50 rounded-lg border p-6 transition-all duration-300">
                    <Icon className="text-brand-cyan mb-4 h-8 w-8" />
                    <h3 className="group-hover:text-brand-cyan mb-2 text-lg font-semibold transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {section.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 border-brand-pink/20 rounded-lg border bg-gradient-to-r p-8 text-center"
        >
          <p className="mb-4 text-lg">
            Each code block auto-switches between JS, TS, curl.
          </p>
          <p className="text-white/60">
            Documentation is auto-generated from source code using MDX.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
