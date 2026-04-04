import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignCircleIcon, Mail01Icon } from "@hugeicons/core-free-icons"

const containerVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
}

export function NavMain({
  items,
  open,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
  open: boolean
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <HugeiconsIcon icon={PlusSignCircleIcon} strokeWidth={2} />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="overflow-hidden">
          <motion.div
            initial="closed"
            animate={open ? "open" : "closed"}
            variants={containerVariants}
            className="flex flex-col gap-1"
          >
            {items.map((item) => (
              <motion.div key={item.title} variants={itemVariants}>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </motion.div>
            ))}
          </motion.div>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
