"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            // Functional Mock Auth
            login({ name: email.split('@')[0], email });
            router.push('/');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 pointer-events-none" />

            <Card className="w-full max-w-md backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 shadow-xl z-10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">Welcome Back</CardTitle>
                    <CardDescription>
                        Enter your email to sign in to your command center
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                id="email"
                                placeholder="Email"
                                type="email"
                                className="bg-white/50 dark:bg-slate-800/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                className="bg-white/50 dark:bg-slate-800/50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-indigo-900">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center text-slate-500 dark:text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-indigo-600 hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
