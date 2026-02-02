import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getLogoUrl(name: string): string {
    // Simple heuristic: remove spaces, lowercase, append .com
    // In a real app, we might want a mapping or a search API.
    const cleanName = name.trim().toLowerCase().replace(/\s+/g, '');
    const domain = cleanName.includes('.') ? cleanName : `${cleanName}.com`;

    // Use logo.dev with environment variable
    const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;
    if (!token) {
        // Fallback to Clearbit if no token (or handle error)
        // For now, let's just return the logo.dev url with empty token which might fail, 
        // effectively triggering the onError in SubscriptionLogo component
        console.warn('Missing NEXT_PUBLIC_LOGO_DEV_TOKEN');
        return `https://img.logo.dev/${domain}`;
    }
    return `https://img.logo.dev/${domain}?token=${token}`;
}

export function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}
