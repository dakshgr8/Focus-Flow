"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useStore } from "@/lib/store";

import { TourGuide } from "@/components/TourGuide";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function DashboardHeader() {
    const { user } = useStore();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/50 backdrop-blur-xl px-6">
            <div className="flex h-16 shrink-0 items-center gap-2">
                {/* Branding for mobile could go here */}
            </div>
            <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial" />
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{user?.name || 'Student'}</span>
                    </div>

                    <div id="theme-switcher">
                        <ThemeSwitcher />
                    </div>

                    <TourGuide />

                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <div className="flex items-center gap-2 ml-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-background flex items-center justify-center text-white font-bold text-xs" >
                            {(user?.name?.[0] || 'S').toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
