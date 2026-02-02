'use client';

import { useState } from 'react';
import { getLogoUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface SubscriptionLogoProps {
    name: string;
    website?: string;
    className?: string;
}

export function SubscriptionLogo({ name, website, className }: SubscriptionLogoProps) {
    const [error, setError] = useState(false);
    const logoUrl = getLogoUrl(website || name);
    const firstLetter = name.charAt(0).toUpperCase();

    // Generate a consistent gradient based on the name character code
    // This ensures the same subscription always gets the same gradient fallback
    const charCode = name.charCodeAt(0);
    const gradients = [
        'from-blue-500/20 to-purple-500/20 text-blue-200',
        'from-emerald-500/20 to-teal-500/20 text-emerald-200',
        'from-orange-500/20 to-red-500/20 text-orange-200',
        'from-pink-500/20 to-rose-500/20 text-pink-200',
        'from-indigo-500/20 to-cyan-500/20 text-indigo-200',
        'from-yellow-500/20 to-amber-500/20 text-yellow-200',
    ];
    const gradientClass = gradients[charCode % gradients.length];

    if (error) {
        return (
            <div className={cn("flex items-center justify-center bg-gradient-to-br font-bold rounded-lg shadow-inner", gradientClass, className)}>
                {firstLetter}
            </div>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={logoUrl}
            alt={name}
            className={cn("object-cover rounded-lg bg-white/5", className)}
            onError={() => setError(true)}
        />
    );
}
