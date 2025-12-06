"use client";

import { useState } from "react";
import { Plus, Trash2, UtensilsCrossed } from "lucide-react";
import { useApp } from "@/lib/context";
import { Modal } from "@/components/ui/Modal";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function MenuPage() {
    const { menuItems, addMenuItem, updateMenuItem } = useApp();
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingType, setEditingType] = useState<"Lunch" | "Dinner" | null>(null);
    const [newItemText, setNewItemText] = useState("");

    const currentMenu = menuItems.filter(m => m.day === selectedDay);
    const lunchMenu = currentMenu.find(m => m.type === "Lunch");
    const dinnerMenu = currentMenu.find(m => m.type === "Dinner");

    const handleAddItem = (type: "Lunch" | "Dinner") => {
        setEditingType(type);
        setNewItemText("");
        setIsModalOpen(true);
    };

    const submitModal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemText.trim()) return;

        const existingMenu = editingType === "Lunch" ? lunchMenu : dinnerMenu;

        if (existingMenu) {
            updateMenuItem(existingMenu.id, {
                ...existingMenu,
                items: [...existingMenu.items, newItemText.trim()]
            });
        } else {
            addMenuItem({
                day: selectedDay,
                type: editingType!,
                items: [newItemText.trim()],
            });
        }
        setIsModalOpen(false);
    };

    const handleDeleteItem = (type: "Lunch" | "Dinner", itemToDelete: string) => {
        if (!confirm(`Remove "${itemToDelete}" from ${selectedDay} ${type}?`)) return;

        const existingMenu = type === "Lunch" ? lunchMenu : dinnerMenu;
        if (existingMenu) {
            updateMenuItem(existingMenu.id, {
                ...existingMenu,
                items: existingMenu.items.filter(i => i !== itemToDelete)
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
                    <p className="text-sm text-gray-500">Plan daily meals for subscribers</p>
                </div>
                <button
                    onClick={() => alert("Preview feature coming soon!")}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-navy-blue)] px-4 py-2 font-medium text-white hover:bg-opacity-90"
                >
                    <UtensilsCrossed className="h-4 w-4" />
                    Preview Menu
                </button>
            </div>

            {/* Day Selector */}
            <div className="flex overflow-x-auto border-b border-gray-200 bg-white pb-1 pt-4">
                {DAYS.map((day) => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`min-w-[100px] flex-1 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${selectedDay === day
                            ? "border-[var(--color-saffron-600)] text-[var(--color-saffron-600)]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Lunch Section */}
                <MenuCard
                    title="Lunch"
                    day={selectedDay}
                    colorClass="bg-orange-400"
                    menuItem={lunchMenu}
                    onAdd={() => handleAddItem("Lunch")}
                    onDelete={(item) => handleDeleteItem("Lunch", item)}
                />

                {/* Dinner Section */}
                <MenuCard
                    title="Dinner"
                    day={selectedDay}
                    colorClass="bg-indigo-500"
                    menuItem={dinnerMenu}
                    onAdd={() => handleAddItem("Dinner")}
                    onDelete={(item) => handleDeleteItem("Dinner", item)}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Add Item to ${selectedDay} ${editingType}`}
            >
                <form onSubmit={submitModal} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                        <input
                            type="text"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            placeholder="e.g., Paneer Butter Masala"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-[var(--color-saffron)] focus:ring-1 focus:ring-[var(--color-saffron)] outline-none"
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="rounded-lg bg-[var(--color-saffron-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-saffron-600)]/90">
                            Add Item
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

function MenuCard({ title, day, colorClass, menuItem, onAdd, onDelete }: {
    title: string,
    day: string,
    colorClass: string,
    menuItem: any,
    onAdd: () => void,
    onDelete: (item: string) => void
}) {
    // Construct image path based on day and meal type
    const imagePath = `/images/${day} ${title}.png`;

    return (
        <div className="rounded-xl bg-white p-6 card-shadow h-full flex flex-col">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${colorClass}`}></span>
                    {title}
                </h3>
            </div>

            {/* Always show image from folder */}
            <div className="mb-4 h-48 w-full overflow-hidden rounded-lg bg-gray-50">
                <img
                    src={imagePath}
                    alt={`${day} ${title}`}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                        // If image doesn't exist, hide it
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>

            <div className="space-y-2 flex-grow">
                {menuItem?.items && menuItem.items.length > 0 ? (
                    menuItem.items.map((item: string, i: number) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 group">
                            <span className="text-sm text-gray-700">{item}</span>
                            <button onClick={() => onDelete(item)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                        <p className="text-sm text-gray-500 italic">No items added yet</p>
                    </div>
                )}
            </div>

            <button onClick={onAdd} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-500 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                <Plus className="h-4 w-4" /> Add Item
            </button>
        </div>
    );
}
