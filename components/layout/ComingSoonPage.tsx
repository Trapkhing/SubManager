'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Construction } from 'lucide-react';
import { useState } from 'react';

import { motion } from 'framer-motion';

interface ComponentProps {
    title: string;
}

export default function ComingSoonPage({ title }: ComponentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <Sidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
            <div className="flex-1 flex flex-col md:ml-64 relative transition-all duration-300">
                {/* Top Navigation - Passing no-op for add click since it's just a placeholder page */}
                <TopBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onAddClick={() => { }}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />

                <motion.main
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col items-center justify-center p-10 text-center"
                >
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                        <Construction size={48} className="text-white/20" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                    <p className="text-white/40 max-w-md">
                        We're working hard to bring you this feature. Stay tuned for updates!
                    </p>
                </motion.main>
            </div>
        </div>
    );
}
