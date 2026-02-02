import { useLocalStorage } from './useLocalStorage';
import { Subscription } from '@/types';

export function useSubscriptions() {
    const [subscriptions, setSubscriptions] = useLocalStorage<Subscription[]>('subscriptions', []);

    const addSubscription = (sub: Omit<Subscription, 'id'>) => {
        const newSub = { ...sub, id: crypto.randomUUID() };
        setSubscriptions([...subscriptions, newSub]);
    };

    const removeSubscription = (id: string) => {
        setSubscriptions(subscriptions.filter((s) => s.id !== id));
    };

    const updateSubscription = (id: string, updates: Partial<Subscription>) => {
        setSubscriptions(
            subscriptions.map((s) => (s.id === id ? { ...s, ...updates } : s))
        );
    };

    const replaceSubscriptions = (subs: Subscription[]) => {
        setSubscriptions(subs);
    };

    const getStats = () => {
        const totalMonthly = subscriptions
            .filter(s => s.active)
            .reduce((acc, sub) => {
                let monthlyPrice = sub.price;
                if (sub.cycle === 'yearly') monthlyPrice = sub.price / 12;
                if (sub.cycle === 'weekly') monthlyPrice = sub.price * 4;
                return acc + monthlyPrice;
            }, 0);

        const totalYearly = totalMonthly * 12;

        return { totalMonthly, totalYearly, activeCount: subscriptions.length };
    };

    return {
        subscriptions,
        addSubscription,
        removeSubscription,
        updateSubscription,
        replaceSubscriptions,
        stats: getStats()
    };
}
