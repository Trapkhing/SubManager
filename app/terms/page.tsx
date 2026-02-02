import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

                <div className="space-y-6 text-white/60">
                    <p>Last Updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        Please read these Terms of Service ("Terms") carefully before using SubManager.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using SubManager, you agree to be bound by these Terms. If you disagree with any part
                        of the terms, you may not use the application.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Use License</h2>
                    <p>
                        SubManager is a free utility tool. You are granted a limited, non-exclusive, non-transferable license
                        to use the application for personal, non-commercial purposes.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Disclaimer</h2>
                    <p>
                        The application is provided "as is". SubManager makes no warranties, expressed or implied, and hereby
                        disclaims and negates all other warranties, including without limitation, implied warranties or
                        conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Limitations</h2>
                    <p>
                        In no event shall SubManager be liable for any damages (including, without limitation, damages for loss
                        of data or profit) arising out of the use or inability to use the application.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of the applicable jurisdiction
                        and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                    </p>
                </div>
            </main>
        </div>
    );
}
