"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export default function SignupPage() {
    const router = useRouter();
    const { login } = useStore();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
            // Functional Mock Auth
            login({ name, email });
            router.push('/');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 pointer-events-none" />

            <Card className="w-full max-w-md backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 shadow-xl z-10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">Create Account</CardTitle>
                    <CardDescription>
                        Join to boost your productivity today
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                id="name"
                                placeholder="Full Name"
                                type="text"
                                className="bg-white/50 dark:bg-slate-800/50"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 dark:shadow-emerald-900">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center text-slate-500 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-emerald-600 hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
