"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { QuoteWidget } from "@/components/QuoteWidget";
import { FocusAudio } from "@/components/FocusAudio";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { useStore } from "@/lib/store";
import { CheckCircle2, Circle } from "lucide-react";

export default function DashboardPage() {
    const { user, isAuthenticated, timeBlocks, goals, totalFocusTime } = useStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
        // Simulate data fetching
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    // Dynamic Logic
    const tasksCompleted = goals.reduce((acc, goal) => {
        return acc + (goal.progress === 100 ? 1 : 0);
    }, 0);

    const assignmentsDue = timeBlocks.filter(b => b.type === 'study' && b.status === 'upcoming').length;
    const upcomingDeadlines = timeBlocks.filter(b => b.status === 'upcoming').length;
    const hoursFocused = (totalFocusTime / 60).toFixed(1);

    const todaysTasks = timeBlocks
        .filter(b => b.day === 'Mon' || b.day === new Date().toLocaleDateString('en-US', { weekday: 'short' }))
        .slice(0, 3);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
                <p className="text-muted-foreground">
                    {isLoading ? (
                        <Skeleton className="h-4 w-48" />
                    ) : (
                        `Welcome back, ${user?.name || 'Student'}. Here's your overview.`
                    )}
                </p>
            </div>

            <QuoteWidget />

            {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="rounded-xl border bg-card text-card-foreground shadow p-6">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Hours Focused</h3>
                        <div className="text-2xl font-bold mt-2">{hoursFocused}h</div>
                    </div>
                    <div id="goal-tracker" className="rounded-xl border bg-card text-card-foreground shadow p-6">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Goals Completed</h3>
                        <div className="text-2xl font-bold mt-2">{tasksCompleted}/{goals.length}</div>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Upcoming Blocks</h3>
                        <div className="text-2xl font-bold mt-2">{upcomingDeadlines}</div>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Study Sessions</h3>
                        <div className="text-2xl font-bold mt-2">{assignmentsDue}</div>
                    </div>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow p-6 min-h-[400px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Weekly Activity</h3>
                    </div>
                    {isLoading ? (
                        <Skeleton className="h-[300px] w-full mt-4" />
                    ) : (
                        <div className="w-full mt-4 flex flex-col gap-8">
                            <div className="h-[200px] w-full">
                                <AnalyticsChart />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-4">Yearly Focus Map</h4>
                                <ActivityHeatmap />
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-3 space-y-6">
                    <FocusAudio />

                    <div className="rounded-xl border bg-card text-card-foreground shadow p-6 min-h-[300px]">
                        <h3 className="font-semibold mb-4">Today's Schedule</h3>
                        <div className="space-y-4">
                            {isLoading ? (
                                [...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))
                            ) : (
                                todaysTasks.length > 0 ? todaysTasks.map((block) => (
                                    <div key={block.id} className="flex items-center gap-4 rounded-lg border p-3">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{block.title}</p>
                                            <p className="text-xs text-muted-foreground">{block.startTime} - {block.endTime}</p>
                                        </div>
                                        <div className={`px-2 py-1 rounded text-xs ${block.status === 'done' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                                            {block.status}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="flex flex-col items-center justify-center h-[200px] text-center p-4">
                                        <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
                                            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <p className="font-medium">All caught up!</p>
                                        <p className="text-sm text-muted-foreground mt-1">No tasks scheduled for the rest of today.</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
