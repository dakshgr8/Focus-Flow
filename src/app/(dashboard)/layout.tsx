import { Sidebar } from "@/components/Sidebar";
import { ZenModeOverlay } from "@/components/ZenModeOverlay";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 pointer-events-none fixed" />
            <Sidebar />
            <main className="pl-0 md:pl-64 min-h-screen relative z-10 transition-all duration-300 flex flex-col">
                <DashboardHeader />
                <div className="container mx-auto p-4 md:p-8 pt-6 max-w-7xl space-y-8 flex-1">
                    {children}
                </div>
                <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
                    <PomodoroTimer className="shadow-2xl border-indigo-200 dark:border-indigo-900 bg-white/90 dark:bg-slate-900/90 backdrop-blur" />
                </div>
                <div className="fixed bottom-20 right-4 z-40 lg:hidden text-xs">
                    {/* Mobile Pomodoro Trigger could go here, for now integrated in specific pages or hidden */}
                </div>
            </main>
            <ZenModeOverlay />
        </div>
    );
}
