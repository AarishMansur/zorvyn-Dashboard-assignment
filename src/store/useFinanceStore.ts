import type { FinanceState } from "@/types/transaction.types";
import { create } from "zustand";


export const useFinanceStore = create<FinanceState>((set)=>({
    transactions:[],
    role:"viewer",
    setRole : (role)=>set({role}), 
    addTransaction:(t)=>set((state)=>({transactions:[...state.transactions,t]}))
}))