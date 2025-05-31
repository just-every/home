'use client';

import Link from 'next/link';
import { ArrowRight, Code, Cpu, Box, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StackPage() {
  const stackItems = [
    {
      name: 'Ensemble',
      description:
        'Unified TypeScript interface for multiple LLM providers. AsyncGenerator API for streaming, tool calling, and cost tracking across Claude, OpenAI, Gemini, Deepseek, Grok, and OpenRouter.',
      icon: Code,
      href: '/ensemble',
      color: 'from-brand-cyan to-brand-pink',
      snippet: 'const stream = request("claude-3-5-sonnet", messages)',
      delay: 0,
    },
    {
      name: 'MECH',
      description:
        'Metacognition Ensemble Chain-of-Thought Hierarchy. Advanced LLM orchestration with intelligent model rotation, self-reflection, and dynamic weighted selection based on performance.',
      icon: Cpu,
      href: '/mech',
      color: 'from-brand-pink to-brand-amber',
      snippet: 'await runMECH({ agent, task, runAgent })',
      delay: 0.1,
    },
    {
      name: 'Magi',
      description:
        'Full orchestration system using Ensemble and MECH. Container management with Docker/Firecracker, React UI for monitoring. Mostly autonomous generative intelligence.',
      icon: Box,
      href: '/magi',
      color: 'from-brand-amber to-brand-cyan',
      snippet: 'magi.deploy("new-app", { autoScale: true })',
      delay: 0.2,
    },
    {
      name: 'JustEvery_',
      description:
        'The actual app that Magi drives. Social network for AI-generated apps. UI-first using image generators. Currently MVP but improving rapidly with each deployment.',
      icon: Sparkles,
      href: '/signup',
      color: 'from-brand-cyan via-brand-pink to-brand-amber',
      snippet: 'prompt → generated UI → live app',
      delay: 0.3,
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
            The Stack
          </h1>
          <p className="mx-auto max-w-3xl text-2xl text-white/80">
            Four layers working in harmony to turn your ideas into reality.
          </p>
        </motion.div>

        {/* Stack Items */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {stackItems.map(item => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
              >
                <Link href={item.href} className="group block">
                  <div className="bg-dark-100 border-dark-50 hover:border-brand-cyan/50 rounded-lg border p-8 transition-all duration-300">
                    <div className="mb-4 flex items-start gap-4">
                      <div
                        className={`h-12 w-12 rounded-full bg-gradient-to-r ${item.color} flex flex-shrink-0 items-center justify-center`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-display group-hover:text-brand-cyan mb-2 text-2xl font-bold transition-colors">
                          {item.name}
                        </h2>
                        <p className="mb-4 text-white/60">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <code className="font-mono text-sm text-white/40">
                            {item.snippet}
                          </code>
                          <ArrowRight className="group-hover:text-brand-cyan h-5 w-5 text-white/40 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="mb-8 text-lg text-white/60">
            Section order mirrors developer adoption funnel.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-white transition-all duration-300 hover:bg-white/10"
            >
              Read the Docs
            </Link>
            <Link
              href="/showcase"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-white transition-all duration-300 hover:bg-white/10"
            >
              See Examples
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
