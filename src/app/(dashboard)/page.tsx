"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { useStore } from "@/lib/store";
import { CheckCircle2, Circle } from "lucide-react";

export default function DashboardPage() {
    const { user, isAuthenticated, timeBlocks, goals, totalFocusTime } = useStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    // Dynamic Logic
    const tasksCompleted = goals.reduce((acc, goal) => {
        return acc + (goal.progress === 100 ? 1 : 0);
    }, 0);

    const assignmentsDue = timeBlocks.filter(b => b.type === 'study' && b.status === 'upcoming').length;
    const upcomingDeadlines = timeBlocks.filter(b => b.status === 'upcoming').length;

    // Calculate hours from totalFocusTime (minutes)
    const hoursFocused = (totalFocusTime / 60).toFixed(1);

    const todaysTasks = timeBlocks
        .filter(b => b.day === 'Mon' || b.day === new Date().toLocaleDateString('en-US', { weekday: 'short' })) // Simple Day Match
        .slice(0, 3); // Top 3

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name || 'Student'}. Here's your overview.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Hours Focused</h3>
                    <div className="text-2xl font-bold mt-2">{hoursFocused}h</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow p-6 min-h-[400px]">
                    <h3 className="font-semibold mb-4">Weekly Activity</h3>
                    <div className="h-[300px] w-full mt-4">
                        <AnalyticsChart />
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow p-6 min-h-[400px]">
                    <h3 className="font-semibold mb-4">Today's Schedule</h3>
                    <div className="space-y-4">
                        {todaysTasks.length > 0 ? todaysTasks.map((block) => (
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
                            <p className="text-muted-foreground text-sm">No tasks scheduled for today.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
