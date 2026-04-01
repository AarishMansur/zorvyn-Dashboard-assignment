"use client"


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

export function TransactionForm() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="bg-primary text-primary-foreground shadow-sm">
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
          <span>Add Transaction</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Enter the details of your new financial transaction.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-4" />
              Date
            </Label>
            <Input id="date" type="date" className="w-full" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="e.g. Grocery Store" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select defaultValue="expense">
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
              <Select defaultValue="food">
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
            <Input id="amount" type="number" step="0.01" placeholder="0.00" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="w-full">Save Transaction</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
