"use client";

import { Save } from "lucide-react";

export default function SettingsPage() {
    const handleSave = () => {
        // In a real app, this would save to backend
        alert("Settings saved successfully!");
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-500">Manage your business profile and preferences</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-navy-blue)] px-4 py-2 font-medium text-white hover:bg-opacity-90"
                >
                    <Save className="h-4 w-4" />
                    Save Changes
                </button>
            </div>

            <div className="space-y-6">
                {/* Business Info Section */}
                <div className="rounded-xl bg-white p-6 card-shadow">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Business Information</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Tiffin Service Name</label>
                            <input type="text" defaultValue="Annapurna Tiffins" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Contact Number</label>
                            <input type="text" defaultValue="+91 98765 43210" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                            <textarea defaultValue="12, Main Market, Lajpat Nagar II, New Delhi" rows={2} className="w-full rounded-md border border-gray-300 p-2 text-sm" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">FSSAI License No.</label>
                            <input type="text" defaultValue="12345678901234" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
                        </div>
                    </div>
                </div>

                {/* Delivery Settings */}
                <div className="rounded-xl bg-white p-6 card-shadow">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Delivery Settings</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Lunch Delivery Time</label>
                            <div className="flex gap-2">
                                <input type="time" defaultValue="11:30" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
                                <span className="self-center text-gray-500">to</span>
                                <input type="time" defaultValue="13:30" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Dinner Delivery Time</label>
                            <div className="flex gap-2">
                                <input type="time" defaultValue="19:30" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
                                <span className="self-center text-gray-500">to</span>
                                <input type="time" defaultValue="21:30" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Serviceable Areas (Comma separated)</label>
                            <textarea defaultValue="Lajpat Nagar, Greater Kailash, Hauz Khas, Malviya Nagar, Vasant Vihar" rows={2} className="w-full rounded-md border border-gray-300 p-2 text-sm" />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="rounded-xl bg-white p-6 card-shadow">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Notifications</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Order Alerts</p>
                                <p className="text-sm text-gray-500">Receive notification when a new order is updated</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-5 w-5 accent-[var(--color-navy-blue)]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Payment Confirmation</p>
                                <p className="text-sm text-gray-500">Receive notification on successful payment</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-5 w-5 accent-[var(--color-navy-blue)]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Daily Summary</p>
                                <p className="text-sm text-gray-500">Receive end-of-day summary email</p>
                            </div>
                            <input type="checkbox" className="h-5 w-5 accent-[var(--color-navy-blue)]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
