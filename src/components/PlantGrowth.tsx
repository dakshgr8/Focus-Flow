"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PlantGrowthProps {
    progress: number; // 0 to 100
    isWithered: boolean;
    className?: string;
}

export function PlantGrowth({ progress, isWithered, className }: PlantGrowthProps) {

    // Determine Stage
    let stage = 'seed';
    if (progress >= 75) stage = 'tree';
    else if (progress >= 50) stage = 'sapling';
    else if (progress >= 25) stage = 'sprout';

    // If withered, override
    if (isWithered) stage = 'withered';

    return (
        <div className={cn("relative w-32 h-32 flex items-center justify-center", className)}>
            <AnimatePresence mode="wait">
                {stage === 'seed' && (
                    <motion.div
                        key="seed"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute"
                    >
                        <svg width="60" height="60" viewBox="0 0 100 100" className="fill-stone-600 dark:fill-stone-500">
                            <ellipse cx="50" cy="80" rx="40" ry="10" className="fill-stone-300 dark:fill-stone-800" opacity="0.5" />
                            <circle cx="50" cy="70" r="15" />
                        </svg>
                    </motion.div>
                )}

                {stage === 'sprout' && (
                    <motion.div
                        key="sprout"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="absolute"
                    >
                        <svg width="80" height="80" viewBox="0 0 100 100">
                            <ellipse cx="50" cy="90" rx="30" ry="8" className="fill-stone-300 dark:fill-stone-800" opacity="0.5" />
                            <path d="M50 90 Q50 50 30 40" stroke="currentColor" strokeWidth="4" className="text-emerald-600 dark:text-emerald-500" fill="none" />
                            <path d="M30 40 Q20 30 40 30 Q50 35 30 40" className="fill-emerald-500 dark:fill-emerald-400" />

                            <path d="M50 90 Q50 60 70 50" stroke="currentColor" strokeWidth="4" className="text-emerald-600 dark:text-emerald-500" fill="none" />
                            <path d="M70 50 Q80 40 60 40 Q50 45 70 50" className="fill-emerald-500 dark:fill-emerald-400" />
                        </svg>
                    </motion.div>
                )}

                {stage === 'sapling' && (
                    <motion.div
                        key="sapling"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="absolute"
                    >
                        <svg width="90" height="90" viewBox="0 0 100 100">
                            <ellipse cx="50" cy="90" rx="35" ry="8" className="fill-stone-300 dark:fill-stone-800" opacity="0.5" />
                            <rect x="48" y="50" width="4" height="40" className="fill-amber-700" />

                            <circle cx="50" cy="40" r="25" className="fill-emerald-500 dark:fill-emerald-600" />
                            <circle cx="35" cy="50" r="15" className="fill-emerald-400 dark:fill-emerald-500" />
                            <circle cx="65" cy="50" r="15" className="fill-emerald-400 dark:fill-emerald-500" />
                        </svg>
                    </motion.div>
                )}

                {stage === 'tree' && (
                    <motion.div
                        key="tree"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="absolute"
                    >
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <ellipse cx="50" cy="90" rx="40" ry="10" className="fill-stone-300 dark:fill-stone-800" opacity="0.5" />
                            <path d="M50 90 L50 40" stroke="currentColor" strokeWidth="8" className="text-amber-800" />

                            <circle cx="50" cy="35" r="30" className="fill-emerald-600 dark:fill-emerald-500" />
                            <circle cx="25" cy="45" r="20" className="fill-emerald-500 dark:fill-emerald-400" />
                            <circle cx="75" cy="45" r="20" className="fill-emerald-500 dark:fill-emerald-400" />
                            <circle cx="50" cy="20" r="15" className="fill-emerald-400 dark:fill-emerald-300" />

                            {/* Fruits? */}
                            <circle cx="40" cy="30" r="3" className="fill-red-500" />
                            <circle cx="60" cy="40" r="3" className="fill-red-500" />
                            <circle cx="30" cy="50" r="3" className="fill-red-500" />
                        </svg>
                    </motion.div>
                )}

                {stage === 'withered' && (
                    <motion.div
                        key="withered"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, rotate: [0, 5, -5, 0] }}
                        className="absolute"
                    >
                        <svg width="80" height="80" viewBox="0 0 100 100">
                            <ellipse cx="50" cy="90" rx="30" ry="8" className="fill-stone-300 dark:fill-stone-800" opacity="0.5" />
                            <path d="M50 90 Q60 60 55 50" stroke="currentColor" strokeWidth="4" className="text-stone-500" fill="none" />
                            <path d="M55 50 Q45 40 50 60" className="fill-stone-400" />
                            <path d="M55 50 Q65 40 60 60" className="fill-stone-400" />
                        </svg>
                        <p className="text-[10px] text-center text-stone-500 font-mono mt-2">Withered...</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
