"use client";

import { useState } from "react";
import { Plus, Phone, MapPin, Truck, Edit2, Trash2 } from "lucide-react";
import { useApp } from "@/lib/context";
import { Modal } from "@/components/ui/Modal";

export default function StaffPage() {
    const { staff, addStaff, updateStaff, deleteStaff } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        route: "",
        activeOrders: 0,
        status: "On Duty"
    });

    const handleEdit = (member: any) => {
        setEditingStaff(member);
        setFormData({
            name: member.name,
            phone: member.phone,
            route: member.route,
            activeOrders: member.activeOrders,
            status: member.status
        });
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingStaff(null);
        setFormData({
            name: "",
            phone: "",
            route: "",
            activeOrders: 0,
            status: "On Duty"
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Remove this staff member?")) {
            deleteStaff(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingStaff) {
            updateStaff(editingStaff.id, formData);
        } else {
            addStaff(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Delivery Staff</h1>
                    <p className="text-sm text-gray-500">Manage delivery boys and routes</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-navy-blue)] px-4 py-2 font-medium text-white hover:bg-opacity-90"
                >
                    <Plus className="h-4 w-4" />
                    Add Staff
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {staff.map((boy) => (
                    <div key={boy.id} className="rounded-xl bg-white p-6 card-shadow border border-transparent hover:border-[var(--color-saffron)] transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                <Truck className="h-6 w-6 text-gray-500" />
                            </div>
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${boy.status === 'On Duty' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {boy.status}
                            </span>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-gray-900">{boy.name}</h3>
                            <div className="mt-2 space-y-2 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {boy.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {boy.route}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Active Orders</p>
                                <p className="text-lg font-bold text-gray-900">{boy.activeOrders}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(boy)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDelete(boy.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingStaff ? "Edit Staff" : "Add New Staff"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            placeholder="Raju Yadav"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Route</label>
                        <input
                            type="text"
                            value={formData.route}
                            onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            placeholder="Vijay Nagar Route A"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                        >
                            <option>On Duty</option>
                            <option>Off Duty</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="rounded-lg bg-[var(--color-saffron-600)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                            {editingStaff ? "Update Staff" : "Add Staff"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
