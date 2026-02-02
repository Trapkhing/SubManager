'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Subscription, BillingCycle, Currency } from '@/types';
import { getLogoUrl } from '@/lib/utils';
import { Save } from 'lucide-react';

interface AddSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (sub: Omit<Subscription, 'id'>) => void;
    editingSubscription?: Subscription | null;
}

export function AddSubscriptionModal({ isOpen, onClose, onSave, editingSubscription }: AddSubscriptionModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState<Currency>('GHS');
    const [cycle, setCycle] = useState<BillingCycle>('monthly');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [website, setWebsite] = useState('');

    useEffect(() => {
        if (editingSubscription) {
            setName(editingSubscription.name);
            setPrice(editingSubscription.price.toString());
            setCurrency(editingSubscription.currency);
            setCycle(editingSubscription.cycle);
            setStartDate(editingSubscription.startDate.split('T')[0]);
            setWebsite(editingSubscription.website || '');
        } else {
            // Reset form
            setName('');
            setPrice('');
            setCurrency('GHS');
            setCycle('monthly');
            setStartDate(new Date().toISOString().split('T')[0]);
            setWebsite('');
        }
    }, [editingSubscription, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name,
            price: parseFloat(price),
            currency,
            cycle,
            startDate: new Date(startDate).toISOString(),
            website,
            active: true
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={editingSubscription ? 'Edit Subscription' : 'New Subscription'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-white/60 mb-1">Service Name</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Netflix"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-white/60 mb-1">Price</label>
                        <input
                            type="number"
                            required
                            step="0.01"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors"
                        />
                    </div>
                    <div>
                        <Select
                            label="Currency"
                            value={currency}
                            onChange={(val) => setCurrency(val as Currency)}
                            options={[
                                { label: "GHS (₵)", value: "GHS" },
                                { label: "USD ($)", value: "USD" },
                                { label: "EUR (€)", value: "EUR" }
                            ]}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Select
                            label="Billing Cycle"
                            value={cycle}
                            onChange={(val) => setCycle(val as BillingCycle)}
                            options={[
                                { label: "Monthly", value: "monthly" },
                                { label: "Yearly", value: "yearly" },
                                { label: "Weekly", value: "weekly" }
                            ]}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-white/60 mb-1">First Bill Date</label>
                        <input
                            type="date"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-white/60 mb-1">Website (Optional for Logo)</label>
                    <input
                        type="text"
                        placeholder="e.g. netflix.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                    <Save size={18} />
                    Save Subscription
                </button>
            </form>
        </Modal>
    );
}
