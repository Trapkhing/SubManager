import Link from 'next/link'
import { FileQuestion, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <FileQuestion size={48} className="text-white/20" />
            </div>
            <h2 className="text-4xl font-bold mb-3">Page Not Found</h2>
            <p className="text-white/40 mb-8 max-w-md">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
                <ArrowLeft size={20} />
                Return Home
            </Link>
        </div>
    )
}
