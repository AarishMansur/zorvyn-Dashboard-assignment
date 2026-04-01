"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  ChartUpIcon, 
  Wallet02Icon, 
  ArrowUp01Icon, 
  ArrowDown01Icon 
} from "@hugeicons/core-free-icons"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card bg-linear-to-br from-primary/10 to-transparent">
        <CardHeader>
          <CardDescription>Total Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl font-mono">
            $24,560.00
          </CardTitle>
          <CardAction>
             <HugeiconsIcon icon={Wallet02Icon} strokeWidth={2} className="size-5 text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-emerald-500">
            +$1,200 this month{" "}
            <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Current net worth
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Income</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl font-mono">
            $8,400.00
          </CardTitle>
          <CardAction>
             <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-5 text-emerald-500" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Projected: $9,000.00{" "}
          </div>
          <div className="text-muted-foreground">
            Salary and side projects
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl font-mono">
            $3,240.00
          </CardTitle>
          <CardAction>
             <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="size-5 text-rose-500" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-rose-500">
            12% higher than last month{" "}
            <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} className="size-4" />
          </div>
          <div className="text-muted-foreground">Rent, Utilities, Food</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Savings Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl font-mono">
            61.4%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-emerald-500 text-emerald-500 bg-emerald-500/10">
              Healthy
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Target: 50%{" "}
          </div>
          <div className="text-muted-foreground">Exceeds financial goals</div>
        </CardFooter>
      </Card>
    </div>
  )
}
