'use client';

import { useState } from 'react';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { SubscriptionCard } from '@/components/subscriptions/SubscriptionCard';
import { AddSubscriptionModal } from '@/components/subscriptions/AddSubscriptionModal';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Wallet, Zap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Subscription } from '@/types';

export default function Home() {
  const { subscriptions, addSubscription, removeSubscription, updateSubscription, stats } = useSubscriptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean, id: string | null }>({ isOpen: false, id: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEdit = (sub: Subscription) => {
    setEditingSub(sub);
    setIsModalOpen(true);
  };

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

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      removeSubscription(deleteConfirm.id);
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.website?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 relative transition-all duration-300">

        {/* Top Navigation & Search */}
        <TopBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddClick={() => setIsModalOpen(true)}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <main className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto w-full">

          {/* Welcome / Header Mobile */}
          <div className="md:hidden mb-4">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          </div>

          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Monthly Cost"
              value={`₵${stats.totalMonthly.toFixed(2)}`}
              icon={<Wallet className="text-blue-400" />}
              gradient="from-blue-500/10 to-blue-500/5"
            />
            <StatsCard
              title="Yearly Projection"
              value={`₵${stats.totalYearly.toFixed(2)}`}
              icon={<Calendar className="text-purple-400" />}
              gradient="from-purple-500/10 to-purple-500/5"
            />
            <StatsCard
              title="Active Subs"
              value={stats.activeCount.toString()}
              icon={<Zap className="text-yellow-400" />}
              gradient="from-yellow-500/10 to-yellow-500/5"
            />
          </section>

          {/* Filters & Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white/80">Active Subscriptions</h2>
              <span className="text-sm text-white/40">
                {filteredSubscriptions.length} found
              </span>
            </div>

            {filteredSubscriptions.length === 0 ? (
              <div className="text-center py-20 opacity-50 border border-dashed border-white/10 rounded-2xl">
                <p className="text-xl">
                  {searchQuery ? 'No matching subscriptions.' : 'No subscriptions yet.'}
                </p>
                {!searchQuery && (
                  <button onClick={() => setIsModalOpen(true)} className="text-blue-400 hover:underline mt-2">
                    Add your first one
                  </button>
                )}
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredSubscriptions.map((sub) => (
                  <SubscriptionCard
                    key={sub.id}
                    subscription={sub}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </motion.div>
            )}
          </section>

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

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Subscription?"
        message="Are you sure you want to delete this subscription? This action cannot be undone."
        confirmLabel="Delete"
        isDestructive
      />
    </div>
  );
}

function StatsCard({ title, value, icon, gradient }: { title: string, value: string, icon: React.ReactNode, gradient: string }) {
  return (
    <div className={`glass-panel p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/5 rounded-lg backdrop-blur-md">{icon}</div>
          <span className="text-white/50 text-sm font-medium uppercase tracking-wider">{title}</span>
        </div>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
}
