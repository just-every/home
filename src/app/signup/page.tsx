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
    'MIT licensed, fully open source',
  ];

  return (
    <div className="flex min-h-screen items-center py-20">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="font-display mb-6 text-5xl font-bold md:text-6xl">
            Join the Beta
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-white/80">
            Be among the first to build any app with just a prompt. Limited
            spots available.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-dark-100 border-dark-50 mb-12 rounded-lg border p-8"
        >
          <h2 className="font-display mb-6 text-2xl font-bold">
            What you&apos;ll get:
          </h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="text-brand-cyan mt-0.5 h-5 w-5 flex-shrink-0" />
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
          className="from-brand-cyan/10 via-brand-pink/10 to-brand-amber/10 border-brand-pink/20 rounded-lg border bg-gradient-to-r p-8"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-dark-100 border-dark-50 focus:border-brand-cyan w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:scale-105"
              >
                <span className="from-brand-cyan via-brand-pink to-brand-amber absolute inset-0 bg-gradient-to-r opacity-75 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative flex items-center gap-2">
                  Request Early Access <ArrowRight className="h-5 w-5" />
                </span>
              </button>

              <p className="text-center text-sm text-white/60">
                We&apos;ll only email you about JustEvery_ updates. No spam,
                ever.
              </p>
            </form>
          ) : (
            <div className="py-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="from-brand-cyan to-brand-pink mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r"
              >
                <Check className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="font-display mb-2 text-2xl font-bold">
                You&apos;re on the list!
              </h3>
              <p className="text-white/80">
                We&apos;ll be in touch soon with your beta access.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
