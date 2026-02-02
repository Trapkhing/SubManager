'use client';

import { useState, useRef } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { Subscription } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Upload, Database, AlertTriangle, FileJson, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Settings() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Import/Export State
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingImport, setPendingImport] = useState<Subscription[] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { subscriptions, replaceSubscriptions } = useSubscriptions();

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleExport = () => {
        try {
            const dataStr = JSON.stringify(subscriptions, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `submanager-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showNotification('success', 'Backup downloaded successfully.');
        } catch (error) {
            showNotification('error', 'Failed to export data.');
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const result = event.target?.result as string;
                const data = JSON.parse(result);

                // Basic validation
                if (Array.isArray(data)) {
                    setPendingImport(data);
                    setIsConfirmOpen(true);
                } else {
                    showNotification('error', 'Invalid backup file format. Expected a list of subscriptions.');
                }
            } catch (err) {
                showNotification('error', 'Failed to parse JSON file.');
            }

            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        };
        reader.readAsText(file);
    };

    const confirmImport = () => {
        if (pendingImport) {
            replaceSubscriptions(pendingImport);
            showNotification('success', 'Data restored successfully.');
            setPendingImport(null);
            setIsConfirmOpen(false);
        }
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
                    onAddClick={() => { }}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />

                <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8">
                    <header>
                        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                        <p className="text-white/40">Manage your application preferences and data.</p>
                    </header>

                    {/* Notification Banner */}
                    <AnimatePresence>
                        {notification && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`p-4 rounded-xl flex items-center gap-3 ${notification.type === 'success'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    }`}
                            >
                                {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                <p className="font-medium">{notification.message}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Data Management Section */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Database className="text-blue-400" size={20} />
                            <h2 className="text-xl font-semibold text-white/80">Data Management</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Export Card */}
                            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors">
                                <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4 text-blue-400">
                                    <Download size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Export Data</h3>
                                <p className="text-sm text-white/40 mb-6">
                                    Download a JSON backup of all your subscriptions. Useful for moving to another device.
                                </p>
                                <button
                                    onClick={handleExport}
                                    className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FileJson size={18} />
                                    Download Backup
                                </button>
                            </div>

                            {/* Import Card */}
                            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors">
                                <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4 text-purple-400">
                                    <Upload size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Import Data</h3>
                                <p className="text-sm text-white/40 mb-6">
                                    Restore subscriptions from a backup file. <span className="text-red-400">This will overwrite current data.</span>
                                </p>
                                <button
                                    onClick={handleImportClick}
                                    className="w-full bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2 border border-white/10"
                                >
                                    <Database size={18} />
                                    Restore Backup
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".json"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => {
                    setIsConfirmOpen(false);
                    setPendingImport(null);
                }}
                onConfirm={confirmImport}
                title="Overwrite Data?"
                message="This will replace all your current subscriptions with the data from the backup file. This action cannot be undone."
                confirmLabel="Yes, Overwrite"
                isDestructive
            />
        </div>
    );
}
