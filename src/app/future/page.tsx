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
            color: 'text-brand-cyan'
        },
        {
            title: 'Food autonomy',
            description: 'precision fermentation, vertical farming',
            icon: Leaf,
            color: 'text-brand-pink'
        },
        {
            title: 'Universal healthcare R&D',
            description: 'open medical research, accessible treatments',
            icon: Heart,
            color: 'text-brand-amber'
        },
        {
            title: 'Education access',
            description: 'open curricula, low-cost devices',
            icon: GraduationCap,
            color: 'text-brand-cyan'
        }
    ];

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">
                        The Future Fund
                    </h1>
                    
                    <p className="text-2xl text-white/80 mb-8">
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
                    <p className="text-lg text-white/80 mb-8">
                        We believe software should wipe out involuntary suffering—hunger, lack of shelter, unearned illness.
                    </p>
                    
                    <p className="text-lg text-white/80 mb-12">
                        That&apos;s why <span className="font-bold text-brand-amber">90% of any commercial revenue</span> derived from the JustEvery_ stack is routed to projects that move the needle on:
                    </p>
                </motion.div>

                {/* Impact Areas */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid md:grid-cols-2 gap-6 mb-16"
                >
                    {impactAreas.map((area, index) => {
                        const Icon = area.icon;
                        return (
                            <div key={area.title} className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                                <div className="flex items-start gap-4">
                                    <Icon className={`w-6 h-6 ${area.color} mt-0.5`} />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">{index + 1}. {area.title}</h3>
                                        <p className="text-white/60 text-sm">{area.description}</p>
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
                    <h2 className="text-2xl font-display font-bold mb-8">How it works</h2>
                    
                    <div className="bg-dark-100 rounded-lg overflow-hidden border border-dark-50">
                        <table className="w-full">
                            <thead className="bg-dark-50">
                                <tr>
                                    <th className="text-left px-6 py-4 font-semibold">Step</th>
                                    <th className="text-left px-6 py-4 font-semibold">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-dark-50">
                                    <td className="px-6 py-4 font-semibold text-brand-cyan">1. You donate</td>
                                    <td className="px-6 py-4 text-white/60">Directly to an approved non-profit or open-research org.</td>
                                </tr>
                                <tr className="border-t border-dark-50">
                                    <td className="px-6 py-4 font-semibold text-brand-pink">2. You file a PR</td>
                                    <td className="px-6 py-4 text-white/60">Add your receipt hash to DONATIONS.md.</td>
                                </tr>
                                <tr className="border-t border-dark-50">
                                    <td className="px-6 py-4 font-semibold text-brand-amber">3. We verify & shout-out</td>
                                    <td className="px-6 py-4 text-white/60">Your logo appears on this page and the docs sidebar.</td>
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
                    className="bg-gradient-to-r from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 rounded-lg p-8 border border-brand-pink/20 text-center mb-12"
                >
                    <blockquote className="text-lg italic mb-2">
                        &quot;Abundance is not a dream—just a poorly allocated budget.&quot;
                    </blockquote>
                    <cite className="text-white/60 text-sm">— 2040 Annual Report, we hope</cite>
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
                        className="inline-flex items-center gap-2 text-brand-cyan hover:text-brand-pink transition-colors"
                    >
                        View the open source project <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}