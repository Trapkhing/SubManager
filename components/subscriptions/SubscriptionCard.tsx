'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Subscription } from '@/types';
import { getLogoUrl, getOrdinalSuffix, cn } from '@/lib/utils';
import { SubscriptionLogo } from '@/components/ui/SubscriptionLogo';
import { Trash2, Edit2, Calendar } from 'lucide-react';

interface SubscriptionCardProps {
    subscription: Subscription;
    onEdit: (sub: Subscription) => void;
    onDelete: (id: string) => void;
}

export function SubscriptionCard({ subscription, onEdit, onDelete }: SubscriptionCardProps) {
    const logoUrl = getLogoUrl(subscription.website || subscription.name);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-2xl p-5 relative group overflow-hidden flex flex-col justify-between gap-4"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                        <SubscriptionLogo
                            name={subscription.name}
                            website={subscription.website}
                            className="w-12 h-12 rounded-xl text-lg"
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-white leading-tight">{subscription.name}</h3>
                        <p className="text-sm text-white/50">{subscription.cycle}</p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-xl font-bold text-white">
                        {subscription.currency === 'GHS' ? '₵' : subscription.currency === 'EUR' ? '€' : '$'}
                        {subscription.price}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-white/40 justify-end mt-1">
                        <Calendar size={10} />
                        <span>{new Date(subscription.startDate).getDate()}{getOrdinalSuffix(new Date(subscription.startDate).getDate())}</span>
                    </div>
                </div>
            </div>

            {/* Actions (Layout Flow) */}
            <div className="relative z-10 flex justify-end gap-2 pt-2 border-t border-white/5 mt-auto">
                <button
                    onClick={() => onEdit(subscription)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md flex items-center gap-2 text-xs font-medium"
                >
                    <Edit2 size={14} />
                    <span>Edit</span>
                </button>
                <button
                    onClick={() => onDelete(subscription.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors backdrop-blur-md flex items-center gap-2 text-xs font-medium"
                >
                    <Trash2 size={14} />
                    <span>Delete</span>
                </button>
            </div>
        </motion.div>
    );
}
