'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 text-center">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle size={48} className="text-red-400" />
            </div>
            <h2 className="text-4xl font-bold mb-3">Something went wrong!</h2>
            <p className="text-white/40 mb-8 max-w-md">
                An unexpected error occurred. Please try again.
            </p>
            <button
                onClick={() => reset()}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
                <RefreshCcw size={20} />
                Try again
            </button>
        </div>
    )
}
