
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserCircleIcon } from "@hugeicons/core-free-icons"
import { ThemeToggle } from "@/components/core/toggle-theme"
import { useFinanceStore } from "@/store/useFinanceStore"
export function SiteHeader() {

  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole)
  return (
    <header className="flex h-(--header-height) shrink-0 items-center justify-between border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Finance Dashboard</h1>
      </div>
      <div className="flex items-center gap-4 px-4 lg:px-6">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-4 bg-border/40" />
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={UserCircleIcon} strokeWidth={2} className="size-5 text-muted-foreground" />
          <Select value={role} onValueChange={(value) => setRole(value as 'viewer' | 'admin')} defaultValue="viewer">
            <SelectTrigger className="w-32 border-none bg-transparent shadow-none focus:ring-0">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="viewer">Viewer</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  )
}
