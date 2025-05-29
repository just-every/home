'use client';

import Link from 'next/link';
import { ArrowRight, Code, Cpu, Box, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StackPage() {
    const stackItems = [
        {
            name: 'Ensemble',
            description: 'Simple JS library that lets you switch between GPT-4, Claude, Llama with one line. Built-in cost tracking and automatic fallbacks when models hit rate limits.',
            icon: Code,
            href: '/ensemble',
            color: 'from-brand-cyan to-brand-pink',
            snippet: 'await ai.complete("prompt", { model: "claude-3.5" })',
            delay: 0
        },
        {
            name: 'MECH',
            description: 'Builds on Ensemble to create persistent memory using vector/SQL hybrid storage. Enables agents to remember context across sessions and maintain coherent long-term reasoning.',
            icon: Cpu,
            href: '/mech',
            color: 'from-brand-pink to-brand-amber',
            snippet: 'mech.remember("user preferences", embeddings)',
            delay: 0.1
        },
        {
            name: 'Magi',
            description: 'Full orchestration system using Ensemble and MECH. Container management with Docker/Firecracker, React UI for monitoring. Mostly autonomous generative intelligence.',
            icon: Box,
            href: '/magi',
            color: 'from-brand-amber to-brand-cyan',
            snippet: 'magi.deploy("new-app", { autoScale: true })',
            delay: 0.2
        },
        {
            name: 'JustEvery_',
            description: 'The actual app that Magi drives. Social network for AI-generated apps. UI-first using image generators. Currently MVP but improving rapidly with each deployment.',
            icon: Sparkles,
            href: '/signup',
            color: 'from-brand-cyan via-brand-pink to-brand-amber',
            snippet: 'prompt → generated UI → live app',
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                        The Stack
                    </h1>
                    <p className="text-2xl text-white/80 max-w-3xl mx-auto">
                        Four layers working in harmony to turn your ideas into reality.
                    </p>
                </motion.div>

                {/* Stack Items */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {stackItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: item.delay }}
                            >
                                <Link
                                    href={item.href}
                                    className="block group"
                                >
                                    <div className="bg-dark-100 rounded-lg p-8 border border-dark-50 hover:border-brand-cyan/50 transition-all duration-300">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-2xl font-display font-bold mb-2 group-hover:text-brand-cyan transition-colors">
                                                    {item.name}
                                                </h2>
                                                <p className="text-white/60 mb-4">
                                                    {item.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <code className="font-mono text-sm text-white/40">
                                                        {item.snippet}
                                                    </code>
                                                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-brand-cyan transition-colors" />
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
                    <p className="text-lg text-white/60 mb-8">
                        Section order mirrors developer adoption funnel.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/docs"
                            className="inline-flex items-center px-6 py-3 text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                        >
                            Read the Docs
                        </Link>
                        <Link
                            href="/showcase"
                            className="inline-flex items-center px-6 py-3 text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                        >
                            See Examples
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}