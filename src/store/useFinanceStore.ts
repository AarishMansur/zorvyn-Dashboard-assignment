import type { FinanceState } from "@/types/transaction.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFinanceStore = create<FinanceState>()(
    persist(
        (set) => ({
            transactions: [],
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

