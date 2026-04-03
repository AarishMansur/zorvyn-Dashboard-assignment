import type { Role } from "./user.types";

export type TranstionType = 'income' | 'expense';
export type FilterType = "all" | "income" | "expense";

export type CategoryType =
  | "Salary"
  | "Food"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Transport"
  | "Other";

export interface Filters {
  search: string;
  type: FilterType;
  category: string;
}

export interface Transaction {
  id: string,
  date: string,
  description: string
  amount: number,
  category: CategoryType,
  type: TranstionType
}

export interface FinanceState {
  transactions: Transaction[]
  filters: Filters
  role: Role,
  setRole: (role: Role) => void
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (t: Transaction) => void;
  setSearch: (search: string) => void;
  setType: (type: FilterType) => void;
  setCategory: (category: string) => void;
}