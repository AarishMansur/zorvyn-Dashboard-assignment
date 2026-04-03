import type { FinanceState } from "@/types/transaction.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFinanceStore = create<FinanceState>()(
    persist(
        (set) => ({
            transactions: [
                {
                    id: "1",
                    date: new Date().toISOString().split("T")[0],
                    description: "Initial Salary",
                    amount: 5000,
                    category: "Salary",
                    type: "income",
                },
                {
                    id: "2",
                    date: new Date().toISOString().split("T")[0],
                    description: "Grocery Store",
                    amount: 150,
                    category: "Food",
                    type: "expense",
                },
                {
                    id: "3",
                    date: new Date().toISOString().split("T")[0],
                    description: "Monthly Rent",
                    amount: 1200,
                    category: "Bills",
                    type: "expense",
                },
                {
                    id: "4",
                    date: new Date().toISOString().split("T")[0],
                    description: "Movie Tickets",
                    amount: 45,
                    category: "Entertainment",
                    type: "expense",
                },
            ],
            filters: {
                search: "",
                type: "all",
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
        }),
        {
            name: "finance-storage",
        }
    )
);

