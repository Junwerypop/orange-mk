"use client"

import {
  ArrowLeft,
  Bell,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Minus,
  Users,
  ChevronRight,
  CalendarDays,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav, type TabId } from "@/components/bottom-nav"
import { MarketChart, type ChartPoint } from "@/components/market-chart"

const SERIES: ChartPoint[] = [
  { label: "จ.", price: 29, lastWeek: 31 },
  { label: "อ.", price: 28, lastWeek: 30 },
  { label: "พ.", price: 30, lastWeek: 29 },
  { label: "พฤ.", price: 33, lastWeek: 30 },
  { label: "ศ.", price: 35, lastWeek: 32 },
  { label: "ส.", price: 36, lastWeek: 33 },
  { label: "อา.", price: 38, lastWeek: 33 },
]

type Trend = "up" | "down" | "flat"

const HISTORY: { date: string; price: number; trend: Trend }[] = [
  { date: "25 มิ.ย.", price: 38, trend: "up" },
  { date: "24 มิ.ย.", price: 35, trend: "up" },
  { date: "23 มิ.ย.", price: 30, trend: "flat" },
  { date: "22 มิ.ย.", price: 28, trend: "down" },
]

// Derived analytics
const prices = SERIES.map((d) => d.price)
const today = prices[prices.length - 1]
const prev = prices[prices.length - 2]
const change = today - prev
const changePct = ((change / prev) * 100).toFixed(1)
const avg7 = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
const high = Math.max(...prices)
const low = Math.min(...prices)

export function MarketPrice({
  onNavigate,
  onShowBuyers,
}: {
  onNavigate: (id: TabId) => void
  onShowBuyers?: () => void
}) {
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
          <p className="text-sm text-muted-foreground">ราคาส้มเขียวหวาน</p>
          <h1 className="text-lg font-bold text-foreground">ราคาตลาดไท</h1>
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
        {/* Summary cards */}
        <section className="grid grid-cols-2 gap-3">
          <SummaryCard
            label="ราคาวันนี้"
            value={today}
            tone="primary"
            icon={<TrendingUp className="size-5" aria-hidden="true" />}
            delta={`${change >= 0 ? "+" : ""}${change} (${change >= 0 ? "+" : ""}${changePct}%)`}
            deltaUp={change >= 0}
          />
          <SummaryCard
            label="ราคาเฉลี่ย 7 วัน"
            value={avg7}
            tone="blue"
            icon={<CalendarDays className="size-5" aria-hidden="true" />}
          />
          <SummaryCard
            label="ราคาสูงสุด"
            value={high}
            tone="green"
            icon={<ArrowUp className="size-5" aria-hidden="true" />}
          />
          <SummaryCard
            label="ราคาต่ำสุด"
            value={low}
            tone="muted"
            icon={<ArrowDown className="size-5" aria-hidden="true" />}
          />
        </section>

        {/* Interactive analytics chart */}
        <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-1 flex items-start justify-between">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">แนวโน้มราคา 7 วัน</h2>
              <p className="text-3xl font-extrabold text-foreground">
                {today} <span className="text-lg font-bold text-muted-foreground">บาท/กก.</span>
              </p>
            </div>
            <span
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold",
                change >= 0 ? "bg-secondary/15 text-secondary" : "bg-destructive/15 text-destructive",
              )}
            >
              {change >= 0 ? <ArrowUp className="size-4" /> : <ArrowDown className="size-4" />}
              {change >= 0 ? "+" : ""}
              {changePct}%
            </span>
          </div>

          {/* Legend */}
          <div className="mb-2 flex items-center gap-4">
            <LegendItem color="var(--chart-1)" label="สัปดาห์นี้" />
            <LegendItem color="var(--chart-blue)" label="สัปดาห์ก่อน" dashed />
          </div>

          <MarketChart data={SERIES} />
        </section>

        {/* Historical price list */}
        <section className="rounded-3xl border border-border bg-card p-2 shadow-sm">
          <h2 className="px-3 pb-1 pt-3 text-sm font-bold text-foreground">ราคาเฉลี่ยรายวัน</h2>
          <ul>
            {HISTORY.map((row, i) => (
              <li
                key={row.date}
                className={cn(
                  "flex items-center justify-between px-3 py-4",
                  i !== HISTORY.length - 1 && "border-b border-border",
                )}
              >
                <span className="text-base font-medium text-foreground">{row.date}</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-foreground">{row.price} บาท</span>
                  <TrendBadge trend={row.trend} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Active buyers shortcut */}
        <button
          onClick={onShowBuyers}
          className="flex w-full items-center gap-3 rounded-3xl border border-primary/20 bg-accent px-4 py-4 text-left shadow-sm transition-colors hover:bg-accent/70 active:translate-y-px"
        >
          <span className="flex size-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Users className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-bold text-foreground">ผู้รับซื้อส้มในขณะนี้</span>
            <span className="block truncate text-sm text-muted-foreground">
              ดูผู้รับซื้อที่กำลังเปิดรับส้ม
            </span>
          </span>
          <ChevronRight className="size-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
        </button>
      </div>

      <BottomNav active="price" onNavigate={onNavigate} />
    </div>
  )
}

function SummaryCard({
  label,
  value,
  icon,
  tone,
  delta,
  deltaUp,
}: {
  label: string
  value: number
  icon: React.ReactNode
  tone: "primary" | "blue" | "green" | "muted"
  delta?: string
  deltaUp?: boolean
}) {
  const toneCls = {
    primary: "bg-accent text-accent-foreground",
    blue: "bg-[#5b9bd5]/12 text-[#3877ad]",
    green: "bg-secondary/15 text-secondary",
    muted: "bg-muted text-muted-foreground",
  }[tone]

  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={cn("flex size-8 items-center justify-center rounded-xl", toneCls)}>{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-extrabold text-foreground">
        {value}
        <span className="ml-1 text-xs font-bold text-muted-foreground">บาท</span>
      </p>
      {delta && (
        <p
          className={cn(
            "mt-0.5 text-xs font-bold",
            deltaUp ? "text-secondary" : "text-destructive",
          )}
        >
          {delta}
        </p>
      )}
    </div>
  )
}

function LegendItem({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <span
        className="h-0.5 w-5 rounded-full"
        style={
          dashed
            ? { backgroundImage: `repeating-linear-gradient(to right, ${color} 0 5px, transparent 5px 9px)` }
            : { backgroundColor: color }
        }
      />
      {label}
    </span>
  )
}

function TrendBadge({ trend }: { trend: Trend }) {
  const config = {
    up: { Icon: ArrowUp, cls: "bg-secondary/15 text-secondary" },
    down: { Icon: ArrowDown, cls: "bg-destructive/15 text-destructive" },
    flat: { Icon: Minus, cls: "bg-muted text-muted-foreground" },
  }[trend]
  const { Icon, cls } = config
  return (
    <span className={cn("flex size-8 items-center justify-center rounded-full", cls)}>
      <Icon className="size-5" />
    </span>
  )
}
