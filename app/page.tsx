'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Zap, Globe } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-white selection:text-black">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Logo />
                    <div className="flex items-center gap-6">

                        <Link
                            href="/dashboard"
                            className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-medium uppercase tracking-wider"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        v1.0 is Live
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white"
                    >
                        Take Control of <br />
                        Recurring Costs.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-white/50 max-w-xl mx-auto leading-relaxed font-light"
                    >
                        The minimal, privacy-focused subscription tracker you've been waiting for. No bloat, just clarity.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
                    >
                        <Link
                            href="/dashboard"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all text-lg flex items-center justify-center gap-2"
                        >
                            Launch Dashboard
                        </Link>

                    </motion.div>
                </div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="max-w-5xl mx-auto mt-24 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden"
                >
                    <FeatureCard
                        icon={<Zap size={24} />}
                        title="Instant Tracking"
                        description="Add subscriptions in seconds. We automatically fetch logos and calculate your next billing date."
                    />
                    <FeatureCard
                        icon={<Globe size={24} />}
                        title="Multi-Currency"
                        description="Built for the modern world. Support for USD, EUR, and fully optimized for Ghanaian Cedi (₵)."
                    />
                    <FeatureCard
                        icon={<Shield size={24} />}
                        title="Privacy First"
                        description="Your data stays on your device. We use local storage technology to keep your financial info private."
                    />
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 bg-[#050505] relative z-10">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/40 text-sm">© 2026 SubManager. All rights reserved.</p>
                    <div className="flex items-center gap-8 text-sm text-white/40">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="https://twitter.com/trappkhing" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</Link>
                        <a href="https://www.logo.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Logos provided by Logo.dev</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 bg-[#0a0a0a] hover:bg-[#111] transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-white/40 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}
