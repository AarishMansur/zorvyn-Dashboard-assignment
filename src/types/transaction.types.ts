import type { Role } from "./user.types";

export type TranstionType = 'income' | 'expense';

export type CategoryType =
  | "Salary"
  | "Food"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Other";


export interface Transaction {
    id:string,
    date:string,
    amount:number,
    category:CategoryType,
    type:TranstionType
}

export interface FinanceState {
    transactions: Transaction[]
    role:Role,
    setRole:(role:Role)=>void
    addTransaction:(t:Transaction)=>void;
}