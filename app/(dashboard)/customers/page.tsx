"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Phone, MapPin } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useApp } from "@/lib/context";

export default function CustomersPage() {
    const { customers, addCustomer, updateCustomer, deleteCustomer } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        area: "Lajpat Nagar",
        plan: "Monthly",
        status: "Active",
        balance: 0,
        notes: ""
    });

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this customer?")) {
            deleteCustomer(id);
        }
    };

    const handleEdit = (customer: any) => {
        setEditingCustomer(customer);
        setFormData({
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            area: customer.area,
            plan: customer.plan,
            status: customer.status,
            balance: customer.balance,
            notes: customer.notes
        });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingCustomer(null);
        setFormData({
            name: "",
            phone: "",
            address: "",
            area: "Lajpat Nagar",
            plan: "Monthly",
            status: "Active",
            balance: 0,
            notes: ""
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCustomer) {
            updateCustomer(editingCustomer.id, formData);
        } else {
            addCustomer(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-sm text-gray-500">Manage your subscribers</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-saffron-600)] px-4 py-2 font-medium text-white transition-colors hover:bg-[var(--color-saffron-600)]/90"
                >
                    <Plus className="h-4 w-4" />
                    Add New Customer
                </button>
            </div>

            <div className="rounded-xl bg-white p-4 card-shadow">
                <div className="mb-4 relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 pl-9 pr-4 py-2 text-sm outline-none focus:border-[var(--color-saffron)] focus:ring-1 focus:ring-[var(--color-saffron)]"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">Customer</th>
                                <th className="px-4 py-3 font-medium">Plan</th>
                                <th className="px-4 py-3 font-medium">Area</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Balance</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No customers found.</td>
                                </tr>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900">{customer.name}</div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Phone className="h-3 w-3" /> {customer.phone}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                {customer.plan}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">{customer.area}</td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className={`px-4 py-3 font-medium ${customer.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            ₹{Math.abs(customer.balance)} {customer.balance > 0 ? 'Due' : 'Adv'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(customer)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDelete(customer.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingCustomer ? "Edit Customer" : "Add New Customer"}
            >
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            placeholder="Ravi Kumar"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            placeholder="+91 9876543210"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Plan</label>
                        <select
                            value={formData.plan}
                            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                        >
                            <option>Monthly</option>
                            <option>Weekly</option>
                            <option>Custom</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            placeholder="Full address with landmarks"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Area / Route</label>
                        <select
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                        >
                            <option>Lajpat Nagar</option>
                            <option>Greater Kailash</option>
                            <option>Malviya Nagar</option>
                            <option>Hauz Khas</option>
                            <option>Vasant Vihar</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <div className="mt-4 flex gap-3 sm:col-span-2 justify-end">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="rounded-lg bg-[var(--color-saffron-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-saffron-600)]/90">
                            {editingCustomer ? "Update Customer" : "Add Customer"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
