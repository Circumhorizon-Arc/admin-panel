"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    UtensilsCrossed,
    Calendar,
    Truck,
    CreditCard,
    MessageSquare,
    Settings,
    LogOut,
    ChefHat
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/context";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Customers", href: "/customers" },
    { icon: ClipboardList, label: "Orders", href: "/orders" },
    { icon: UtensilsCrossed, label: "Menu", href: "/menu" },
    { icon: Calendar, label: "Plans", href: "/plans" },
    { icon: Truck, label: "Delivery Staff", href: "/staff" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: MessageSquare, label: "Feedback", href: "/feedback" },
    { icon: Settings, label: "Settings", href: "/settings" },
];
import { ClipboardList } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();
    const { logout } = useApp();

    return (
        <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
            <div className="flex h-16 items-center border-b border-gray-200 px-6">
                <ChefHat className="h-8 w-8 text-[var(--color-saffron-600)] mr-2" />
                <span className="text-xl font-bold text-[var(--color-navy-blue)]">Tiffin Admin</span>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-[var(--color-saffron-50)] text-[var(--color-saffron-600)]"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-[var(--color-saffron-600)]" : "text-gray-500")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t border-gray-200 p-4">
                <button
                    onClick={() => {
                        logout();
                        window.location.href = "/login"; // Force redirect
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
