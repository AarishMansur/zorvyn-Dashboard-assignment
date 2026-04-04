import { useMemo } from "react"
import { useFinanceStore } from "@/store/useFinanceStore"
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
  const transactions = useFinanceStore((s) => s.transactions)

  const stats = useMemo(() => {
    const totalBalance = transactions.reduce((acc, t) =>
      t.type === 'income' ? acc + t.amount : acc - t.amount, 0)

    // Get current month stats (June 2024 for mock data)
    const currentMonth = "2024-06"
    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && t.date.startsWith(currentMonth))
      .reduce((acc, t) => acc + t.amount, 0)

    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
      .reduce((acc, t) => acc + t.amount, 0)

    const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0

    return { totalBalance, monthlyIncome, monthlyExpenses, savingsRate }
  }, [transactions])

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card bg-linear-to-br from-primary/10 to-transparent">
        <CardHeader>
          <CardDescription>Total Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl font-mono">
            ${stats.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </CardTitle>
          <CardAction>
            <HugeiconsIcon icon={Wallet02Icon} strokeWidth={2} className="size-5 text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-emerald-500">
            Active Store{" "}
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
            ${stats.monthlyIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </CardTitle>
          <CardAction>
            <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-5 text-emerald-500" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            This Month (June){" "}
          </div>
          <div className="text-muted-foreground">
            Salary and extra earnings
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl font-mono">
            ${stats.monthlyExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </CardTitle>
          <CardAction>
            <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="size-5 text-rose-500" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-rose-500">
            Total Spending{" "}
            <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} className="size-4" />
          </div>
          <div className="text-muted-foreground">Bills, Food, and Rent</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Savings Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl font-mono">
            {stats.savingsRate.toFixed(1)}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={`${stats.savingsRate > 20 ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-rose-500 text-rose-500 bg-rose-500/10'}`}>
              {stats.savingsRate > 20 ? 'Healthy' : 'Low'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Target: 20%{" "}
          </div>
          <div className="text-muted-foreground">Percentage of income saved</div>
        </CardFooter>
      </Card>
    </div>
  )
}
