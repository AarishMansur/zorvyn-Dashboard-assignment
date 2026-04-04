"use client"

import * as React from "react"
import { Pie, PieChart, Label } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { useFinanceStore } from "@/store/useFinanceStore"

const categoryColors: Record<string, string> = {
  Food: "var(--color-chart-1)",
  Housing: "var(--color-chart-2)",
  Transport: "var(--color-chart-3)",
  Entertainment: "var(--color-chart-4)",
  Bills: "var(--color-chart-5)",
  Other: "var(--color-muted-foreground)",
  Utilities: "var(--color-chart-3)",
  Salary: "var(--color-chart-2)",
}

export function SpendingBreakdownChart() {
  const transactions = useFinanceStore((s) => s.transactions)

  const chartData = React.useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense")
    const breakdown = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(breakdown).map(([category, amount]) => ({
      category,
      amount,
      fill: categoryColors[category] || categoryColors.Other,
    }))
  }, [transactions])

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      amount: { label: "Amount" },
    }
    chartData.forEach((item) => {
      config[item.category.toLowerCase()] = {
        label: item.category,
        color: item.fill,
      }
    })
    return config
  }, [chartData])

  const totalSpending = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [chartData])

  if (chartData.length === 0) {
    return (
      <Card className="flex flex-col h-full items-center justify-center p-6 text-center text-muted-foreground">
        <p>No expense data available for the current month.</p>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>By Category - Current Month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              stroke="var(--color-foreground)"
              strokeWidth={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          ${totalSpending.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Spent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
