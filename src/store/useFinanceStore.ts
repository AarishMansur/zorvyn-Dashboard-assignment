import type { FinanceState } from "@/types/transaction.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFinanceStore = create<FinanceState>()(
    persist(
        (set) => ({
            transactions: [
                { id: "1", date: "2024-06-15", description: "Monthly Salary", amount: 5000, category: "Salary", type: "income" },
                { id: "2", date: "2024-06-16", description: "Grocery Store", amount: 150, category: "Food", type: "expense" },
                { id: "3", date: "2024-06-18", description: "Monthly Rent", amount: 1200, category: "Bills", type: "expense" },
                { id: "4", date: "2024-06-20", description: "Movie Night", amount: 45, category: "Entertainment", type: "expense" },
                { id: "5", date: "2024-06-22", description: "Starbucks Coffee", amount: 6.5, category: "Food", type: "expense" },
                { id: "6", date: "2024-06-24", description: "Gas Station", amount: 55, category: "Transport", type: "expense" },
                { id: "7", date: "2024-06-25", description: "Side Project Payment", amount: 800, category: "Salary", type: "income" },
                { id: "8", date: "2024-06-26", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
                { id: "9", date: "2024-06-28", description: "Electricity Bill", amount: 85, category: "Bills", type: "expense" },
                { id: "10", date: "2024-06-30", description: "Fine Dining", amount: 120, category: "Food", type: "expense" },
                { id: "11", date: "2024-05-15", description: "Salary May", amount: 5000, category: "Salary", type: "income" },
                { id: "12", date: "2024-05-20", description: "Old Rent", amount: 1200, category: "Bills", type: "expense" },
            ],
            filters: {
                search: "",
                type: "all",
                category: "all",
            },
            role: "viewer",

            setRole: (role) => set({ role }),

            addTransaction: (t) =>
                set((state) => ({
                    transactions: [...state.transactions, t],
                })),
            deleteTransaction: (id) =>
                set((state) => ({
                    transactions: state.transactions.filter((t) => t.id !== id),
                })),
            editTransaction: (t) =>
                set((state) => ({
                    transactions: state.transactions.map((trans) =>
                        trans.id === t.id ? t : trans
                    ),
                })),

            setSearch: (search) =>
                set((state) => ({
                    filters: { ...state.filters, search },
                })),

            setType: (type) =>
                set((state) => ({
                    filters: { ...state.filters, type },
                })),
            setCategory: (category) =>
                set((state) => ({
                    filters: { ...state.filters, category },
                })),
        }),
        {
            name: "finance-storage",
            version: 1,
        }
    )
);

