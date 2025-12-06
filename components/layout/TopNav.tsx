"use client";

import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { useApp } from "@/lib/context";

export function TopNav() {
    const { user, logout } = useApp();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 relative z-10">
            <div className="flex items-center gap-4">
                {/* Search bar removed as per request */}
            </div>
            <div className="flex items-center gap-4">
                {/* Notification Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative rounded-full p-2 hover:bg-gray-100 text-gray-600"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-gray-100 bg-white p-4 shadow-lg z-50">
                            <div className="mb-2 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                <a href="/notifications" className="text-xs text-[var(--color-saffron-600)] hover:underline">View All</a>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">New Order Received</p>
                                        <p className="text-xs text-gray-500">From Rahul Sharma</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-green-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Payment Successful</p>
                                        <p className="text-xs text-gray-500">₹3000 received</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-3 border-l border-gray-200 pl-4 hover:opacity-80"
                    >
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-gray-900">{user?.name || "Admin User"}</span>
                            <span className="text-xs text-gray-500">{user?.role || "Super Admin"}</span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-[var(--color-navy-blue)] flex items-center justify-center text-white">
                            <User className="h-4 w-4" />
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-1 shadow-lg">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                            <a href="/profile" className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <User className="h-4 w-4" /> Profile
                            </a>
                            <button
                                onClick={() => {
                                    logout();
                                    window.location.href = "/login";
                                }}
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <User className="h-4 w-4" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
