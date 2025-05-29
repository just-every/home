'use client';

import Link from 'next/link';
import { ExternalLink, GitBranch, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ShowcasePage() {
    const [filter, setFilter] = useState('newest');
    
    const apps = [
        {
            name: 'Zero-Waste Meal Planner',
            creator: '@cookielogic',
            forks: 128,
            demo: '/apps/meal',
            gradient: 'from-brand-cyan to-brand-pink'
        },
        {
            name: 'Antique Doll Price Radar',
            creator: '@vintageAI',
            forks: 42,
            demo: '/apps/dolls',
            gradient: 'from-brand-pink to-brand-amber'
        },
        {
            name: 'KPI Shock Dashboard',
            creator: '@cfo-lol',
            forks: 76,
            demo: '/apps/kpi',
            gradient: 'from-brand-amber to-brand-cyan'
        },
        {
            name: 'Toddler Poop Tracker',
            creator: '@parent42',
            forks: 33,
            demo: '/apps/poop',
            gradient: 'from-brand-cyan via-brand-pink to-brand-amber'
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
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                        Community Showcase
                    </h1>
                    <p className="text-xl text-white/80">
                        Live, forkable mini-apps built with a single prompt.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-center justify-center gap-4 mb-12"
                >
                    <Filter className="w-5 h-5 text-white/60" />
                    <button
                        onClick={() => setFilter('newest')}
                        className={`px-4 py-2 rounded-full transition-all ${
                            filter === 'newest' 
                                ? 'bg-brand-cyan text-white' 
                                : 'text-white/60 hover:text-white'
                        }`}
                    >
                        Newest
                    </button>
                    <button
                        onClick={() => setFilter('forks')}
                        className={`px-4 py-2 rounded-full transition-all ${
                            filter === 'forks' 
                                ? 'bg-brand-pink text-white' 
                                : 'text-white/60 hover:text-white'
                        }`}
                    >
                        Most forked
                    </button>
                    <button
                        onClick={() => setFilter('picks')}
                        className={`px-4 py-2 rounded-full transition-all ${
                            filter === 'picks' 
                                ? 'bg-brand-amber text-white' 
                                : 'text-white/60 hover:text-white'
                        }`}
                    >
                        Staff picks
                    </button>
                </motion.div>

                {/* App Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {apps.map((app, index) => (
                        <motion.div
                            key={app.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-dark-100 rounded-lg overflow-hidden border border-dark-50 hover:border-brand-cyan/50 transition-all duration-300">
                                {/* App Preview */}
                                <div className={`aspect-video bg-gradient-to-br ${app.gradient} opacity-20`}></div>
                                
                                {/* App Info */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">{app.name}</h3>
                                    <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                                        <span>{app.creator}</span>
                                        <span className="flex items-center gap-1">
                                            <GitBranch className="w-4 h-4" />
                                            {app.forks} forks
                                        </span>
                                    </div>
                                    <a
                                        href={app.demo}
                                        className="inline-flex items-center gap-2 text-brand-cyan hover:text-brand-pink transition-colors"
                                    >
                                        Launch <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Build Your Own CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center"
                >
                    <Link 
                        href="/signup"
                        className="relative group inline-flex items-center px-8 py-4 text-lg font-medium text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-amber opacity-75 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-2">
                            Build your own <ExternalLink className="w-5 h-5" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}