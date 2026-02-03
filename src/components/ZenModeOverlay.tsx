"use client";

import { useStore } from "@/lib/store";
import { PomodoroTimer } from "./PomodoroTimer";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export function ZenModeOverlay() {
    const { isZenMode, toggleZenMode } = useStore();

    if (!isZenMode) return null;

    return (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-8 right-8 text-muted-foreground hover:text-foreground"
                onClick={toggleZenMode}
            >
                <X className="h-6 w-6" />
            </Button>

            <div className="text-center space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Zen Mode</h2>
                    <p className="text-muted-foreground">Focus on the task at hand.</p>
                </div>

                <div className="scale-125">
                    <PomodoroTimer />
                </div>

                <div className="max-w-md mx-auto text-center p-6 border-2 border-dashed rounded-xl opacity-50">
                    <p className="text-xl font-medium italic">"The only way to do great work is to love what you do."</p>
                </div>
            </div>
        </div>
    );
}
