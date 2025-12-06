"use client";

import { useState } from "react";
import { Plus, Check, Edit2, Trash2 } from "lucide-react";
import { useApp } from "@/lib/context";
import { Modal } from "@/components/ui/Modal";

export default function PlansPage() {
    const { plans, addPlan, updatePlan, deletePlan } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        type: "Monthly",
        description: "",
        meals: [] as string[]
    });

    const handleEdit = (plan: any) => {
        setEditingPlan(plan);
        setFormData({
            name: plan.name,
            price: plan.price,
            type: plan.type,
            description: plan.description,
            meals: plan.meals || []
        });
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingPlan(null);
        setFormData({
            name: "",
            price: 0,
            type: "Monthly",
            description: "",
            meals: ["Lunch"]
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this plan?")) {
            deletePlan(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const planData = {
            ...formData,
            price: Number(formData.price)
        };

        if (editingPlan) {
            updatePlan(editingPlan.id, planData);
        } else {
            addPlan(planData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
                    <p className="text-sm text-gray-500">Manage pricing and meal packages</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-saffron-600)] px-4 py-2 font-medium text-white hover:opacity-90"
                >
                    <Plus className="h-4 w-4" />
                    Create Plan
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {plans.map((plan) => (
                    <div key={plan.id} className="flex flex-col rounded-xl bg-white p-6 card-shadow">
                        <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-3xl font-bold text-[var(--color-navy-blue)]">₹{plan.price}</span>
                            <span className="ml-1 text-sm text-gray-500">/{plan.type.toLowerCase()}</span>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 flex-1">{plan.description}</p>

                        <div className="mt-6 space-y-3">
                            {plan.meals.map((meal) => (
                                <div key={meal} className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <Check className="h-3 w-3" />
                                    </span>
                                    {meal} Included
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button onClick={() => handleEdit(plan)} className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Edit</button>
                            <button onClick={() => handleDelete(plan.id)} className="flex-1 rounded-lg border border-red-200 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingPlan ? "Edit Plan" : "Create New Plan"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            placeholder="e.g. Gold plan"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                        <input
                            type="number"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                        >
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            placeholder="Short description"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Included Meals</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={formData.meals.includes("Lunch")}
                                    onChange={(e) => {
                                        if (e.target.checked) setFormData({ ...formData, meals: [...formData.meals, "Lunch"] });
                                        else setFormData({ ...formData, meals: formData.meals.filter(m => m !== "Lunch") });
                                    }}
                                    className="rounded border-gray-300 text-[var(--color-saffron-600)]"
                                />
                                Lunch
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={formData.meals.includes("Dinner")}
                                    onChange={(e) => {
                                        if (e.target.checked) setFormData({ ...formData, meals: [...formData.meals, "Dinner"] });
                                        else setFormData({ ...formData, meals: formData.meals.filter(m => m !== "Dinner") });
                                    }}
                                    className="rounded border-gray-300 text-[var(--color-saffron-600)]"
                                />
                                Dinner
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="rounded-lg bg-[var(--color-saffron-600)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                            {editingPlan ? "Update Plan" : "Create Plan"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
