'use client';

import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { sortSubscriptionsByDate, getDaysRemaining } from '@/lib/dateUtils';
import { getLogoUrl, getOrdinalSuffix } from '@/lib/utils';
import { SubscriptionLogo } from '@/components/ui/SubscriptionLogo';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AddSubscriptionModal } from '@/components/subscriptions/AddSubscriptionModal';
import { Subscription } from '@/types';

export default function Upcoming() {
    const [searchQuery, setSearchQuery] = useState('');
    const { subscriptions, addSubscription, updateSubscription } = useSubscriptions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSub, setEditingSub] = useState<Subscription | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingSub(null);
    };

    const handleSave = (subData: Omit<Subscription, 'id'>) => {
        if (editingSub) {
            updateSubscription(editingSub.id, subData);
        } else {
            addSubscription(subData);
        }
    };

    const sortedSubscriptions = useMemo(() => {
        return sortSubscriptionsByDate(subscriptions);
    }, [subscriptions]);

    const totalNext30Days = useMemo(() => {
        return sortedSubscriptions
            .filter(sub => sub.daysRemaining <= 30)
            .reduce((acc, sub) => acc + sub.price, 0);
    }, [sortedSubscriptions]);

    const getGroupLabel = (days: number) => {
        if (days === 0) return 'Today';
        if (days === 1) return 'Tomorrow';
        if (days >= 2 && days <= 7) return 'This Week';
        if (days > 7 && days <= 14) return 'Next Week';
        if (days > 14 && days <= 30) return 'This Month';
        return 'Later';
    };

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <Sidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col md:ml-64 relative transition-all duration-300">
                <TopBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onAddClick={() => setIsModalOpen(true)}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />
                <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Upcoming Payments</h1>
                            <p className="text-white/40">Track your pending bills for the next cycle.</p>
                        </div>

                        {/* Summary Card */}
                        <div className="glass-panel p-5 rounded-2xl flex items-center gap-5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50" />
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-white/50 font-medium uppercase tracking-wider mb-1">Due Next 30 Days</p>
                                <p className="text-2xl font-bold text-white">₵{totalNext30Days.toFixed(2)}</p>
                            </div>
                        </div>
                    </header>

                    {/* Timeline List */}
                    <div className="space-y-6">
                        {sortedSubscriptions.length === 0 ? (
                            <div className="text-center py-20 opacity-50 border border-dashed border-white/10 rounded-2xl">
                                <CheckCircle2 size={48} className="mx-auto mb-4 text-green-500/50" />
                                <p className="text-xl">No upcoming payments found.</p>
                                <p className="text-sm text-white/40 mt-2">You're all caught up!</p>
                            </div>
                        ) : (
                            sortedSubscriptions.map((sub, index) => {
                                const group = getGroupLabel(sub.daysRemaining);
                                const prevGroup = index > 0 ? getGroupLabel(sortedSubscriptions[index - 1].daysRemaining) : null;
                                const showHeader = group !== prevGroup;

                                return (
                                    <div key={sub.id}>
                                        {showHeader && (
                                            <h2 className="text-lg font-semibold text-white/80 mt-8 mb-4 flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${group === 'Today' || group === 'Tomorrow' ? 'bg-red-500' :
                                                    group === 'This Week' ? 'bg-orange-500' : 'bg-blue-500'
                                                    }`} />
                                                {group}
                                            </h2>
                                        )}

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="glass-panel p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors mb-3"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Date Badge */}
                                                <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg border ${sub.daysRemaining <= 3 ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                    'bg-white/5 border-white/10 text-white/60'
                                                    }`}>
                                                    <span className="text-xs font-bold uppercase">{sub.nextPayment.toLocaleString('default', { month: 'short' })}</span>
                                                    <span className="text-xl font-bold leading-none">
                                                        {sub.nextPayment.getDate()}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={getLogoUrl(sub.website || sub.name)}
                                                        alt={sub.name}
                                                        className="w-10 h-10 rounded-full object-cover bg-white/5"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = `https://placehold.co/100x100/333/fff?text=${sub.name.charAt(0)}`;
                                                        }}
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-white text-lg">{sub.name}</h3>
                                                        <div className="flex items-center gap-2 text-xs text-white/40">
                                                            <span>{sub.cycle}</span>
                                                            {sub.daysRemaining <= 3 && (
                                                                <span className="flex items-center gap-1 text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                                                                    <AlertCircle size={10} />
                                                                    Due Soon
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xl font-bold text-white">
                                                    {sub.currency === 'GHS' ? '₵' : sub.currency === 'EUR' ? '€' : '$'}
                                                    {sub.price.toFixed(2)}
                                                </p>
                                                <p className={`text-xs font-medium ${sub.daysRemaining === 0 ? 'text-red-400' : 'text-white/40'}`}>
                                                    {sub.daysRemaining === 0 ? 'Due Today' :
                                                        sub.daysRemaining === 1 ? 'Due Tomorrow' :
                                                            `in ${sub.daysRemaining} days`}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <footer className="mt-12 border-t border-white/5 pt-6 flex justify-center">
                        <a
                            href="https://www.logo.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/20 hover:text-white/40 transition-colors"
                        >
                            Logos provided by Logo.dev
                        </a>
                    </footer>
                </main>
            </div>

            <AddSubscriptionModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSave={handleSave}
                editingSubscription={editingSub}
            />
        </div>
    );
}
