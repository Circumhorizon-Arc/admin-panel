"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle, XCircle, Clock } from "lucide-react";
import { useApp } from "@/lib/context";

export default function OrdersPage() {
    const { orders, updateOrderStatus } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [routeFilter, setRouteFilter] = useState("All Routes");

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All Status" || order.status === statusFilter;
        // Simplified route filtering - in real app would get unique routes list
        const matchesRoute = routeFilter === "All Routes" || order.route === routeFilter;
        return matchesSearch && matchesStatus && matchesRoute;
    });

    const uniqueRoutes = ["All Routes", ...Array.from(new Set(orders.map(o => o.route)))];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-sm text-gray-500">Track deliveries history</p>
                </div>
                <div className="flex gap-2">
                    {/* Placeholder for Date Filter if needed later */}
                </div>
            </div>

            <div className="rounded-xl bg-white p-4 card-shadow">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search order ID, customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[var(--color-saffron)]"
                        />
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={routeFilter}
                            onChange={(e) => setRouteFilter(e.target.value)}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                        >
                            {uniqueRoutes.map(route => (
                                <option key={route} value={route}>{route}</option>
                            ))}
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                        >
                            <option>All Status</option>
                            <option>Pending</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">Order ID</th>
                                <th className="px-4 py-3 font-medium">Customer</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Route</th>
                                <th className="px-4 py-3 font-medium">Delivery Boy</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                                        <td className="px-4 py-3">{order.customerName}</td>
                                        <td className="px-4 py-3 text-gray-500">{order.date}</td>
                                        <td className="px-4 py-3 text-gray-500">{order.route}</td>
                                        <td className="px-4 py-3">{order.deliveryBoy}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                {order.status === 'Delivered' && <CheckCircle className="h-3 w-3" />}
                                                {order.status === 'Pending' && <Clock className="h-3 w-3" />}
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {order.status !== 'Delivered' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, "Delivered")}
                                                    className="text-xs font-medium text-green-600 hover:text-green-700"
                                                >
                                                    Mark Delivered
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
