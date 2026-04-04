import { useEffect, useState } from "react"
import { useFinanceStore } from "@/store/useFinanceStore"
import type { Transaction } from "@/types/transaction.types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Calendar01Icon, Dollar01Icon, Tag01Icon } from "@hugeicons/core-free-icons"

interface TransactionFormProps {
  transaction?: Transaction | null
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function TransactionForm({ transaction, open, onOpenChange }: TransactionFormProps) {
  const addTransaction = useFinanceStore((s) => s.addTransaction)
  const editTransaction = useFinanceStore((s) => s.editTransaction)
  const role = useFinanceStore((s) => s.role)

  const [date, setdate] = useState(new Date().toISOString().split("T")[0])
  const [category, setCategory] = useState("Food")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  const isEditing = !!transaction

  useEffect(() => {
    if (transaction) {
      setdate(transaction.date)
      setCategory(transaction.category)
      setType(transaction.type)
      setAmount(transaction.amount.toString())
      setDescription(transaction.description)
    } else {
      setdate(new Date().toISOString().split("T")[0])
      setCategory("Food")
      setType("expense")
      setAmount("")
      setDescription("")
    }
  }, [transaction, open])

  const handleSubmit = () => {
    if (!amount) return

    const transactionData = {
      id: isEditing && transaction ? transaction.id : crypto.randomUUID(),
      date,
      description,
      amount: Number(amount),
      category: category as any,
      type,
    }

    if (isEditing) {
      editTransaction(transactionData)
    } else {
      addTransaction(transactionData)
    }

    if (!isEditing) {
      setAmount("")
      setDescription("")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {!isEditing && (
        <SheetTrigger asChild>
          {role === 'admin' && (
            <Button variant="default" className="bg-primary text-primary-foreground shadow-sm">
              <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
              <span>Add Transaction</span>
            </Button>
          )}
        </SheetTrigger>
      )}
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Transaction" : "Add Transaction"}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Update the details of your financial transaction."
              : "Enter the details of your new financial transaction."}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-4" />
              Date
            </Label>
            <Input id="date" type="date" className="w-full" value={date} onChange={(e) => setdate(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Grocery Store"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={(val) => setType(val as any)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <HugeiconsIcon icon={Tag01Icon} strokeWidth={2} className="size-4" />
                Category
              </Label>
              <Select value={category} onValueChange={(val) => setCategory(val)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount" className="flex items-center gap-2">
              <HugeiconsIcon icon={Dollar01Icon} strokeWidth={2} className="size-4" />
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSubmit} className="w-full">
              {isEditing ? "Update Transaction" : "Save Transaction"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
