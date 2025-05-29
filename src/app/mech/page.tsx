'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Database, GitBranch, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MechPage() {
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
                        MECH
                    </h1>
                    
                    <p className="text-2xl text-white/80 mb-12">
                        Memory with an attention span
                    </p>
                    
                    <p className="text-lg text-white/60 mb-12">
                        Chat history windows are cute until you need an agent that recalls a doc you fed it last Tuesday.<br />
                        <span className="text-brand-pink font-semibold">MECH</span> builds on Ensemble to add persistent memory—storing structured &quot;thoughts&quot; in a pluggable vector/SQL layer that syncs across agents and sessions.
                    </p>
                </motion.div>

                {/* Code Examples */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16 space-y-6"
                >
                    {/* Basic memory operations */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Persistent memory across sessions</h3>
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <pre className="overflow-x-auto">
                                <code className="text-sm font-mono">
{`import { Mech } from "@justevery/mech";
import { ask } from "@justevery/ensemble";

const mech = new Mech("postgres://...");

// Store context from one conversation
await mech.think("user-123", {
  context: "Prefers TypeScript, uses Next.js, dislikes class components",
  metadata: { timestamp: Date.now(), session: "onboarding" }
});

// Days later, in a new session...
const memories = await mech.recall("user-123");
const response = await ask({
  prompt: "Help me refactor this component",
  context: memories, // Agent remembers user preferences!
  model: "claude-3-opus"
});`}
                                </code>
                            </pre>
                        </div>
                    </div>

                    {/* Cross-agent memory */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Shared memory between agents</h3>
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <pre className="overflow-x-auto">
                                <code className="text-sm font-mono">
{`// Support agent stores customer issue
await supportAgent.think("ticket-2786", {
  issue: "Shipping address needs update",
  customerMood: "frustrated",
  priority: "high"
});

// Engineering agent can access the same memory
const context = await engineeringAgent.recall("ticket-2786");
// Knows the customer context without re-asking

// Vector search finds related issues
const similar = await mech.search("shipping address problems");
// Returns relevant tickets and resolutions`}
                                </code>
                            </pre>
                        </div>
                    </div>
                </motion.div>

                {/* Key Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-display font-bold mb-8">Key features</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <div className="flex items-center gap-3 mb-3">
                                <GitBranch className="w-5 h-5 text-brand-pink" />
                                <h3 className="font-semibold">CRDT merge</h3>
                            </div>
                            <p className="text-white/60 text-sm">No race conditions.</p>
                        </div>
                        
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock className="w-5 h-5 text-brand-amber" />
                                <h3 className="font-semibold">TTL & GDPR sliders</h3>
                            </div>
                            <p className="text-white/60 text-sm">Forget-me controls built in.</p>
                        </div>
                        
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <div className="flex items-center gap-3 mb-3">
                                <Database className="w-5 h-5 text-brand-cyan" />
                                <h3 className="font-semibold">Vector + SQL hybrid</h3>
                            </div>
                            <p className="text-white/60 text-sm">Semantic search meets structured data.</p>
                        </div>
                        
                        <div className="bg-dark-100 rounded-lg p-6 border border-dark-50">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="w-5 h-5 text-brand-pink" />
                                <h3 className="font-semibold">Built on Ensemble</h3>
                            </div>
                            <p className="text-white/60 text-sm">Inherits all model switching & fallbacks.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Install */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-dark-100 rounded-lg p-6 border border-dark-50 mb-12"
                >
                    <div className="flex items-center justify-between">
                        <code className="font-mono text-brand-pink">npm i @justevery/mech</code>
                        <a 
                            href="https://github.com/just-every/mech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                        >
                            Read the spec <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-dark-50">
                    <Link href="/ensemble" className="text-white/60 hover:text-white transition-colors">
                        ← Ensemble
                    </Link>
                    <Link href="/magi" className="text-white/60 hover:text-white transition-colors">
                        Magi →
                    </Link>
                </div>
            </div>
        </div>
    );
}