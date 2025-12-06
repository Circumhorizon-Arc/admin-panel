"use client";

import { Users, Utensils, Truck, IndianRupee } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { useApp } from "@/lib/context";

export default function DashboardPage() {
    const { user, customers, orders, payments } = useApp();

    // Compute Stats dynamically
    const totalSubscribers = customers.length;
    const todayDate = new Date().toISOString().split('T')[0]; // Use today's date or keep fixed if using dummy data. For now, let's look for "2025-12-05" as per dummy data to show something.
    const displayDate = "2025-12-05";
    const tiffinsToday = orders.filter(o => o.date === displayDate).length;
    const pendingDeliveries = orders.filter(o => o.status === "Pending").length;
    const monthlyRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name || "Admin"}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Active Subscribers"
                    value={totalSubscribers}
                    icon={Users}
                    color="blue"
                    trend="+12%"
                    trendUp={true}
                />
                <StatsCard
                    title="Tiffins Delivered Today"
                    value={tiffinsToday}
                    icon={Utensils}
                    color="saffron"
                />
                <StatsCard
                    title="Pending Deliveries"
                    value={pendingDeliveries}
                    icon={Truck}
                    color="red"
                />
                <StatsCard
                    title="Monthly Revenue"
                    value={`₹${monthlyRevenue.toLocaleString('en-IN')}`}
                    icon={IndianRupee}
                    color="green"
                    trend="+8%"
                    trendUp={true}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                <div className="col-span-4">
                    <RevenueChart />
                </div>
                <div className="col-span-3">
                    <div className="h-full rounded-xl bg-white p-6 card-shadow">
                        <h3 className="mb-4 text-lg font-bold text-gray-900">Today's Routes</h3>
                        <div className="space-y-4">
                            {Array.from(new Set(orders.map(o => o.route))).slice(0, 4).map((route, i) => (
                                <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                            <Truck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{route}</p>
                                            <p className="text-xs text-gray-500">Delivery Boy: Assigned</p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                        Active
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white p-6 card-shadow">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Deliveries</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">Order ID</th>
                                <th className="px-4 py-3 font-medium">Customer</th>
                                <th className="px-4 py-3 font-medium">Route</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Meal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                                    <td className="px-4 py-3">{order.customerName}</td>
                                    <td className="px-4 py-3 text-gray-500">{order.route}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">{order.meal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
