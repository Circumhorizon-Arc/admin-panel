
export const CUSTOMERS = [
    { id: "C001", name: "Rahul Sharma", phone: "+91 98765 43210", address: "A-23, Lajpat Nagar II", area: "Lajpat Nagar", plan: "Monthly", status: "Active", balance: 1200, notes: "No onions" },
    { id: "C002", name: "Priya Verma", phone: "+91 98765 12345", address: "B-4, Greater Kailash I", area: "Greater Kailash", plan: "Weekly", status: "Active", balance: 500, notes: "" },
    { id: "C003", name: "Amit Patel", phone: "+91 91234 56789", address: "C-12, Malviya Nagar", area: "Malviya Nagar", plan: "Monthly", status: "Inactive", balance: 0, notes: "Lunch only" },
    { id: "C004", name: "Sneha Gupta", phone: "+91 99887 76655", address: "Flat 405, Hauz Khas Enclave", area: "Hauz Khas", plan: "Custom", status: "Active", balance: -200, notes: "Spicy food preferred" },
    { id: "C005", name: "Vikram Singh", phone: "+91 98765 09876", address: "78, Vasant Vihar Block C", area: "Vasant Vihar", plan: "Monthly", status: "Active", balance: 2500, notes: "" },
    { id: "C006", name: "Anjali Reddy", phone: "+91 98123 45678", address: "D-56, Lajpat Nagar IV", area: "Lajpat Nagar", plan: "Weekly", status: "Active", balance: 800, notes: "Extra rice" },
    { id: "C007", name: "Rajesh Kumar", phone: "+91 97654 32109", address: "E-89, Greater Kailash II", area: "Greater Kailash", plan: "Monthly", status: "Active", balance: 1500, notes: "" },
    { id: "C008", name: "Neha Kapoor", phone: "+91 96543 21098", address: "F-12, Hauz Khas Village", area: "Hauz Khas", plan: "Custom", status: "Active", balance: 300, notes: "Jain food" },
    { id: "C009", name: "Sanjay Mehta", phone: "+91 95432 10987", address: "G-34, Malviya Nagar Ext", area: "Malviya Nagar", plan: "Monthly", status: "Active", balance: 2000, notes: "" },
    { id: "C010", name: "Pooja Jain", phone: "+91 94321 09876", address: "H-67, Vasant Vihar", area: "Vasant Vihar", plan: "Weekly", status: "Active", balance: 600, notes: "No garlic" },
];

export const PLANS = [
    { id: "P001", name: "Monthly Gold", price: 3000, type: "Monthly", meals: ["Lunch", "Dinner"], description: "Complete meal with sweet dish on weekends" },
    { id: "P002", name: "Weekly Starter", price: 800, type: "Weekly", meals: ["Lunch"], description: "5 Roti, Rice, Dal, Sabzi" },
    { id: "P003", name: "Student Saver", price: 2500, type: "Monthly", meals: ["Lunch", "Dinner"], description: "Budget friendly, standard meals" },
    { id: "P004", name: "Premium Health", price: 4500, type: "Monthly", meals: ["Lunch", "Dinner"], description: "Low oil, extra salad, multigrain roti" },
    { id: "P005", name: "Weekend Special", price: 600, type: "Weekly", meals: ["Lunch", "Dinner"], description: "Saturday & Sunday meals only" },
    { id: "P006", name: "Executive Plan", price: 3500, type: "Monthly", meals: ["Lunch"], description: "Premium lunch with variety" },
];

export const MENU_ITEMS = [
    { id: "M001", day: "Monday", type: "Lunch", items: ["Dal Fry", "Jeera Rice", "Aloo Gobi", "Chapati", "Salad"], image: "/images/Monday Lunch.png" },
    { id: "M002", day: "Monday", type: "Dinner", items: ["Mix Veg", "Paratha", "Dal Tadka", "Rice", "Pickle"], image: "/images/Monday Dinner.png" },
    { id: "M003", day: "Tuesday", type: "Lunch", items: ["Rajma Masala", "Steamed Rice", "Bhindi Fry", "Chapati", "Curd"], image: "/images/Tuesday Lunch.png" },
    { id: "M004", day: "Tuesday", type: "Dinner", items: ["Sev Tamatar", "Phulka", "Jeera Rice", "Buttermilk"], image: "/images/Tuesday Dinner.png" },
    { id: "M005", day: "Wednesday", type: "Lunch", items: ["Kadhi Pakora", "Rice", "Aloo Matar", "Chapati", "Salad"], image: "/images/Wednesday Lunch.png" },
    { id: "M006", day: "Wednesday", type: "Dinner", items: ["Paneer Butter Masala", "Naan", "Dal Fry", "Jeera Rice", "Gulab Jamun"], image: "/images/Wednesday Dinner.png" },
    { id: "M007", day: "Thursday", type: "Lunch", items: ["Chole Bhature", "Pulav", "Raita", "Salad"], image: "/images/Thursday Lunch.png" },
    { id: "M008", day: "Thursday", type: "Dinner", items: ["Kaju Curry", "Rice", "Rotis", "Salad"], image: "/images/Thursday Dinner.png" },
    { id: "M009", day: "Friday", type: "Lunch", items: ["Dal Makhani", "Naan", "Mix Veg", "Rice", "Papad"], image: "/images/Friday Lunch.png" },
    { id: "M010", day: "Friday", type: "Dinner", items: ["Baingan Bharta", "Rice", "Roti", "Salad"], image: "/images/Friday Dinner.png" },
    { id: "M011", day: "Saturday", type: "Lunch", items: ["Khichdi", "Kadhi", "Aloo Chokha", "Papad", "Pickle"], image: "/images/Saturday Lunch.png" },
    { id: "M012", day: "Saturday", type: "Dinner", items: ["Veg Biryani", "Raita", "Salad", "Kheer"], image: "/images/Saturday Dinner.png" },
    { id: "M013", day: "Sunday", type: "Lunch", items: ["Puri Sabzi", "Halwa", "Chana Masala", "Raita"], image: "/images/Sunday Lunch.png" },
    { id: "M014", day: "Sunday", type: "Dinner", items: ["Malai Kofta", "Rice", "Chapati", "Salad", "Ice Cream"], image: "/images/Sunday Dinner.png" },
];

export const DELIVERY_BOYS = [
    { id: "D001", name: "Raju Yadav", phone: "+91 88776 65544", route: "Lajpat Nagar Route A", activeOrders: 15, status: "On Duty" },
    { id: "D002", name: "Sonu Kumar", phone: "+91 99880 01122", route: "Greater Kailash Route B", activeOrders: 12, status: "On Duty" },
    { id: "D003", name: "Deepak Singh", phone: "+91 77665 54433", route: "Hauz Khas Route C", activeOrders: 0, status: "Off Duty" },
];

export const ORDERS = [
    { id: "ORD-101", customerId: "C001", customerName: "Rahul Sharma", route: "Lajpat Nagar Route A", deliveryBoy: "Raju Yadav", status: "Delivered", date: "2025-12-05", meal: "Lunch" },
    { id: "ORD-102", customerId: "C002", customerName: "Priya Verma", route: "Greater Kailash Route B", deliveryBoy: "Deepak Singh", status: "Out for Delivery", date: "2025-12-05", meal: "Lunch" },
    { id: "ORD-103", customerId: "C004", customerName: "Sneha Gupta", route: "Hauz Khas Route", deliveryBoy: "Sonu Kumar", status: "Pending", date: "2025-12-05", meal: "Lunch" },
    { id: "ORD-104", customerId: "C005", customerName: "Vikram Singh", route: "Vasant Vihar", deliveryBoy: "Raju Yadav", status: "Delivered", date: "2025-12-05", meal: "Lunch" },
    { id: "ORD-105", customerId: "C003", customerName: "Amit Patel", route: "Malviya Nagar", deliveryBoy: "Deepak Singh", status: "Delivered", date: "2025-12-04", meal: "Dinner" },
    { id: "ORD-106", customerId: "C001", customerName: "Rahul Sharma", route: "Lajpat Nagar Route A", deliveryBoy: "Raju Yadav", status: "Delivered", date: "2025-12-04", meal: "Lunch" },
    { id: "ORD-107", customerId: "C002", customerName: "Priya Verma", route: "Greater Kailash", deliveryBoy: "Sonu Kumar", status: "Delivered", date: "2025-12-03", meal: "Lunch" },
    { id: "ORD-108", customerId: "C005", customerName: "Vikram Singh", route: "Vasant Vihar", deliveryBoy: "Raju Yadav", status: "Delivered", date: "2025-12-02", meal: "Dinner" },
    { id: "ORD-109", customerId: "C006", customerName: "Anjali Reddy", route: "Lajpat Nagar Route A", deliveryBoy: "Raju Yadav", status: "Delivered", date: "2025-12-05", meal: "Dinner" },
    { id: "ORD-110", customerId: "C007", customerName: "Rajesh Kumar", route: "Greater Kailash Route B", deliveryBoy: "Sonu Kumar", status: "Delivered", date: "2025-12-04", meal: "Lunch" },
    { id: "ORD-111", customerId: "C008", customerName: "Neha Kapoor", route: "Hauz Khas Route", deliveryBoy: "Deepak Singh", status: "Delivered", date: "2025-12-03", meal: "Dinner" },
    { id: "ORD-112", customerId: "C009", customerName: "Sanjay Mehta", route: "Malviya Nagar", deliveryBoy: "Raju Yadav", status: "Delivered", date: "2025-12-02", meal: "Lunch" },
    { id: "ORD-113", customerId: "C010", customerName: "Pooja Jain", route: "Vasant Vihar", deliveryBoy: "Sonu Kumar", status: "Delivered", date: "2025-12-01", meal: "Dinner" },
];

export const PAYMENTS = [
    { id: "PAY-001", customerName: "Rahul Sharma", amount: 3000, date: "2025-12-01", method: "UPI", status: "Success" },
    { id: "PAY-002", customerName: "Priya Verma", amount: 800, date: "2025-12-02", method: "Cash", status: "Success" },
    { id: "PAY-003", customerName: "Vikram Singh", amount: 2500, date: "2025-12-03", method: "UPI", status: "Pending" },
];

export const FEEDBACK = [
    { id: "F001", customerName: "Amit Patel", comment: "Food was good but chapati was a bit hard today.", rating: 3, date: "2025-12-04", status: "Unresolved" },
    { id: "F002", customerName: "Sneha Gupta", comment: "Amazing paneer dish yesterday! Loved it.", rating: 5, date: "2025-12-03", status: "Resolved" },
    { id: "F003", customerName: "Vikram Singh", comment: "Late delivery today, please look into it.", rating: 2, date: "2025-12-02", status: "Unresolved" },
    { id: "F004", customerName: "Priya Verma", comment: "The sweet dish was delicious!", rating: 4, date: "2025-12-01", status: "Resolved" },
    { id: "F005", customerName: "Rahul Sharma", comment: "Excellent service and tasty food!", rating: 5, date: "2025-12-05", status: "Resolved" },
    { id: "F006", customerName: "Anjali Reddy", comment: "Rice quantity was less today.", rating: 3, date: "2025-12-04", status: "Unresolved" },
    { id: "F007", customerName: "Rajesh Kumar", comment: "Very satisfied with the quality.", rating: 5, date: "2025-12-03", status: "Resolved" },
    { id: "F008", customerName: "Neha Kapoor", comment: "Food was too spicy for my taste.", rating: 2, date: "2025-12-02", status: "Resolved" },
];

export const STATS = {
    totalSubscribers: 154,
    tiffinsToday: 120,
    pendingDeliveries: 12,
    monthlyRevenue: 450000,
};
