"use client"

import { createContext, useContext } from "react"
import {
  Map,
  TrendingUp,
  Citrus,
  RefreshCw,
  Settings,
  Tag,
  Megaphone,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type UserRole = "owner" | "buyer"

export type TabId = "map" | "price" | "orchard" | "update" | "settings" | "pricing" | "listings"

const NAV_ITEMS: Record<UserRole, { id: TabId; label: string; icon: LucideIcon }[]> = {
  owner: [
    { id: "map", label: "แผนที่", icon: Map },
    { id: "price", label: "ราคาตลาดไท", icon: TrendingUp },
    { id: "orchard", label: "สวนของฉัน", icon: Citrus },
    { id: "update", label: "อัพเดตสถานะ", icon: RefreshCw },
    { id: "settings", label: "ตั้งค่า", icon: Settings },
  ],
  buyer: [
    { id: "map", label: "แผนที่", icon: Map },
    { id: "price", label: "ราคาตลาดไท", icon: TrendingUp },
    { id: "pricing", label: "ตั้งราคารับซื้อ", icon: Tag },
    { id: "listings", label: "ประกาศของฉัน", icon: Megaphone },
    { id: "settings", label: "ตั้งค่า", icon: Settings },
  ],
}

/** Shares the active user role with the bottom nav so screens don't have to thread it through props. */
const RoleContext = createContext<UserRole>("owner")

export function RoleProvider({ role, children }: { role: UserRole; children: React.ReactNode }) {
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>
}

export function useRole() {
  return useContext(RoleContext)
}

export function BottomNav({
  active,
  onNavigate,
}: {
  active: TabId
  onNavigate: (id: TabId) => void
}) {
  const role = useRole()
  const items = NAV_ITEMS[role]

  return (
    <nav className="sticky bottom-0 z-20 flex items-stretch justify-around border-t border-border bg-card px-1 pb-6 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = item.id === active
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-center transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-xl transition-colors",
                isActive && "bg-accent",
              )}
            >
              <Icon className="size-6" />
            </span>
            <span className="text-[11px] font-medium leading-tight text-balance">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
