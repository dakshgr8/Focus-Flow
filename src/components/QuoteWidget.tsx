"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const quotes = [
    "The secret of getting ahead is getting started.",
    "It always seems impossible until it is done.",
    "Don't watch the clock; do what it does. Keep going.",
    "Believe you can and you're halfway there.",
    "Quality is not an act, it is a habit.",
    "Your future is created by what you do today, not tomorrow.",
    "Focus on being productive instead of busy.",
    "Small steps in the right direction can turn out to be the biggest step of your life."
];

export function QuoteWidget() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        // Pick a random quote on mount
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <div className="rounded-xl border bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-900/30 p-6 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-white/50 dark:bg-white/10 rounded-full shrink-0">
                <Quote className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
                <p className="text-sm font-medium italic text-muted-foreground leading-relaxed">
                    "{quote}"
                </p>
                <p className="text-xs text-indigo-500 font-semibold mt-2">Daily Inspiration</p>
            </div>
        </div>
    );
}
