'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers, Hammer, Play, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MagiPage() {
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
                        Magi
                    </h1>
                    
                    <p className="text-2xl text-white/80 mb-12">
                        The autonomous engine room
                    </p>
                    
                    <p className="text-lg text-white/60 mb-12">
                        The full orchestration system that brings it all together. Magi reads your prompt, generates entire applications, deploys them in Docker/Firecracker containers, monitors performance through a React UI, and autonomously refactors based on usage patterns—all while you sleep.
                    </p>
                </motion.div>

                {/* How it works */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-display font-bold mb-6">Mostly autonomous workflow</h2>
                    <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                        <pre className="overflow-x-auto">
                            <code className="text-sm font-mono">
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
                    <h2 className="text-2xl font-display font-bold mb-8">Under the hood</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <div className="flex items-start gap-4">
                                <Layers className="w-6 h-6 text-brand-cyan mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Planner</h3>
                                    <p className="text-white/60">Breaks the prompt into tasks and agent roles</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <div className="flex items-start gap-4">
                                <Hammer className="w-6 h-6 text-brand-pink mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Builder</h3>
                                    <p className="text-white/60">Generates full React + Tailwind applications with APIs</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <div className="flex items-start gap-4">
                                <Play className="w-6 h-6 text-brand-amber mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Runner</h3>
                                    <p className="text-white/60">Deploys in Docker/Firecracker containers with isolation</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <div className="flex items-start gap-4">
                                <Eye className="w-6 h-6 text-brand-cyan mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Watcher</h3>
                                    <p className="text-white/60">React monitoring UI + autonomous refactoring based on usage</p>
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
                    className="bg-gradient-to-r from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 rounded-lg p-8 mb-12 border border-brand-pink/20"
                >
                    <p className="text-lg italic text-center mb-2">
                        &quot;It&apos;s like Replit Ghostwriter, Vercel v0, and GitHub Copilot had a self-driving baby.&quot;
                    </p>
                    <p className="text-sm text-white/60 text-center">
                        Powered by Ensemble + MECH under the hood for intelligent model switching and persistent memory.
                    </p>
                </motion.div>

                {/* Install */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-dark-100 rounded-lg p-6 border border-dark-50 mb-12"
                >
                    <div className="flex items-center justify-between">
                        <code className="font-mono text-brand-amber">npm i @justevery/magi</code>
                        <Link 
                            href="/signup"
                            className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                        >
                            Join the private beta <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-dark-50">
                    <Link href="/mech" className="text-white/60 hover:text-white transition-colors">
                        ← MECH
                    </Link>
                    <Link href="/one" className="text-white/60 hover:text-white transition-colors">
                        Open Source →
                    </Link>
                </div>
            </div>
        </div>
    );
}