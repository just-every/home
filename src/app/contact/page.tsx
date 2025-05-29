'use client';

import { MessageCircle, Twitter, Mail, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const contactMethods = [
        {
            name: 'Discord',
            handle: 'discord.gg/JustEvery',
            href: 'https://discord.gg/JustEvery',
            icon: MessageCircle,
            color: 'hover:text-brand-cyan'
        },
        {
            name: 'X / Twitter',
            handle: '@JustEveryAI',
            href: 'https://twitter.com/JustEveryAI',
            icon: Twitter,
            color: 'hover:text-brand-pink'
        },
        {
            name: 'Press & partnerships',
            handle: 'press@justevery.com',
            href: 'mailto:press@justevery.com',
            icon: Mail,
            color: 'hover:text-brand-amber'
        },
        {
            name: 'Security disclosures',
            handle: 'security@justevery.com',
            href: 'mailto:security@justevery.com',
            icon: Shield,
            color: 'hover:text-brand-cyan',
            note: 'PGP key on GitHub'
        }
    ];

    return (
        <div className="min-h-screen py-20 flex items-center">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                        Talk to humans, not bots.
                    </h1>
                </motion.div>

                {/* Contact Methods */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <motion.a
                                key={method.name}
                                href={method.href}
                                target={method.href.startsWith('http') ? '_blank' : undefined}
                                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-dark-100 rounded-lg p-6 border border-dark-50 hover:border-brand-cyan/50 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <Icon className={`w-6 h-6 text-white/60 ${method.color} transition-colors mt-0.5`} />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-1">{method.name}</h3>
                                            <p className={`text-white/60 ${method.color} transition-colors`}>
                                                {method.handle}
                                            </p>
                                            {method.note && (
                                                <p className="text-sm text-white/40 mt-1">{method.note}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Response Time */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center text-white/60"
                >
                    We answer within 24 h unless we&apos;re deep in the Magi code cave.
                </motion.p>
            </div>
        </div>
    );
}