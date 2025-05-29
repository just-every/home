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
            href: '/docs/quickstart'
        },
        {
            title: 'API Reference',
            icon: Code,
            description: 'Complete API documentation',
            href: '/docs/api'
        },
        {
            title: 'CLI Usage',
            icon: Terminal,
            description: 'Command line interface guide',
            href: '/docs/cli'
        },
        {
            title: 'Authentication',
            icon: FileCode,
            description: 'Auth setup and configuration',
            href: '/docs/auth'
        },
        {
            title: 'Cost Tracking',
            icon: Book,
            description: 'Monitor and control usage costs',
            href: '/docs/costs'
        },
        {
            title: 'Error Handling',
            icon: AlertCircle,
            description: 'Debug and handle errors',
            href: '/docs/errors'
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
                        Documentation
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Everything you need to build with JustEvery_ stack.
                    </p>
                </motion.div>

                {/* Documentation Sections */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                            >
                                <Link href={section.href} className="block group">
                                    <div className="bg-dark-100 rounded-lg p-6 border border-dark-50 hover:border-brand-cyan/50 transition-all duration-300">
                                        <Icon className="w-8 h-8 text-brand-cyan mb-4" />
                                        <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-cyan transition-colors">
                                            {section.title}
                                        </h3>
                                        <p className="text-white/60 text-sm">
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
                    className="bg-gradient-to-r from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 rounded-lg p-8 border border-brand-pink/20 text-center"
                >
                    <p className="text-lg mb-4">
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