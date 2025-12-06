"use client";

import { Bell, CheckCircle, Info, AlertTriangle } from "lucide-react";

const NOTIFICATIONS = [
    { id: 1, title: "New Order Received", message: "Rahul Sharma placed a new order for Monthly Gold Plan.", time: "2 hours ago", type: "success" },
    { id: 2, title: "Payment Received", message: "Received ₹3000 from Priya Verma via UPI.", time: "4 hours ago", type: "success" },
    { id: 3, title: "Low Stock Alert", message: "Inventory for 'Rice' is running low. Please restock.", time: "Yesterday", type: "warning" },
    { id: 4, title: "New Feedback", message: "Amit Patel rated 5 stars for yesterday's lunch.", time: "Yesterday", type: "info" },
    { id: 5, title: "Delivery Delay", message: "Raju Yadav reported traffic delay on Lajpat Nagar Route.", time: "2 days ago", type: "warning" },
    { id: 6, title: "System Update", message: "System maintenance scheduled for tonight at 2 AM.", time: "3 days ago", type: "info" },
];

export default function NotificationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <button className="text-sm font-medium text-[var(--color-saffron-600)] hover:text-[var(--color-saffron-700)]">
                    Mark all as read
                </button>
            </div>

            <div className="rounded-xl bg-white p-6 card-shadow">
                <div className="space-y-4">
                    {NOTIFICATIONS.map((notification) => (
                        <div key={notification.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-blue-100 text-blue-600'
                                }`}>
                                {notification.type === 'success' && <CheckCircle className="h-5 w-5" />}
                                {notification.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
                                {notification.type === 'info' && <Info className="h-5 w-5" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                                    <span className="text-xs text-gray-400">{notification.time}</span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
