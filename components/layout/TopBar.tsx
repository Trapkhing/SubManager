'use client';

import { Search, Bell, Menu } from 'lucide-react';
import { Plus } from 'lucide-react';

interface TopBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onAddClick: () => void;
    onMenuClick?: () => void;
}

export function TopBar({ searchQuery, setSearchQuery, onAddClick, onMenuClick }: TopBarProps) {
    return (
        <div className="sticky top-0 z-30 flex items-center justify-between p-6 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">

            {/* Search Bar */}
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <button
                    className="md:hidden text-white/60 p-2 hover:text-white transition-colors"
                    onClick={onMenuClick}
                >
                    <Menu size={24} />
                </button>
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search subscriptions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/30 focus:bg-white/10 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 ml-4">
                <button
                    onClick={onAddClick}
                    className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm"
                >
                    <Plus size={18} />
                    <span>New Subscription</span>
                </button>

                {/* Mobile Add Button */}
                <button
                    onClick={onAddClick}
                    className="md:hidden p-2 bg-blue-600 rounded-full text-white"
                >
                    <Plus size={20} />
                </button>
            </div>
        </div>
    );
}
