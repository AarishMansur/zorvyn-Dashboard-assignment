# Zorvyn Finance Dashboard

A clean, interactive finance dashboard built to evaluate frontend development skills, component structuring, and state management.

## 🚀 Features

### 1. Dashboard Overview
- **Dynamic Summary Cards**: Real-time calculation of Total Balance, Monthly Income, Monthly Expenses, and Savings Rate.
- **Balance Trend**: Interactive Area Chart showing Income vs. Expenses over time (7d, 30d, 90d).
- **Spending Breakdown**: Visual Pie Chart aggregating expenses by category.
- **Smart Insights**: Automatically identifies Top Spending category and detects Monthly Surplus/Deficit.

### 2. Transaction Management
- **Full CRUD**: Add, Edit, and Delete transactions with ease.
- **Advanced Filtering**: Filter by Category or Type (Income/Expense).
- **Global Search**: Search through transaction descriptions instantly.

### 3. Role-Based UI (RBAC)
- **Viewer Mode**: Read-only access to the dashboard and transactions.
- **Admin Mode**: Full access to Add, Edit, and Delete transactions.
- **Toggle**: Easily switch between roles via the user profile in the sidebar.

### 4. Technical Excellence
- **State Management**: Powered by **Zustand** with middleware for data persistence (`localStorage`).
- **Styling**: Modern UI built with **Tailwind CSS**, featuring dark mode support and responsive layouts.
- **Type Safety**: Fully typed with **TypeScript**.
- **Charts**: Interactive visualizations using **Recharts**.

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **State**: Zustand
- **Styling**: Tailwind CSS + Shadcn/UI
- **Icons**: HugeIcons
- **Charts**: Recharts
- **Forms/Validation**: Zod + React Hook Form (where applicable)

## 📦 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd zorvyn-assignment
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   pnpm run dev
   ```

4. **Build for production**:
   ```bash
   pnpm run build
   ```

## 📝 Approach & Implementation
- **Component Modularity**: Components are decoupled and reusable (e.g., `TransactionForm` handles both create and update logic).
- **Zustand Persistence**: Utilizes `persist` middleware to ensure user data remains across sessions.
- **Responsive Design**: Uses Tailwind's container queries (`@container`) and responsive utilities to ensure a premium feel on all devices.
- **Mock Data**: Pre-seeded with varied transactions for immediate visualization of charts and insights.
