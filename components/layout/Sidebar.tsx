'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PieChart, Settings, CreditCard, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Logo } from '@/components/ui/Logo';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: CreditCard, label: 'Upcoming', href: '/upcoming' },
    { icon: PieChart, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl z-50 transition-transform duration-300 md:translate-x-0 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6">
                    <div className="mb-8 flex items-center justify-between">
                        <Logo />
                        {/* Close button for mobile could go here, but overlay click is usually enough */}
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={onClose} // Close sidebar on navigation on mobile
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                                        isActive
                                            ? "bg-blue-600/10 text-blue-400"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon size={20} className={cn(isActive ? "text-blue-400" : "group-hover:text-white transition-colors")} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-white/5 space-y-4">
                    {/* Logout removed as per user request */}
                </div>
            </aside>
        </>
    );
}
