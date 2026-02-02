'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function Select({ label, value, options, onChange, placeholder = "Select...", className }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            {label && <label className="block text-sm text-white/60 mb-1">{label}</label>}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white transition-all text-left",
                    "focus:outline-none focus:border-blue-500/50",
                    isOpen && "bg-white/10 border-blue-500/50"
                )}
            >
                <span className={!selectedOption ? "text-white/40" : ""}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    size={16}
                    className={cn("text-white/40 transition-transform duration-200", isOpen && "rotate-180")}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full mt-2 overflow-hidden bg-[#121212] border border-white/10 rounded-xl shadow-2xl ring-1 ring-black/5"
                    >
                        <div className="max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-white/10">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left",
                                        option.value === value
                                            ? "bg-blue-600/10 text-blue-400 font-medium"
                                            : "text-white/80 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <span>{option.label}</span>
                                    {option.value === value && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
