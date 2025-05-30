'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EnsemblePage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-4xl px-4">
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
            Ensemble
          </h1>

          <p className="mb-12 text-2xl text-white/80">
            Unified interface for multiple LLM providers
          </p>

          <p className="mb-12 text-lg text-white/60">
            A TypeScript library that simplifies and standardizes AI model
            interactions across multiple providers.
            <br />
            With <span className="text-brand-cyan font-semibold">
              Ensemble
            </span>{' '}
            you get streaming responses, tool calling, and cost tracking—all in
            one unified API.
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
              Streaming responses with AsyncGenerator API
            </h3>
            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <pre className="overflow-x-auto">
                <code className="font-mono text-sm">
                  {`import { request } from "@just-every/ensemble";

// Stream responses from any provider
const stream = request('claude-3-5-sonnet-20241022', [
  { type: 'message', role: 'user', content: 'Hello, world!' }
]);

for await (const event of stream) {
  // Process streaming events
  console.log(event);
}`}
                </code>
              </pre>
            </div>
          </div>

          {/* Multiple providers */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Multi-provider support
            </h3>
            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <pre className="overflow-x-auto">
                <code className="font-mono text-sm">
                  {`// Supports all major providers with the same API
const providers = [
  'claude-3-5-sonnet-20241022',  // Anthropic
  'gpt-4o',                      // OpenAI
  'gemini-pro',                  // Google
  'deepseek-chat',               // Deepseek
  'grok-beta',                   // xAI
  // ... and OpenRouter models
];

// Switch providers seamlessly
const stream = request(providers[0], messages);`}
                </code>
              </pre>
            </div>
          </div>

          {/* Tool calling */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Tool calling & conversation history
            </h3>
            <div className="bg-dark-100 border-dark-50 rounded-lg border p-6">
              <pre className="overflow-x-auto">
                <code className="font-mono text-sm">
                  {`// Built-in tool calling support
const tools = [
  {
    name: 'get_weather',
    description: 'Get current weather',
    parameters: { city: 'string' }
  }
];

const stream = request('claude-3-5-sonnet-20241022', messages, { tools });

// Automatically converts streaming events to conversation history
// Supports early stream termination
// Flexible tool processing with custom logging`}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="font-display mb-6 text-2xl font-bold">Key Features</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="text-brand-cyan mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <span className="font-semibold">Multi-provider support:</span>
                <span className="ml-2 text-white/60">
                  Claude, OpenAI, Gemini, Deepseek, Grok, and OpenRouter.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="text-brand-cyan mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <span className="font-semibold">AsyncGenerator API:</span>
                <span className="ml-2 text-white/60">
                  streaming responses with early termination support.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="text-brand-cyan mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <span className="font-semibold">Tool calling:</span>
                <span className="ml-2 text-white/60">
                  built-in function calling with flexible processing.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="text-brand-cyan mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <span className="font-semibold">Cost & quota tracking:</span>
                <span className="ml-2 text-white/60">
                  monitor usage and spending across providers.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="text-brand-cyan mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <span className="font-semibold">TypeScript native:</span>
                <span className="ml-2 text-white/60">
                  full type safety and pluggable logging system.
                </span>
              </div>
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
            <code className="text-brand-cyan font-mono">
              npm i @just-every/ensemble
            </code>
            <a
              href="https://github.com/just-every/ensemble"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              Source <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="border-dark-50 flex items-center justify-between border-t pt-8">
          <Link
            href="/stack"
            className="text-white/60 transition-colors hover:text-white"
          >
            ← Stack Overview
          </Link>
          <Link
            href="/mech"
            className="text-white/60 transition-colors hover:text-white"
          >
            MECH →
          </Link>
        </div>
      </div>
    </div>
  );
}
