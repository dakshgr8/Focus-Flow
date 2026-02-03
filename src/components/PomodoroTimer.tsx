"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export function PomodoroTimer({ className }: { className?: string }) {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');
    const { toggleZenMode, isZenMode, addFocusTime } = useStore();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            if (mode === 'focus') {
                addFocusTime(25); // Add 25 minutes
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode, addFocusTime]);

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const switchMode = () => {
        const newMode = mode === 'focus' ? 'break' : 'focus';
        setMode(newMode);
        setIsRunning(false);
        setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={cn("bg-card border rounded-xl p-4 shadow-lg flex flex-col items-center gap-3", className)}>
            <div className="flex items-center gap-2">
                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", mode === 'focus' ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300")}>
                    {mode === 'focus' ? 'Focus Time' : 'Sweet Break'}
                </span>
                <button onClick={switchMode} className="text-xs text-muted-foreground hover:underline">Switch</button>
            </div>

            <div className="text-4xl font-mono font-bold tracking-widest">
                {formatTime(timeLeft)}
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={resetTimer}>
                    <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    className={cn("h-10 w-10 rounded-full", isRunning ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700")}
                    onClick={toggleTimer}
                >
                    {isRunning ? <Pause className="h-4 w-4 fill-white text-white" /> : <Play className="h-4 w-4 fill-white text-white ml-0.5" />}
                </Button>
                <Button variant="outline" size="icon" onClick={toggleZenMode} className={cn(isZenMode && "text-indigo-500 border-indigo-500")}>
                    <MonitorPlay className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
