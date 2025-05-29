'use client';

import Link from 'next/link';
import { Github as GitHubIcon, GitBranch, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OnePage() {
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
                        One repo. All the layers.
                    </h1>
                    
                    <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                        Everything you just saw—Ensemble, MECH, Magi, the JustEvery_ web client—is published under <span className="font-bold text-brand-cyan">MIT</span>.
                    </p>
                </motion.div>

                {/* Core Principles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-display font-bold mb-8">We keep it simple:</h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-brand-cyan">1.</span>
                            <p className="text-lg text-white/80">
                                <span className="font-semibold">Fork it, ship it, break it, improve it.</span>
                            </p>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-brand-pink">2.</span>
                            <p className="text-lg text-white/80">
                                If you build a commercial product, we <em>ask</em> (but do not legally require) you to donate <span className="font-bold text-brand-amber">90% of net profit</span> to a future-positive project.
                            </p>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-brand-amber">3.</span>
                            <p className="text-lg text-white/80">
                                We list every donor transparently at <Link href="/future" className="text-brand-cyan hover:text-brand-pink transition-colors">/future</Link>.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-dark-100 rounded-lg p-8 border border-dark-50 mb-16"
                >
                    <h2 className="text-2xl font-display font-bold mb-6">Quick links</h2>
                    
                    <div className="space-y-4">
                        <a 
                            href="https://github.com/just-every/ONE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                        >
                            <GitHubIcon className="w-5 h-5" />
                            <span className="font-semibold">Mono-repo</span>
                            <span className="text-white/40">→ github.com/JustEvery/ONE</span>
                        </a>
                        
                        <a 
                            href="https://github.com/just-every/ONE/blob/main/CONTRIBUTING.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                        >
                            <Users className="w-5 h-5" />
                            <span className="font-semibold">Contributing guide</span>
                            <span className="text-white/40">→ CONTRIBUTING.md</span>
                        </a>
                        
                        <a 
                            href="https://github.com/just-every/ONE/projects"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                        >
                            <GitBranch className="w-5 h-5" />
                            <span className="font-semibold">Roadmap</span>
                            <span className="text-white/40">→ GitHub Projects board</span>
                        </a>
                    </div>
                </motion.div>

                {/* Final Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center bg-gradient-to-r from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 rounded-lg p-8 border border-brand-pink/20"
                >
                    <p className="text-xl mb-4">PRs welcome. Break reality responsibly.</p>
                    <a 
                        href="https://github.com/just-every/ONE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-cyan hover:text-brand-pink transition-colors"
                    >
                        <GitHubIcon className="w-5 h-5" />
                        View on GitHub
                    </a>
                </motion.div>
            </div>
        </div>
    );
}