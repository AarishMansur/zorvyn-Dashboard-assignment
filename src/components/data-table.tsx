"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  FilterIcon,
  Search01Icon,
  MoreVerticalCircle01Icon,
  LeftToRightListBulletIcon,
  ArrowDown01Icon
} from "@hugeicons/core-free-icons"
import { TransactionForm } from "./transaction-form"
import { useFinanceStore } from "@/store/useFinanceStore"

import type { Transaction } from "@/types/transaction.types"

export const transactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  description: z.string(),
  category: z.enum(["Salary", "Food", "Shopping", "Bills", "Entertainment", "Other"]),
  amount: z.number(),
  type: z.enum(["income", "expense"]),
})

export function DataTable({
  data,
}: {
  data: Transaction[]
}) {
  const role = useFinanceStore((s) => s.role)
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction)

  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | null>(null)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)

  const columns = React.useMemo<ColumnDef<Transaction>[]>(() => [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {new Date(row.getValue("date")).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-normal">
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const type = row.original.type

        return (
          <div className={`text-right font-mono font-medium ${type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
            {type === 'income' ? '+' : '-'}${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        if (role !== "admin") return null;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                size="icon"
              >
                <HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => {
                  setEditingTransaction(row.original)
                  setIsSheetOpen(true)
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => deleteTransaction(row.original.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ], [role, deleteTransaction])

  const filters = useFinanceStore((s) => s.filters)
  const setCategory = useFinanceStore((s) => s.setCategory)

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      actions: role === 'admin'
    })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])


  React.useEffect(() => {
    const tableFilters: ColumnFiltersState = []
    if (filters.category !== "all") {
      tableFilters.push({ id: "category", value: filters.category })
    }
    if (filters.search) {
      tableFilters.push({ id: "description", value: filters.search })
    }
    setColumnFilters(tableFilters)
  }, [filters.category, filters.search])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-sm">
            <HugeiconsIcon
              icon={Search01Icon}
              strokeWidth={2}
              className="absolute left-2.5 top-2.5 size-4 text-muted-foreground"
            />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={filters.search}
              onChange={(event) =>
                useFinanceStore.getState().setSearch(event.target.value)
              }
            />
          </div>
          <Select value={filters.category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <HugeiconsIcon icon={FilterIcon} strokeWidth={2} className="mr-2 size-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Salary">Salary</SelectItem>
              <SelectItem value="Bills">Bills</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <HugeiconsIcon icon={LeftToRightListBulletIcon} strokeWidth={2} data-icon="inline-start" />
                Columns
                <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex-1 sm:flex-none">
            <TransactionForm
              transaction={editingTransaction}
              open={isSheetOpen}
              onOpenChange={(open) => {
                setIsSheetOpen(open)
                if (!open) setEditingTransaction(null)
              }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6">
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="h-10 py-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{table.getRowModel().rows.length}</strong> transactions
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
