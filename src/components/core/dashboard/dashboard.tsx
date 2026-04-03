"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SpendingBreakdownChart } from "@/components/spending-breakdown-chart"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Idea01Icon,
  ChartHistogramIcon,
  AlertCircleIcon,
  MoneyReceive01Icon,
  ShoppingBag01Icon
} from "@hugeicons/core-free-icons"
import { useFinanceStore } from "@/store/useFinanceStore"



export default function Dashboard() {
  const transactions = useFinanceStore((s) => s.transactions)

  const insights = React.useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense')
    
    // Find top spending category
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)
    
    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0] || ["None", 0]

    // Monthly Trend (Income vs Expense)
    const currentMonth = "2024-06"
    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && t.date.startsWith(currentMonth))
      .reduce((acc, t) => acc + t.amount, 0)
    
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
      .reduce((acc, t) => acc + t.amount, 0)

    const isProfitable = monthlyIncome > monthlyExpenses

    return { topCategory, monthlyIncome, monthlyExpenses, isProfitable }
  }, [transactions])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              <SectionCards />


              <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-12 lg:px-6">
                <div className="lg:col-span-8">
                  <ChartAreaInteractive />
                </div>
                <div className="lg:col-span-4">
                  <SpendingBreakdownChart />
                </div>
              </div>


              <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-3 lg:px-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <HugeiconsIcon icon={Idea01Icon} strokeWidth={2} className="size-5 text-primary" />
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider">Top Spending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={2} className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{insights.topCategory[0]}</p>
                        <p className="text-xs text-muted-foreground">${Number(insights.topCategory[1]).toFixed(2)} total spent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${insights.isProfitable ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <HugeiconsIcon icon={ChartHistogramIcon} strokeWidth={2} className={`size-5 ${insights.isProfitable ? 'text-emerald-500' : 'text-rose-500'}`} />
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider">Monthly Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-2 ${insights.isProfitable ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                        <HugeiconsIcon icon={MoneyReceive01Icon} strokeWidth={2} className={`size-4 ${insights.isProfitable ? 'text-emerald-500' : 'text-rose-500'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{insights.isProfitable ? "Surplus" : "Deficit"} Detected</p>
                        <p className="text-xs text-muted-foreground">Income: ${insights.monthlyIncome.toFixed(0)} | Spent: ${insights.monthlyExpenses.toFixed(0)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-rose-500/5 border-rose-500/20">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} className="size-5 text-rose-500" />
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider">Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-rose-500/10 p-2 transition-colors">
                        <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} className="size-4 text-rose-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Budget Warning</p>
                        <p className="text-xs text-muted-foreground">You spent ${insights.monthlyExpenses.toFixed(0)} this month.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>


              <div className="py-2">
                <div className="px-4 pb-4 lg:px-6">
                  <h2 className="text-lg font-semibold tracking-tight">Recent Transactions</h2>
                  <p className="text-sm text-muted-foreground">Manage and track your latest financial activities.</p>
                </div>
                <DataTable data={transactions} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
