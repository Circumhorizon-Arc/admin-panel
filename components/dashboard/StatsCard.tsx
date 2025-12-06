import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: "saffron" | "green" | "blue" | "red";
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp, color = "blue" }: StatsCardProps) {
    const colorStyles = {
        saffron: "bg-[var(--color-saffron-50)] text-[var(--color-saffron-600)]",
        green: "bg-[var(--color-india-green-50)] text-[var(--color-india-green-600)]",
        blue: "bg-[var(--color-navy-blue-50)] text-[var(--color-navy-blue)]",
        red: "bg-red-50 text-red-600",
    };

    return (
        <div className="rounded-xl bg-white p-6 card-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={cn("rounded-lg p-3", colorStyles[color])}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={cn("font-medium", trendUp ? "text-green-600" : "text-red-600")}>
                        {trend}
                    </span>
                    <span className="ml-2 text-gray-500">from last month</span>
                </div>
            )}
        </div>
    );
}
