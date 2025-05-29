'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EnsemblePage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back to Stack */}
                <Link href="/stack" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Stack
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">
                        Ensemble
                    </h1>
                    
                    <p className="text-2xl text-white/80 mb-12">
                        One import. Every model.
                    </p>
                    
                    <p className="text-lg text-white/60 mb-12">
                        Stop rewriting prompts every quarter because a provider jacked its pricing.<br />
                        With <span className="text-brand-cyan font-semibold">Ensemble</span> you flip between GPT-4o, Claude Opus, Llama-3—or tomorrow&apos;s hotness—in one line.
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
                        <h3 className="text-lg font-semibold mb-3">Basic usage</h3>
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <pre className="overflow-x-auto">
                                <code className="text-sm font-mono">
{`import { ask } from "@justevery/ensemble";

// Switch models with one parameter change
const reply = await ask({
  prompt: "Explain quantum tunnelling to a ten-year-old",
  model: "claude-3-opus",  // or "gpt-4o", "llama3:70b", etc.
});`}
                                </code>
                            </pre>
                        </div>
                    </div>

                    {/* Automatic fallbacks */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Automatic fallbacks when rate limited</h3>
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <pre className="overflow-x-auto">
                                <code className="text-sm font-mono">
{`// Define fallback chain
const reply = await ask({
  prompt: "Generate a business plan outline",
  model: "gpt-4o",
  fallbacks: ["claude-3-opus", "gpt-3.5-turbo"],
  // If GPT-4 is rate limited, automatically tries Claude, then GPT-3.5
});

// Cost tracking included
console.log(reply.cost); // { usd: 0.0023, tokens: 450 }
console.log(reply.model); // "claude-3-opus" (if GPT-4 was rate limited)`}
                                </code>
                            </pre>
                        </div>
                    </div>

                    {/* Cost controls */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Built-in cost tracking & limits</h3>
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <pre className="overflow-x-auto">
                                <code className="text-sm font-mono">
{`// Set spending limits
const reply = await ask({
  prompt: complexPrompt,
  model: "gpt-4o",
  maxCost: 0.10, // Max $0.10 per request
  estimateFirst: true, // Get cost estimate before running
});

// Track usage across sessions
const usage = await ensemble.getUsage("2024-01");
// { total: 12.34, byModel: { "gpt-4o": 8.50, "claude-3": 3.84 } }`}
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
                    <h2 className="text-2xl font-display font-bold mb-6">Why you&apos;ll love it</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="font-semibold">Zero lock-in:</span>
                                <span className="text-white/60 ml-2">same schema, any vendor.</span>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="font-semibold">Automatic fallbacks:</span>
                                <span className="text-white/60 ml-2">seamlessly switch providers when rate limited.</span>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="font-semibold">Cost tracking:</span>
                                <span className="text-white/60 ml-2">real-time $/token monitoring & spending limits.</span>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="font-semibold">Auto-benchmarks:</span>
                                <span className="text-white/60 ml-2">nightly latency + quality tests posted to Slack.</span>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="font-semibold">Edge-ready:</span>
                                <span className="text-white/60 ml-2">&lt;8 kB gzipped ESM.</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Install */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-dark-100 rounded-lg p-6 border border-dark-50 mb-12"
                >
                    <div className="flex items-center justify-between">
                        <code className="font-mono text-brand-cyan">npm i @just-every/ensemble</code>
                        <a 
                            href="https://github.com/just-every/ensemble"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                        >
                            Source <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-dark-50">
                    <Link href="/stack" className="text-white/60 hover:text-white transition-colors">
                        ← Stack Overview
                    </Link>
                    <Link href="/mech" className="text-white/60 hover:text-white transition-colors">
                        MECH →
                    </Link>
                </div>
            </div>
        </div>
    );
}