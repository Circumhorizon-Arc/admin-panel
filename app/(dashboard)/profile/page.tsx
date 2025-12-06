"use client";

import { useApp } from "@/lib/context";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";

export default function ProfilePage() {
    const { user } = useApp();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

            <div className="rounded-xl bg-white p-8 card-shadow max-w-2xl">
                <div className="flex flex-col items-center pb-8 border-b border-gray-100">
                    <div className="h-24 w-24 rounded-full bg-[var(--color-navy-blue)] flex items-center justify-center text-white mb-4">
                        <User className="h-12 w-12" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{user?.name || "Admin User"}</h2>
                    <span className="mt-1 rounded-full bg-[var(--color-saffron-50)] px-3 py-1 text-sm font-medium text-[var(--color-saffron-700)]">
                        {user?.role || "Super Admin"}
                    </span>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Email Address</p>
                            <p className="text-gray-900">{user?.email || "admin@tiffinservice.com"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                            <Phone className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Phone Number</p>
                            <p className="text-gray-900">+91 98765 00000</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                            <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Location</p>
                            <p className="text-gray-900">New Delhi, India</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                            <Shield className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Account Status</p>
                            <p className="text-green-600 font-medium">Active</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
