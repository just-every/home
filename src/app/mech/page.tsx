'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Database,
  GitBranch,
  Clock,
  Shield,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MechPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Back to Stack */}
        <Link
          href="/stack"
          className="mb-8 inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stack
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display mb-8 text-5xl font-bold md:text-6xl">
            MECH
          </h1>

          <p className="mb-12 text-2xl text-white/80">
            Metacognition Ensemble Chain-of-Thought Hierarchy
          </p>

          <p className="mb-12 text-lg text-white/60">
            Advanced LLM orchestration with meta-cognition capabilities.
            <br />
            <span className="text-brand-pink font-semibold">MECH</span> provides
            intelligent model rotation, self-reflection, and dynamic weighted
            selection based on performance across multiple AI providers.
          </p>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 space-y-6"
        >
          {/* Basic usage */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Simple MECH orchestration
            </h3>
            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <pre className="overflow-x-auto">
                <code className="font-mono text-sm">
                  {`import { runMECH } from "@just-every/mech";

// Run an agent with meta-cognition
const result = await runMECH({
  agent: { name: 'MyAgent' },
  task: 'Analyze this code for performance issues',
  runAgent: async (agent, input, history) => {
    // Your LLM call logic here
    const response = await callYourLLM(input, history);
    return { response };
  }
});

// MECH handles intelligent model rotation and self-reflection`}
                </code>
              </pre>
            </div>
          </div>

          {/* Advanced features */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Advanced orchestration features
            </h3>
            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <pre className="overflow-x-auto">
                <code className="font-mono text-sm">
                  {`// MECH provides intelligent features out of the box:

// 1. Ensemble Model Management
//    Multiple AI models work in parallel or sequence

// 2. Chain-of-Thought Reasoning
//    Maintains connected reasoning thread across interactions

// 3. Meta-Cognition
//    System periodically analyzes and adjusts its own performance

// 4. Dynamic Model Hierarchy
//    Weighted model selection based on historical performance

// 5. Automatic cost tracking and conversation history`}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="font-display mb-8 text-2xl font-bold">
            Core Capabilities
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <div className="mb-3 flex items-center gap-3">
                <GitBranch className="text-brand-pink h-5 w-5" />
                <h3 className="font-semibold">Intelligent Model Rotation</h3>
              </div>
              <p className="text-sm text-white/60">
                Automatic switching between AI providers based on performance.
              </p>
            </div>

            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <div className="mb-3 flex items-center gap-3">
                <Clock className="text-brand-amber h-5 w-5" />
                <h3 className="font-semibold">Periodic Self-Reflection</h3>
              </div>
              <p className="text-sm text-white/60">
                System analyzes and adjusts its own performance over time.
              </p>
            </div>

            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <div className="mb-3 flex items-center gap-3">
                <Database className="text-brand-cyan h-5 w-5" />
                <h3 className="font-semibold">Thought Management</h3>
              </div>
              <p className="text-sm text-white/60">
                Chain-of-thought reasoning with intelligent pacing.
              </p>
            </div>

            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <div className="mb-3 flex items-center gap-3">
                <Shield className="text-brand-pink h-5 w-5" />
                <h3 className="font-semibold">Multi-Provider Support</h3>
              </div>
              <p className="text-sm text-white/60">
                Works with OpenAI, Anthropic, and other LLM providers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Install */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-dark-100 border-dark-50 mb-12 rounded-lg border p-6"
        >
          <div className="flex items-center justify-between">
            <code className="text-brand-pink font-mono">
              npm i @just-every/mech
            </code>
            <a
              href="https://github.com/just-every/MECH"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              Read the spec <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="border-dark-50 flex items-center justify-between border-t pt-8">
          <Link
            href="/ensemble"
            className="text-white/60 transition-colors hover:text-white"
          >
            ← Ensemble
          </Link>
          <Link
            href="/magi"
            className="text-white/60 transition-colors hover:text-white"
          >
            Magi →
          </Link>
        </div>
      </div>
    </div>
  );
}
