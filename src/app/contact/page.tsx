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
      color: 'hover:text-brand-cyan',
    },
    {
      name: 'X / Twitter',
      handle: '@JustEveryAI',
      href: 'https://twitter.com/JustEveryAI',
      icon: Twitter,
      color: 'hover:text-brand-pink',
    },
    {
      name: 'Press & partnerships',
      handle: 'press@justevery.com',
      href: 'mailto:press@justevery.com',
      icon: Mail,
      color: 'hover:text-brand-amber',
    },
    {
      name: 'Security disclosures',
      handle: 'security@justevery.com',
      href: 'mailto:security@justevery.com',
      icon: Shield,
      color: 'hover:text-brand-cyan',
      note: 'PGP key on GitHub',
    },
  ];

  return (
    <div className="flex min-h-screen items-center py-20">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="font-display mb-6 text-5xl font-bold md:text-6xl">
            Talk to humans, not bots.
          </h1>
        </motion.div>

        {/* Contact Methods */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.name}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  method.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="group"
              >
                <div className="bg-dark-100 border-dark-50 hover:border-brand-cyan/50 rounded-lg border p-6 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <Icon
                      className={`h-6 w-6 text-white/60 ${method.color} mt-0.5 transition-colors`}
                    />
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-semibold">
                        {method.name}
                      </h3>
                      <p
                        className={`text-white/60 ${method.color} transition-colors`}
                      >
                        {method.handle}
                      </p>
                      {method.note && (
                        <p className="mt-1 text-sm text-white/40">
                          {method.note}
                        </p>
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
