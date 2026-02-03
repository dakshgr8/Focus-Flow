"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CalendarDays,
    Target,
    Flame,
    Menu,
    X,
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

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { logout } = useStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/80 backdrop-blur-md px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500">
                        <Flame className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600">
                        FocusFlow
                    </span>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-background pt-20 px-6 animate-in slide-in-from-top-10 duration-200">
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-secondary text-secondary-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", pathname === item.href && "text-indigo-500")} />
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 border-t pt-8 space-y-4">
                        <div className="px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50">
                            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Contact Developer</p>
                            <p className="text-xs text-muted-foreground font-medium">Mr. Daksh Tiwari</p>
                            <p className="text-xs text-muted-foreground">9137128108</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-4 text-lg text-muted-foreground"
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                        >
                            <LogOut className="h-5 w-5" />
                            Log Out
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
