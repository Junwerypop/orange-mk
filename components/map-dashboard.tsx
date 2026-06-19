"use client"

import {
  ArrowLeft,
  Bell,
  Sprout,
  Leaf,
  Flower2,
  Cherry,
  Citrus,
  CircleDot,
  ShoppingBasket,
  Users,
  type LucideIcon,
} from "lucide-react"
import { BottomNav, type TabId } from "@/components/bottom-nav"

type Stage = {
  id: string
  label: string
  icon: LucideIcon
  color: string
}

const STAGES: Stage[] = [
  { id: "planted", label: "เพิ่งปลูก", icon: Sprout, color: "#B8CBB5" },
  { id: "growing", label: "กำลังเติบโต", icon: Leaf, color: "#8BA888" },
  { id: "flowering", label: "ออกดอก", icon: Flower2, color: "#FFD9A8" },
  { id: "young", label: "ติดผลอ่อน", icon: Cherry, color: "#FFC585" },
  { id: "developing", label: "ผลกำลังโต", icon: Citrus, color: "#FF9F43" },
  { id: "nearly", label: "ใกล้เก็บเกี่ยว", icon: CircleDot, color: "#F08A1D" },
  { id: "ready", label: "พร้อมเก็บเกี่ยว", icon: ShoppingBasket, color: "#B56A16" },
]

const STAGE_MAP = Object.fromEntries(STAGES.map((s) => [s.id, s])) as Record<string, Stage>

type Marker = {
  id: number
  top: string
  left: string
  label: string
  stage: string
}

const MARKERS: Marker[] = [
  { id: 1, top: "24%", left: "26%", label: "แปลง A", stage: "ready" },
  { id: 2, top: "34%", left: "66%", label: "แปลง B", stage: "developing" },
  { id: 3, top: "58%", left: "34%", label: "แปลง C", stage: "growing" },
  { id: 4, top: "70%", left: "70%", label: "แปลง D", stage: "flowering" },
  { id: 5, top: "48%", left: "50%", label: "แปลง E", stage: "young" },
]

export function MapDashboard({
  onBack,
  onSelectOrchard,
  onShowBuyers,
  onNavigate,
}: {
  onBack: () => void
  onSelectOrchard?: (id: number) => void
  onShowBuyers?: () => void
  onNavigate: (id: TabId) => void
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 pb-3 pt-12">
        <button
          onClick={onBack}
          aria-label="ย้อนกลับ"
          className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-6" />
        </button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">สวัสดี, คุณสมชาย</p>
          <h1 className="text-lg font-bold text-foreground">แผนที่สวนส้ม</h1>
        </div>
        <button
          aria-label="การแจ้งเตือน"
          className="relative flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <Bell className="size-6" />
          <span className="absolute right-3 top-3 size-2.5 rounded-full bg-primary ring-2 ring-card" />
        </button>
      </header>

      {/* Compact status legend — secondary reference chips */}
      <section className="relative z-20 px-5 pb-1">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STAGES.map((stage) => {
            const Icon = stage.icon
            return (
              <div
                key={stage.id}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 shadow-sm"
              >
                <span
                  className="flex size-6 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: stage.color }}
                >
                  <Icon className="size-3.5" />
                </span>
                <span className="whitespace-nowrap text-xs font-medium text-foreground">{stage.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Active buyers shortcut */}
      <section className="relative z-20 px-5 pt-2">
        <button
          onClick={onShowBuyers}
          className="flex w-full items-center gap-3 rounded-2xl border border-primary/20 bg-accent px-4 py-3 text-left shadow-sm transition-colors hover:bg-accent/70 active:translate-y-px"
        >
          <span className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Users className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-foreground">ผู้รับซื้อส้มในขณะนี้</span>
            <span className="block truncate text-xs text-muted-foreground">
              มีผู้รับซื้อ 4 ราย กำลังเปิดรับส้ม
            </span>
          </span>
          <span className="flex-shrink-0 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            ดู
          </span>
        </button>
      </section>

      {/* Map — primary focus, occupies most of the screen */}
      <div className="relative z-10 mx-5 mt-2 flex-1 overflow-hidden rounded-3xl border border-border shadow-sm">
        <img
          src="/orchard-map.png"
          alt="แผนที่มุมมองด้านบนของสวนส้ม"
          className="absolute inset-0 size-full object-cover"
        />

        {/* Orchard markers */}
        {MARKERS.map((m) => {
          const stage = STAGE_MAP[m.stage]
          const Icon = stage.icon
          return (
            <div
              key={m.id}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ top: m.top, left: m.left }}
            >
              <button
                onClick={() => onSelectOrchard?.(m.id)}
                className="flex flex-col items-center transition-transform active:scale-95"
                aria-label={`${m.label} ${stage.label} — ดูรายละเอียด`}
              >
                <span className="mb-1 rounded-full bg-card px-2 py-0.5 text-[11px] font-semibold text-foreground shadow-sm">
                  {m.label}
                </span>
                <span
                  className="flex size-10 items-center justify-center rounded-full text-white shadow-md ring-4 ring-card/80"
                  style={{ backgroundColor: stage.color }}
                >
                  <Icon className="size-5" />
                </span>
                <span
                  className="-mt-0.5 size-0 border-x-[6px] border-t-[8px] border-x-transparent"
                  style={{ borderTopColor: stage.color }}
                />
              </button>
            </div>
          )
        })}

        {/* You are here - dominant pulsing red marker */}
        <div className="absolute -translate-x-1/2 -translate-y-full" style={{ top: "62%", left: "54%" }}>
          <div className="flex flex-col items-center">
            <span className="mb-1 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-white shadow-md">
              คุณอยู่ที่นี่
            </span>
            <span className="relative flex size-14 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-40" />
              <span className="absolute inline-flex size-10 animate-ping rounded-full bg-destructive opacity-60 [animation-delay:200ms]" />
              <span className="relative flex size-8 items-center justify-center rounded-full bg-destructive text-white shadow-lg ring-4 ring-card">
                <span className="size-3 rounded-full bg-white" />
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="mt-4">
        <BottomNav active="map" onNavigate={onNavigate} />
      </div>
    </div>
  )
}
