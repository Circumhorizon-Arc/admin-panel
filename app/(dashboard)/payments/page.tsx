"use client";

import { useState } from "react";
import { Download, Filter, Plus, Search } from "lucide-react";
import { useApp } from "@/lib/context";
import { Modal } from "@/components/ui/Modal";

export default function PaymentsPage() {
    const { payments, recordPayment, updatePaymentStatus } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [method, setMethod] = useState("Cash");

    const filteredPayments = payments.filter(p =>
        p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRecordPayment = (e: React.FormEvent) => {
        e.preventDefault();
        recordPayment({
            customerName,
            amount: Number(amount),
            method: method,
            status: "Success",
            date: new Date().toISOString().split('T')[0]
        });
        setIsModalOpen(false);
        setAmount("");
        setCustomerName("");
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "ID,Customer,Date,Method,Status,Amount\n"
            + payments.map(p => `${p.id},${p.customerName},${p.date},${p.method},${p.status},${p.amount}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "payments.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
                    <p className="text-sm text-gray-500">Track revenue and transactions</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleExport} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-[var(--color-india-green)] px-4 py-2 font-medium text-white hover:bg-opacity-90">
                        <Plus className="h-4 w-4" />
                        Record Payment
                    </button>
                </div>
            </div>

            <div className="rounded-xl bg-white p-4 card-shadow">
                <div className="mb-6 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search transaction..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 pl-9 pr-4 py-2 text-sm outline-none focus:border-[var(--color-saffron)]"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">Transaction ID</th>
                                <th className="px-4 py-3 font-medium">Customer</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Method</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{payment.id}</td>
                                    <td className="px-4 py-3">{payment.customerName}</td>
                                    <td className="px-4 py-3 text-gray-500">{payment.date}</td>
                                    <td className="px-4 py-3">{payment.method}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => updatePaymentStatus(payment.id, payment.status === "Success" ? "Pending" : "Success")}
                                            className={`rounded-full px-2 py-1 text-xs font-medium cursor-pointer ${payment.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {payment.status}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold text-gray-900">₹{payment.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Record New Payment"
            >
                <form onSubmit={handleRecordPayment} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                        <input
                            type="text"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            placeholder="e.g. Rahul Sharma"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
                        <input
                            type="number"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                        >
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Card">Card</option>
                            <option value="Net Banking">Net Banking</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="rounded-lg bg-[var(--color-saffron-600)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                            Record Payment
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
