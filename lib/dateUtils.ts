import { Subscription, BillingCycle } from '@/types';

export function getNextPaymentDate(startDate: string, cycle: BillingCycle, endDate?: string): Date {
    const start = new Date(startDate);
    const today = new Date();
    // Reset time components for accurate date comparison
    today.setHours(0, 0, 0, 0);

    let nextDate = new Date(start);

    // If start date is in the future, that's the first payment
    if (nextDate > today) {
        return nextDate;
    }

    // Calculate next occurrence
    while (nextDate < today) {
        if (cycle === 'monthly') {
            nextDate.setMonth(nextDate.getMonth() + 1);
        } else if (cycle === 'yearly') {
            nextDate.setFullYear(nextDate.getFullYear() + 1);
        } else if (cycle === 'weekly') {
            nextDate.setDate(nextDate.getDate() + 7);
        }
    }

    // Check if subscription has ended
    if (endDate && new Date(endDate) < nextDate) {
        // Return a past date to indicate it's ended/invalid for upcoming
        return new Date(0);
    }

    return nextDate;
}

export function getDaysRemaining(targetDate: Date): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function sortSubscriptionsByDate(subscriptions: Subscription[]) {
    return subscriptions
        .filter(sub => sub.active)
        .map(sub => {
            const nextPayment = getNextPaymentDate(sub.startDate, sub.cycle);
            const daysRemaining = getDaysRemaining(nextPayment);
            return { ...sub, nextPayment, daysRemaining };
        })
        .filter(sub => sub.nextPayment.getTime() !== 0) // Filter out ended subs
        .sort((a, b) => a.nextPayment.getTime() - b.nextPayment.getTime());
}
