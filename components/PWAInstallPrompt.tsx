'use client';

import { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { Share, Plus, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [showIOSModal, setShowIOSModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if standalone
        const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
        setIsStandalone(isStandaloneMode);

        // Check if iOS (including iPadOS which asks for desktop site by default)
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent) ||
            (userAgent.includes('mac') && 'ontouchend' in document);
        setIsIOS(isIosDevice);

        // If iOS and not standalone, show prompt
        if (isIosDevice && !isStandaloneMode) {
            // Check session storage to see if dismissed recently to avoid annoyance
            const isDismissed = sessionStorage.getItem('pwa-prompt-dismissed');
            if (!isDismissed) {
                setIsVisible(true);
            }
        }

        // Debug mode: ?pwa_debug=true forces the prompt to show
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('pwa_debug') === 'true') {
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: any) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);

            // Check session storage
            const isDismissed = sessionStorage.getItem('pwa-prompt-dismissed');
            if (!isDismissed) {
                setIsVisible(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setIsVisible(false);
            }
        } else if (isIOS) {
            setShowIOSModal(true);
        } else {
            // Fallback/Debug behavior
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('pwa_debug') === 'true') {
                alert('Debug Mode: This button triggers the native install prompt usually. On Android (via LAN), this requires HTTPS.');
            }
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('pwa-prompt-dismissed', 'true');
    };

    // Don't render anything if standalone or dismissed (unless modal is open)
    if ((!isVisible || isStandalone) && !showIOSModal) return null;

    return (
        <>
            {/* Bottom Banner Trigger */}
            <AnimatePresence>
                {isVisible && !isStandalone && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
                    >
                        <div className="glass-panel bg-[#171717]/90 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Download size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-white text-sm">Install App</h3>
                                    <p className="text-white/60 text-xs">Add to home screen</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleDismiss}
                                    className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                                >
                                    <X size={18} />
                                </button>
                                <button
                                    onClick={handleInstallClick}
                                    className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors shadow-lg shadow-white/5"
                                >
                                    Install
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* iOS Instruction Modal */}
            <Modal
                isOpen={showIOSModal}
                onClose={() => setShowIOSModal(false)}
                title="Install on iOS"
            >
                <div className="space-y-6">
                    <p className="text-white/70 text-sm">
                        Install this application on your home screen for a better experience.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-white/90 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-10 h-10 flex items-center justify-center bg-[#007AFF]/20 text-[#007AFF] rounded-lg shrink-0">
                                <Share size={20} />
                            </div>
                            <div className="text-sm">
                                1. Tap the <span className="font-semibold text-white">Share</span> button in your browser menu.
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-white/90 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg shrink-0">
                                <Plus size={20} />
                            </div>
                            <div className="text-sm">
                                2. Scroll down and select <span className="font-semibold text-white">Add to Home Screen</span>.
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowIOSModal(false)}
                        className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors"
                    >
                        Got it
                    </button>
                </div>
            </Modal>
        </>
    );
}
