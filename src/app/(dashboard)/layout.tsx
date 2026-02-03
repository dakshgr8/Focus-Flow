import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
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
            <MobileNav />
            <main className="pl-0 md:pl-64 min-h-screen relative z-10 transition-all duration-300 flex flex-col pt-16 md:pt-0">
                <div className="hidden md:block">
                    <DashboardHeader />
                </div>
                <div className="container mx-auto p-4 md:p-8 pt-6 max-w-7xl space-y-8 flex-1">
                    {children}
                </div>
                <div id="pomodoro-timer" className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6 origin-bottom-right scale-90 md:scale-100">
                    <PomodoroTimer className="shadow-2xl border-indigo-200 dark:border-indigo-900 bg-white/90 dark:bg-slate-900/90 backdrop-blur" />
                </div>

            </main>
            <ZenModeOverlay />
        </div>
    );
}
