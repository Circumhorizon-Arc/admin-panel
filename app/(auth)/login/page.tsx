"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/context";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useApp();
    const [email, setEmail] = useState("admin@tiffinservice.com");
    const [password, setPassword] = useState("Admin@987");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login delay
        setTimeout(() => {
            login(email);
            setLoading(false);
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-saffron-50)]">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="bg-[var(--color-saffron-600)] p-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white">
                        <ChefHat className="h-8 w-8" />
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-white">Tiffin Service Admin</h1>
                    <p className="text-white/80">Login to manage your business</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[var(--color-saffron-600)] focus:ring-1 focus:ring-[var(--color-saffron-600)]"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <button
                                    type="button"
                                    onClick={() => alert("Password reset link sent to your email!")}
                                    className="text-sm text-[var(--color-saffron-600)] hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[var(--color-saffron-600)] focus:ring-1 focus:ring-[var(--color-saffron-600)]"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-navy-blue)] px-4 py-3 font-semibold text-white transition-colors hover:bg-opacity-90 disabled:opacity-70"
                        >
                            {loading ? "Logging in..." : "Login to Dashboard"}
                            {!loading && <ArrowRight className="h-5 w-5" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        Design & Developed by Antigravity
                    </div>
                </div>
            </div>
        </div>
    );
}
