import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[var(--background)] mobile-safe-area-bg">
            <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 safe-area-padding">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                </div>
            </header>

            <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="space-y-6 text-white/60">
                    <p>Last Updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        SubManager ("we", "our", or "us") is committed to protecting your privacy.
                        This Privacy Policy explains how your information is handled when you use our application.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Data Storage</h2>
                    <p>
                        SubManager operates as a local-first application. All your subscription data, preferences, and settings
                        are stored exclusively on your device using your browser's Local Storage. We do not transmit,
                        store, or process your personal data on any external servers.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Data Collection</h2>
                    <p>
                        Since we do not have a backend server, we do not collect, analyze, or sell your personal information.
                        You retain full ownership and control over your data.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Data Backup</h2>
                    <p>
                        The application provides an "Export Data" feature in the Settings. This allows you to generate a JSON
                        file of your data. You are responsible for the security of this backup file once downloaded.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Since we do not collect user emails,
                        we recommend reviewing this page periodically for any changes.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us.
                    </p>
                </div>
            </main>
        </div>
    );
}
