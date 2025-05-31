'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers, Hammer, Play, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MagiPage() {
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
            Magi
          </h1>

          <p className="mb-12 text-2xl text-white/80">
            The autonomous engine room
          </p>

          <p className="mb-12 text-lg text-white/60">
            The full orchestration system that brings it all together. Magi
            reads your prompt, generates entire applications, deploys them in
            Docker/Firecracker containers, monitors performance through a React
            UI, and autonomously refactors based on usage patterns—all while you
            sleep.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-display mb-6 text-2xl font-bold">
            Mostly autonomous workflow
          </h2>
          <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
            <pre className="overflow-x-auto">
              <code className="font-mono text-sm">
                {`// 1. You describe what you want
magi.create({
  prompt: "SaaS dashboard for tracking carbon emissions",
  template: "web-app",
  autoEvolve: true  // Let Magi improve it autonomously
});

// 2. Magi orchestrates everything:
//    - Generates React components with Tailwind
//    - Sets up API routes and database schema
//    - Deploys in isolated containers (Docker/Firecracker)
//    - Monitors through React dashboard at localhost:3000
//    - Collects usage telemetry
//    - Refactors code based on real usage patterns

// 3. You just review and ship
magi.getMetrics(); // Performance, errors, user flows
magi.approve();    // Push to production`}
              </code>
            </pre>
          </div>
        </motion.div>

        {/* Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="font-display mb-8 text-2xl font-bold">
            Under the hood
          </h2>

          <div className="space-y-4">
            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <Layers className="text-brand-cyan mt-0.5 h-6 w-6" />
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold">Planner</h3>
                  <p className="text-white/60">
                    Breaks the prompt into tasks and agent roles
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <Hammer className="text-brand-pink mt-0.5 h-6 w-6" />
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold">Builder</h3>
                  <p className="text-white/60">
                    Generates full React + Tailwind applications with APIs
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <Play className="text-brand-amber mt-0.5 h-6 w-6" />
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold">Runner</h3>
                  <p className="text-white/60">
                    Deploys in Docker/Firecracker containers with isolation
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <Eye className="text-brand-cyan mt-0.5 h-6 w-6" />
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold">Watcher</h3>
                  <p className="text-white/60">
                    React monitoring UI + autonomous refactoring based on usage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 border-brand-pink/20 mb-12 rounded-lg border bg-gradient-to-r p-8"
        >
          <p className="mb-2 text-center text-lg italic">
            &quot;It&apos;s like Replit Ghostwriter, Vercel v0, and GitHub
            Copilot had a self-driving baby.&quot;
          </p>
          <p className="text-center text-sm text-white/60">
            Powered by Ensemble + MECH under the hood for intelligent model
            switching and persistent memory.
          </p>
        </motion.div>

        {/* Install */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-dark-100 border-dark-50 mb-12 rounded-lg border p-6"
        >
          <div className="flex items-center justify-between">
            <code className="text-brand-amber font-mono">
              npm i @just-every/magi
            </code>
            <Link
              href="/signup"
              className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              Join the private beta <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="border-dark-50 flex items-center justify-between border-t pt-8">
          <Link
            href="/mech"
            className="text-white/60 transition-colors hover:text-white"
          >
            ← MECH
          </Link>
          <Link
            href="/one"
            className="text-white/60 transition-colors hover:text-white"
          >
            Open Source →
          </Link>
        </div>
      </div>
    </div>
  );
}
