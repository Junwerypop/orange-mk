"use client"

import { createContext, useContext } from "react"
import {
  Map,
  TrendingUp,
  RefreshCw,
  Settings,
  Tag,
  Megaphone,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type UserRole = "owner" | "buyer"

export type TabId = "map" | "price" | "orchard" | "update" | "settings" | "pricing" | "listings"

// Custom orange fruit icon (replaces Citrus/watermelon)
function OrangeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Leaf */}
      <path d="M12 4 C13 2, 15.5 2, 16 3.5" strokeWidth="1.5" />
      {/* Orange circle */}
      <circle cx="12" cy="13" r="8" />
      {/* Segment lines */}
      <path d="M12 5 Q14 9 12 13 Q10 9 12 5" strokeWidth="1" opacity="0.55" />
      <path d="M4.1 10 Q8.5 11.5 12 13 Q8 15.5 4.1 10" strokeWidth="1" opacity="0.55" />
      <path d="M19.9 10 Q15.5 11.5 12 13 Q16 15.5 19.9 10" strokeWidth="1" opacity="0.55" />
    </svg>
  )
}

const NAV_ITEMS: Record<UserRole, { id: TabId; label: string; icon: LucideIcon | typeof OrangeIcon }[]> = {
  owner: [
    { id: "map", label: "แผนที่", icon: Map },
    { id: "price", label: "ราคาตลาดไท", icon: TrendingUp },
    { id: "orchard", label: "สวนของฉัน", icon: OrangeIcon },
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
