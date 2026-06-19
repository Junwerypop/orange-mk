"use client"

import { useMemo, useState } from "react"
import {
  ArrowLeft,
  Users,
  Package,
  Building2,
  Clock,
  Phone,
  X,
  MessageCircle,
  Inbox,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav, type TabId } from "@/components/bottom-nav"

type Buyer = {
  id: number
  name: string
  priceMin: number
  priceMax: number
  /** Demand in tonnes. */
  demand: number
  /** Minutes since last update. */
  updatedMinsAgo: number
  phone: string
  lineId: string
  note: string
  attractive: boolean
}

const BUYERS: Buyer[] = [
  {
    id: 1,
    name: "เฮียเล้ง ตลาดไท",
    priceMin: 35,
    priceMax: 38,
    demand: 12,
    updatedMinsAgo: 60,
    phone: "081-234-5678",
    lineId: "@henglengfruit",
    note: "รับซื้อส้มสายน้ำผึ้งคุณภาพดี ขนาดกลาง-ใหญ่ จ่ายเงินสดทันที รับยกสวน",
    attractive: true,
  },
  {
    id: 2,
    name: "บริษัท ไทยฟรุ๊ต จำกัด",
    priceMin: 33,
    priceMax: 36,
    demand: 8,
    updatedMinsAgo: 180,
    phone: "02-555-1234",
    lineId: "@thaifruit",
    note: "ต้องการส้มเพื่อส่งออก เน้นผลสวย ไม่มีตำหนิ มีรถห้องเย็นรับถึงสวน",
    attractive: true,
  },
  {
    id: 3,
    name: "สหกรณ์ผลไม้ภาคเหนือ",
    priceMin: 30,
    priceMax: 32,
    demand: 20,
    updatedMinsAgo: 300,
    phone: "053-789-456",
    lineId: "@northfruitcoop",
    note: "รับซื้อปริมาณมากต่อเนื่อง เหมาะกับสวนขนาดใหญ่ ทำสัญญารายเดือนได้",
    attractive: false,
  },
  {
    id: 4,
    name: "ร้านส้มป้านิด",
    priceMin: 36,
    priceMax: 40,
    demand: 5,
    updatedMinsAgo: 25,
    phone: "089-876-5432",
    lineId: "@panitorange",
    note: "รับซื้อส้มหวานสำหรับขายปลีก เน้นรสชาติดี รับครั้งละไม่เกิน 5 ตัน",
    attractive: true,
  },
]

type Filter = "price-high" | "recent" | "demand-high"

const FILTERS: { id: Filter; label: string }[] = [
  { id: "price-high", label: "ราคาสูงสุด" },
  { id: "recent", label: "ราคาล่าสุด" },
  { id: "demand-high", label: "ปริมาณมากที่สุด" },
]

function formatUpdated(mins: number): string {
  if (mins < 60) return `อัพเดตเมื่อ ${mins} นาทีที่แล้ว`
  const hrs = Math.round(mins / 60)
  return `อัพเดตเมื่อ ${hrs} ชม. ที่แล้ว`
}

export function ActiveBuyers({
  onBack,
  onNavigate,
}: {
  onBack: () => void
  onNavigate: (id: TabId) => void
}) {
  const [filter, setFilter] = useState<Filter>("price-high")
  const [selected, setSelected] = useState<Buyer | null>(null)

  const buyers = useMemo(() => {
    const list = [...BUYERS]
    if (filter === "price-high") list.sort((a, b) => b.priceMax - a.priceMax)
    if (filter === "recent") list.sort((a, b) => a.updatedMinsAgo - b.updatedMinsAgo)
    if (filter === "demand-high") list.sort((a, b) => b.demand - a.demand)
    return list
  }, [filter])

  const totalDemand = BUYERS.reduce((sum, b) => sum + b.demand, 0)

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="relative z-20 px-5 pb-2 pt-12">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            aria-label="ย้อนกลับ"
            className="flex size-12 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-foreground">ผู้รับซื้อส้มในขณะนี้</h1>
            <p className="truncate text-sm text-muted-foreground">
              ค้นหาผู้รับซื้อที่กำลังต้องการส้มในช่วงเวลานี้
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-6 pt-2">
        {/* Summary card */}
        <section className="grid grid-cols-2 gap-3">
          <SummaryStat
            icon={Users}
            label="ผู้รับซื้อที่กำลังเปิดรับ"
            value={`${BUYERS.length} ราย`}
          />
          <SummaryStat
            icon={Package}
            label="ปริมาณความต้องการรวม"
            value={`${totalDemand} ตัน`}
          />
        </section>

        {/* Filter chips */}
        <section
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="ตัวกรองรายการผู้รับซื้อ"
        >
          {FILTERS.map((f) => {
            const isActive = f.id === filter
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={isActive}
                className={cn(
                  "flex-shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                {f.label}
              </button>
            )
          })}
        </section>

        {/* Buyer list / empty state */}
        {buyers.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-3">
            {buyers.map((b) => (
              <li key={b.id}>
                <BuyerCard buyer={b} onContact={() => setSelected(b)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <BottomNav active="map" onNavigate={onNavigate} />

      {/* Contact modal */}
      {selected && <ContactModal buyer={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function SummaryStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-3xl border border-primary/20 bg-accent p-4 shadow-sm">
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="mt-3 text-xs font-medium leading-snug text-accent-foreground">{label}</p>
      <p className="mt-0.5 text-2xl font-extrabold text-foreground">{value}</p>
    </div>
  )
}

function BuyerCard({ buyer, onContact }: { buyer: Buyer; onContact: () => void }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      {/* Name */}
      <div className="flex items-center gap-3">
        <span className="flex size-11 flex-shrink-0 items-center justify-center rounded-2xl bg-muted text-secondary">
          <Building2 className="size-6" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-bold leading-snug text-foreground text-balance">{buyer.name}</h2>
      </div>

      {/* Price */}
      <div
        className={cn(
          "mt-4 flex items-center justify-between rounded-2xl px-4 py-3",
          buyer.attractive ? "bg-secondary/12" : "bg-muted",
        )}
      >
        <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          {buyer.attractive && <TrendingUp className="size-4 text-secondary" aria-hidden="true" />}
          ราคารับซื้อ
        </span>
        <span
          className={cn(
            "text-xl font-extrabold",
            buyer.attractive ? "text-secondary" : "text-foreground",
          )}
        >
          {buyer.priceMin} - {buyer.priceMax}{" "}
          <span className="text-sm font-semibold">บาท/กก.</span>
        </span>
      </div>

      {/* Demand + updated */}
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Package className="size-5 text-muted-foreground" aria-hidden="true" />
          ต้องการ: {buyer.demand} ตัน
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden="true" />
          {formatUpdated(buyer.updatedMinsAgo)}
        </span>
      </div>

      {/* Action */}
      <button
        onClick={onContact}
        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:translate-y-px"
      >
        <Phone className="size-5" aria-hidden="true" />
        ติดต่อผู้ซื้อ
      </button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm">
      <span className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Inbox className="size-10" aria-hidden="true" />
      </span>
      <p className="mt-5 text-lg font-bold text-foreground text-balance">
        ยังไม่มีผู้รับซื้อที่กำลังเปิดรับในขณะนี้
      </p>
      <p className="mt-1 text-base text-muted-foreground">โปรดลองกลับมาใหม่ภายหลัง</p>
    </div>
  )
}

function ContactModal({ buyer, onClose }: { buyer: Buyer; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`ข้อมูลติดต่อ ${buyer.name}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl border border-border bg-card p-5 pb-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grabber + close */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 flex-shrink-0 items-center justify-center rounded-2xl bg-muted text-secondary">
              <Building2 className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">ข้อมูลติดต่อผู้รับซื้อ</p>
              <h2 className="text-lg font-bold leading-snug text-foreground">{buyer.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="ปิด"
            className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Demand detail */}
        <div className="rounded-2xl bg-accent px-4 py-3">
          <p className="text-sm font-medium text-accent-foreground">รายละเอียดความต้องการซื้อ</p>
          <p className="mt-1 text-base leading-relaxed text-foreground">{buyer.note}</p>
          <div className="mt-3 flex items-center justify-between border-t border-primary/15 pt-3">
            <span className="text-sm text-muted-foreground">ราคา / ปริมาณ</span>
            <span className="text-base font-bold text-foreground">
              {buyer.priceMin}-{buyer.priceMax} บาท/กก. · {buyer.demand} ตัน
            </span>
          </div>
        </div>

        {/* Contact channels */}
        <div className="mt-4 space-y-3">
          <ChannelRow icon={Phone} label="เบอร์โทรศัพท์" value={buyer.phone} />
          <ChannelRow icon={MessageCircle} label="Line ID" value={buyer.lineId} />
        </div>

        {/* Primary action */}
        <a
          href={`tel:${buyer.phone.replace(/-/g, "")}`}
          className="mt-5 flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:translate-y-px"
        >
          <Phone className="size-5" aria-hidden="true" />
          โทรหาผู้ซื้อ
        </a>
      </div>
    </div>
  )
}

function ChannelRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
      <span className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-secondary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate text-base font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}
