"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
    CUSTOMERS,
    PLANS,
    MENU_ITEMS,
    DELIVERY_BOYS,
    ORDERS,
    PAYMENTS,
    FEEDBACK,
    STATS
} from "./dummy-data";

// Define Types
export type User = {
    name: string;
    email: string;
    role: string;
};

export type Customer = {
    id: string;
    name: string;
    phone: string;
    address: string;
    area: string;
    plan: string;
    status: string;
    balance: number;
    notes: string;
};

export type Plan = {
    id: string;
    name: string;
    price: number;
    type: string;
    meals: string[];
    description: string;
};

export type MenuItem = {
    id: string;
    day: string;
    type: string;
    items: string[];
    image?: string;
};

export type Staff = {
    id: string;
    name: string;
    phone: string;
    route: string;
    activeOrders: number;
    status: string;
};

export type Order = {
    id: string;
    customerId: string;
    customerName: string;
    route: string;
    deliveryBoy: string;
    status: string;
    date: string;
    meal: string;
};

export type Payment = {
    id: string;
    customerName: string;
    amount: number;
    date: string;
    method: string;
    status: string;
};

export type Feedback = {
    id: string;
    customerName: string;
    comment: string;
    rating: number;
    date: string;
    status: string;
};

type AppContextType = {
    // State
    user: User | null;
    customers: Customer[];
    plans: Plan[];
    menuItems: MenuItem[];
    staff: Staff[];
    orders: Order[];
    payments: Payment[];
    feedback: Feedback[];
    stats: typeof STATS;

    // Actions
    login: (email: string, role?: string, name?: string) => void;
    logout: () => void;

    // Customer Actions
    addCustomer: (customer: Omit<Customer, "id">) => void;
    updateCustomer: (id: string, updates: Partial<Customer>) => void;
    deleteCustomer: (id: string) => void;

    // Plan Actions
    addPlan: (plan: Omit<Plan, "id">) => void;
    updatePlan: (id: string, updates: Partial<Plan>) => void;
    deletePlan: (id: string) => void;

    // Menu Actions
    addMenuItem: (item: Omit<MenuItem, "id">) => void;
    updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
    deleteMenuItem: (id: string) => void;

    // Staff Actions
    addStaff: (staff: Omit<Staff, "id">) => void;
    updateStaff: (id: string, updates: Partial<Staff>) => void;
    deleteStaff: (id: string) => void;

    // Order Actions
    updateOrderStatus: (id: string, status: string) => void;

    // Payment Actions
    recordPayment: (payment: Omit<Payment, "id">) => void;
    updatePaymentStatus: (id: string, status: string) => void;

    // Feedback Actions
    resolveFeedback: (id: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    // Initial State Configuration - start with defaults to match SSR
    const [user, setUser] = useState<User | null>(null);
    const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
    const [plans, setPlans] = useState<Plan[]>(PLANS);
    const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
    const [staff, setStaff] = useState<Staff[]>(DELIVERY_BOYS);
    const [orders, setOrders] = useState<Order[]>(ORDERS);
    const [payments, setPayments] = useState<Payment[]>(PAYMENTS);
    const [feedback, setFeedback] = useState<Feedback[]>(FEEDBACK);

    // Load from localStorage on mount (after hydration)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const APP_VERSION = "2.0";
        const storedVersion = localStorage.getItem("app_version");

        if (storedVersion !== APP_VERSION) {
            // Version mismatch - clear old data and set new version
            localStorage.clear();
            localStorage.setItem("app_version", APP_VERSION);
            // State is already set to defaults
            return;
        }

        // Load saved data from localStorage
        const storedUser = localStorage.getItem("app_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch { }
        }

        const storedCustomers = localStorage.getItem("app_customers");
        if (storedCustomers) {
            try {
                setCustomers(JSON.parse(storedCustomers));
            } catch { }
        }

        const storedPlans = localStorage.getItem("app_plans");
        if (storedPlans) {
            try {
                setPlans(JSON.parse(storedPlans));
            } catch { }
        }

        const storedMenu = localStorage.getItem("app_menu");
        if (storedMenu) {
            try {
                setMenuItems(JSON.parse(storedMenu));
            } catch { }
        }

        const storedStaff = localStorage.getItem("app_staff");
        if (storedStaff) {
            try {
                setStaff(JSON.parse(storedStaff));
            } catch { }
        }

        const storedOrders = localStorage.getItem("app_orders");
        if (storedOrders) {
            try {
                setOrders(JSON.parse(storedOrders));
            } catch { }
        }

        const storedPayments = localStorage.getItem("app_payments");
        if (storedPayments) {
            try {
                setPayments(JSON.parse(storedPayments));
            } catch { }
        }

        const storedFeedback = localStorage.getItem("app_feedback");
        if (storedFeedback) {
            try {
                setFeedback(JSON.parse(storedFeedback));
            } catch { }
        }

        if (!storedVersion) {
            // First run - set version
            localStorage.setItem("app_version", APP_VERSION);
        }
    }, []);

    // Effect to save changes to localStorage
    useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("app_user", JSON.stringify(user)); }, [user]);
    useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("app_customers", JSON.stringify(customers)); }, [customers]);
    useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("app_plans", JSON.stringify(plans)); }, [plans]);
    useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("app_menu", JSON.stringify(menuItems)); }, [menuItems]);
    useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("app_staff", JSON.stringify(staff)); }, [staff]);
    useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("app_orders", JSON.stringify(orders)); }, [orders]);
    useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("app_payments", JSON.stringify(payments)); }, [payments]);
    useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("app_feedback", JSON.stringify(feedback)); }, [feedback]);


    const login = (email: string, role: string = "Super Admin", name: string = "Admin User") => {
        const newUser = { name, email, role };
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
    };

    // --- Customer Actions ---
    const addCustomer = (customerData: Omit<Customer, "id">) => {
        const newCustomer = { ...customerData, id: `C${Date.now()}` };
        setCustomers((prev) => [...prev, newCustomer]);
    };

    const updateCustomer = (id: string, updates: Partial<Customer>) => {
        setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    };

    const deleteCustomer = (id: string) => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
    };

    // --- Plan Actions ---
    const addPlan = (planData: Omit<Plan, "id">) => {
        const newPlan = { ...planData, id: `P${Date.now()}` };
        setPlans((prev) => [...prev, newPlan]);
    };

    const updatePlan = (id: string, updates: Partial<Plan>) => {
        setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    };

    const deletePlan = (id: string) => {
        setPlans((prev) => prev.filter((p) => p.id !== id));
    };

    // --- Menu Actions ---
    const addMenuItem = (itemData: Omit<MenuItem, "id">) => {
        const newItem = { ...itemData, id: `M${Date.now()}` };
        setMenuItems((prev) => [...prev, newItem]);
    };

    const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
        setMenuItems((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
    };

    const deleteMenuItem = (id: string) => {
        setMenuItems((prev) => prev.filter((m) => m.id !== id));
    };

    // --- Staff Actions ---
    const addStaff = (staffData: Omit<Staff, "id">) => {
        const newStaff = { ...staffData, id: `D${Date.now()}` };
        setStaff((prev) => [...prev, newStaff]);
    };

    const updateStaff = (id: string, updates: Partial<Staff>) => {
        setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    };

    const deleteStaff = (id: string) => {
        setStaff((prev) => prev.filter((s) => s.id !== id));
    };

    // --- Order Actions ---
    const updateOrderStatus = (id: string, status: string) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    };

    // --- Payment Actions ---
    const recordPayment = (paymentData: Omit<Payment, "id">) => {
        const newPayment = { ...paymentData, id: `PAY-${Date.now()}` };
        setPayments((prev) => [newPayment, ...prev]);
    };

    const updatePaymentStatus = (id: string, status: string) => {
        setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    };

    // --- Feedback Actions ---
    const resolveFeedback = (id: string) => {
        setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, status: "Resolved" } : f)));
    };

    return (
        <AppContext.Provider
            value={{
                user,
                customers,
                plans,
                menuItems,
                staff,
                orders,
                payments,
                feedback,
                stats: STATS,
                login,
                logout,
                addCustomer,
                updateCustomer,
                deleteCustomer,
                addPlan,
                updatePlan,
                deletePlan,
                addMenuItem,
                updateMenuItem,
                deleteMenuItem,
                addStaff,
                updateStaff,
                deleteStaff,
                updateOrderStatus,
                recordPayment,
                updatePaymentStatus,
                resolveFeedback,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
