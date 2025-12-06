"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
    { name: "Mon", total: 850 },
    { name: "Tue", total: 1200 },
    { name: "Wed", total: 950 },
    { name: "Thu", total: 1100 },
    { name: "Fri", total: 1300 },
    { name: "Sat", total: 1500 },
    { name: "Sun", total: 1050 },
];

export function RevenueChart() {
    return (
        <div className="rounded-xl bg-white p-6 card-shadow">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Weekly Revenue</h3>
                <p className="text-sm text-gray-500">Income from subscriptions and extra orders</p>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: '#f3f4f6' }}
                            formatter={(value) => [`₹${value}`, 'Revenue']}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar
                            dataKey="total"
                            fill="var(--color-saffron-600)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
