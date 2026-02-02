export type Currency = 'GHS' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'BTC' | 'ETH';

export type BillingCycle = 'monthly' | 'yearly' | 'weekly';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  startDate: string; // ISO Date string
  cycle: BillingCycle;
  website?: string;
  color?: string; // Hex code for UI accent
  category?: string;
  active: boolean;
}

export interface SubscriptionStats {
  totalMonthly: number;
  totalYearly: number;
  activeCount: number;
}
