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

const mockTransactions = [
  { id: "1", date: "2024-03-28", description: "Monthly Salary", category: "Income", amount: 5000, type: "income" as const },
  { id: "2", date: "2024-03-27", description: "Whole Foods Market", category: "Food", amount: 156.40, type: "expense" as const },
  { id: "3", date: "2024-03-26", description: "Monthly Rent", category: "Housing", amount: 1200, type: "expense" as const },
  { id: "4", date: "2024-03-25", description: "Uber Ride", category: "Transport", amount: 24.50, type: "expense" as const },
  { id: "5", date: "2024-03-24", description: "Apple Music Subscription", category: "Entertainment", amount: 9.99, type: "expense" as const },
  { id: "6", date: "2024-03-23", description: "Starbucks Coffee", category: "Food", amount: 4.75, type: "expense" as const },
  { id: "7", date: "2024-03-22", description: "Utility Bill", category: "Utilities", amount: 145.20, type: "expense" as const },
  { id: "8", date: "2024-03-21", description: "Amazon Purchase", category: "Other", amount: 89.99, type: "expense" as const },
]

export default function Dashboard() {
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
              {/* Summary Cards */}
              <SectionCards />

              {/* Main Visualizations Grid */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-12 lg:px-6">
                <div className="lg:col-span-8">
                  <ChartAreaInteractive />
                </div>
                <div className="lg:col-span-4">
                  <SpendingBreakdownChart />
                </div>
              </div>

              {/* Insights and Recommendations Section */}
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
                        <p className="text-sm font-medium">Housing</p>
                        <p className="text-xs text-muted-foreground">$1,200.00 this month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-500/5 border-emerald-500/20">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <HugeiconsIcon icon={ChartHistogramIcon} strokeWidth={2} className="size-5 text-emerald-500" />
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider">Monthly Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-emerald-500/10 p-2 transition-colors">
                        <HugeiconsIcon icon={MoneyReceive01Icon} strokeWidth={2} className="size-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Income Up 12%</p>
                        <p className="text-xs text-muted-foreground">Compared to last month</p>
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
                        <p className="text-sm font-medium">Food budget at 85%</p>
                        <p className="text-xs text-muted-foreground">Slow down your spending!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transactions Section */}
              <div className="py-2">
                <div className="px-4 pb-4 lg:px-6">
                  <h2 className="text-lg font-semibold tracking-tight">Recent Transactions</h2>
                  <p className="text-sm text-muted-foreground">Manage and track your latest financial activities.</p>
                </div>
                <DataTable data={mockTransactions} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
