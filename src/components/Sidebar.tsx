"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CalendarDays,
    Target,
    Flame,
    LogOut
} from "lucide-react";
import { Button } from "./ui/button";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const navItems = [
    {
        title: "Command Center",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Timetable",
        href: "/timetable",
        icon: CalendarDays,
    },
    {
        title: "Goals",
        href: "/goals",
        icon: Target,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { logout } = useStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <aside className="hidden h-screen w-64 flex-col justify-between border-r bg-card/50 backdrop-blur-xl p-4 md:flex fixed left-0 top-0 bottom-0 z-40">
            <div className="space-y-6">
                <div className="flex items-center gap-2 px-2 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500">
                        <Flame className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
                        FocusFlow
                    </span>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                                pathname === item.href
                                    ? "bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-indigo-950/50 dark:to-emerald-950/50 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-500"
                                    : "text-muted-foreground border-l-4 border-transparent"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", pathname === item.href && "text-indigo-500")} />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="space-y-4">
                <div className="px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50">
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Contact Developer</p>
                    <p className="text-xs text-muted-foreground font-medium">Mr. Daksh Tiwari</p>
                    <p className="text-xs text-muted-foreground">9137128108</p>
                </div>
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-base" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Log Out
                </Button>
            </div>
        </aside>
    );
}
