"use client"

import { ArrowLeft, Bell, Megaphone, Scale, MapPin, CalendarDays, Plus, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav, type TabId } from "@/components/bottom-nav"
import { ClassificationChips, type VarietyId, type GradeId } from "@/components/orange-classification"

type Status = "active" | "matched" | "closed"

type Listing = {
  id: number
  variety: VarietyId
  grade: GradeId
  price: number
  quantity: number
  area: string
  date: string
  status: Status
  responses: number
}

const LISTINGS: Listing[] = [
  {
    id: 1,
    variety: "honey",
    grade: "B",
    price: 38,
    quantity: 500,
    area: "อ.เมือง",
    date: "25 มิ.ย.",
    status: "active",
    responses: 4,
  },
  {
    id: 2,
    variety: "shogun",
    grade: "A",
    price: 45,
    quantity: 200,
    area: "อ.ลับแล",
    date: "23 มิ.ย.",
    status: "matched",
    responses: 2,
  },
  {
    id: 3,
    variety: "green",
    grade: "C",
    price: 30,
    quantity: 1000,
    area: "อ.เมือง และใกล้เคียง",
    date: "18 มิ.ย.",
    status: "closed",
    responses: 7,
  },
]

const STATUS_CONFIG: Record<Status, { label: string; cls: string }> = {
  active: { label: "กำลังเปิดรับ", cls: "bg-secondary/15 text-secondary" },
  matched: { label: "จับคู่แล้ว", cls: "bg-primary/15 text-primary" },
  closed: { label: "ปิดแล้ว", cls: "bg-muted text-muted-foreground" },
}

export function BuyerListings({
  onNavigate,
  onCreate,
}: {
  onNavigate: (id: TabId) => void
  onCreate?: () => void
}) {
  const activeCount = LISTINGS.filter((l) => l.status === "active").length

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 pb-3 pt-12">
        <button
          onClick={() => onNavigate("map")}
          aria-label="ย้อนกลับไปแผนที่"
          className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-6" />
        </button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">ผู้รับซื้อ</p>
          <h1 className="text-lg font-bold text-foreground">ประกาศของฉัน</h1>
        </div>
        <button
          aria-label="การแจ้งเตือน"
          className="relative flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <Bell className="size-6" />
          <span className="absolute right-3 top-3 size-2.5 rounded-full bg-primary ring-2 ring-card" />
        </button>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 pb-6">
        {/* Summary */}
        <section className="flex items-center gap-4 rounded-3xl border border-primary/20 bg-accent p-5">
          <span className="flex size-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Megaphone className="size-7" />
          </span>
          <div>
            <p className="text-sm font-medium text-muted-foreground">ประกาศที่กำลังเปิดรับ</p>
            <p className="text-xl font-extrabold leading-snug text-foreground">
              {activeCount} ประกาศ <span className="text-base font-medium text-muted-foreground">กำลังทำงาน</span>
            </p>
          </div>
        </section>

        {/* New listing */}
        <button
          onClick={onCreate}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/40 bg-card py-4 text-base font-semibold text-primary transition-colors hover:bg-accent active:translate-y-px"
        >
          <Plus className="size-5" aria-hidden="true" />
          สร้างประกาศรับซื้อใหม่
        </button>

        {/* Listings */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-foreground">ประกาศทั้งหมด</h2>
          <ul className="space-y-4">
            {LISTINGS.map((item) => {
              const status = STATUS_CONFIG[item.status]
              return (
                <li
                  key={item.id}
                  className="rounded-3xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="mt-0.5 text-2xl font-extrabold text-primary">
                        {item.price}{" "}
                        <span className="text-sm font-bold text-muted-foreground">บาท/กก.</span>
                      </p>
                    </div>
                    <span className={cn("rounded-full px-3 py-1.5 text-xs font-bold", status.cls)}>
                      {status.label}
                    </span>
                  </div>

                  <ClassificationChips variety={item.variety} grade={item.grade} size="sm" className="mt-3" />

                  <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
                    <Meta icon={<Scale className="size-4" />} label="ปริมาณ" value={`${item.quantity} กก.`} />
                    <Meta icon={<MapPin className="size-4" />} label="พื้นที่" value={item.area} />
                    <Meta icon={<CalendarDays className="size-4" />} label="วันที่" value={item.date} />
                  </dl>

                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-muted/60 px-4 py-3">
                    <MessageCircle className="size-5 flex-shrink-0 text-secondary" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">
                      มีเจ้าของสวนตอบกลับ {item.responses} ราย
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <BottomNav active="listings" onNavigate={onNavigate} />
    </div>
  )
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1 text-xs text-muted-foreground">
        <span className="text-muted-foreground">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 text-sm font-bold text-foreground text-pretty">{value}</dd>
    </div>
  )
}
