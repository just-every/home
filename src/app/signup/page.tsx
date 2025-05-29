'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        setIsSubmitted(true);
    };

    const features = [
        'Natural language to live app in seconds',
        'Auto-generated UI with image gen',
        'Containerized backend infrastructure',
        'Real-time iteration based on usage',
        'MIT licensed, fully open source'
    ];

    return (
        <div className="min-h-screen py-20 flex items-center">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                        Join the Beta
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Be among the first to build any app with just a prompt. Limited spots available.
                    </p>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-dark-100 rounded-lg p-8 border border-dark-50 mb-12"
                >
                    <h2 className="text-2xl font-display font-bold mb-6">What you&apos;ll get:</h2>
                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
                                <span className="text-white/80">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gradient-to-r from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 rounded-lg p-8 border border-brand-pink/20"
                >
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-dark-100 border border-dark-50 rounded-lg focus:outline-none focus:border-brand-cyan transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full relative group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-amber opacity-75 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative flex items-center gap-2">
                                    Request Early Access <ArrowRight className="w-5 h-5" />
                                </span>
                            </button>
                            
                            <p className="text-sm text-white/60 text-center">
                                We&apos;ll only email you about JustEvery_ updates. No spam, ever.
                            </p>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-brand-cyan to-brand-pink flex items-center justify-center"
                            >
                                <Check className="w-8 h-8 text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-display font-bold mb-2">You&apos;re on the list!</h3>
                            <p className="text-white/80">We&apos;ll be in touch soon with your beta access.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}