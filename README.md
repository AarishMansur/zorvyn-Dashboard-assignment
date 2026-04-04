# Zorvyn Finance Dashboard

---

## Overview

Zorvyn lets users track their financial activity at a glance. You can see where your money is going, spot trends over time, and manage transactions, all from a clean, responsive interface.

I used React 18 + Vite as the foundation, Zustand for state (with localStorage persistence so nothing disappears on refresh), Tailwind + shadcn/ui for styling, and Recharts for the visualizations.

---

## Getting Started

```bash
git clone https://github.com/AarishMansur/zorvyn-Dashboard-assignment
cd zorvyn-assignment
pnpm install
pnpm run dev
```

That's it. The app comes pre loaded with mock data so charts and insights render immediately.

---

## What's Built

**Dashboard** : Summary cards (balance, income, expenses, savings rate) update in real time as you add or edit transactions. Two charts sit below: an area chart for balance trends (switchable between 7d / 30d / 90d) and a pie chart breaking down spending by category.

**Transactions** : Full CRUD with search, category filtering, and income/expense filtering. The table is the main workspace. I kept it simple and scannable rather than overloading it with controls.

**Role-Based UI** : A toggle in the sidebar switches between Viewer (read-only) and Admin (add, edit, delete). No backend, it's simulated on the frontend, but the permission boundaries are real: Viewers genuinely can't trigger any write actions.

**Insights** : Automatically surfaces the top spending category and flags whether the current month is in surplus or deficit. Simple, but the kind of thing that makes a dashboard feel smart.

---

## A Few Decisions Worth Noting

**Zustand over Redux** : The state here isn't complex enough to justify Redux. Zustand gave me persistence middleware and clean selectors without the boilerplate.

**shadcn/ui as a base, not a crutch** : I used it for primitives (modals, dropdowns, form elements) but styled everything to fit the dashboard's visual language. Nothing looks out-of-the-box.

**TypeScript throughout** : All transaction shapes, store slices, and component props are typed. Caught a few bugs early because of it.

**Mock data is intentional** : The seed data is varied enough (multiple categories, a mix of income and expense, spread across months) that all the charts and insights actually tell a story when you first open the app.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| State | Zustand (with persist middleware) |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Icons | HugeIcons |
| Validation | Zod + React Hook Form |

---

