"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  Tag,
  Citrus,
  Award,
  Scale,
  CalendarDays,
  MapPin,
  Megaphone,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav, type TabId } from "@/components/bottom-nav"
import {
  VARIETIES,
  GRADES,
  type VarietyId,
  type GradeId,
} from "@/components/orange-classification"

export function BuyerPricing({
  onNavigate,
  onPublished,
}: {
  onNavigate: (id: TabId) => void
  onPublished?: () => void
}) {
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [variety, setVariety] = useState<VarietyId>("honey")
  const [grade, setGrade] = useState<GradeId>("B")
  const [publishing, setPublishing] = useState(false)

  function handlePublish(e: React.FormEvent) {
    e.preventDefault()
    setPublishing(true)
    setTimeout(() => {
      setPublishing(false)
      onPublished?.()
    }, 650)
  }

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
          <h1 className="text-lg font-bold text-foreground">ตั้งราคารับซื้อ</h1>
        </div>
        <button
          aria-label="การแจ้งเตือน"
          className="relative flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <Bell className="size-6" />
          <span className="absolute right-3 top-3 size-2.5 rounded-full bg-primary ring-2 ring-card" />
        </button>
      </header>

      <form onSubmit={handlePublish} className="flex flex-1 flex-col">
        <div className="flex-1 space-y-7 overflow-y-auto px-5 pb-6">
          {/* Intro banner */}
          <section className="flex items-center gap-4 rounded-3xl border border-primary/20 bg-accent p-5">
            <span className="flex size-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Tag className="size-7" />
            </span>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ประกาศรับซื้อ</p>
              <p className="text-lg font-extrabold leading-snug text-foreground text-balance">
                ตั้งราคาเพื่อให้เจ้าของสวนเห็น
              </p>
            </div>
          </section>

          {/* Buy price */}
          <section className="space-y-2">
            <label htmlFor="buy-price" className="block text-base font-bold text-foreground">
              ราคารับซื้อ (บาท/กก.)
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-5 text-lg font-bold text-muted-foreground">฿</span>
              <input
                id="buy-price"
                type="number"
                inputMode="numeric"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="h-16 w-full rounded-2xl border border-input bg-card pl-11 pr-4 text-lg font-semibold text-foreground shadow-sm outline-none transition-all placeholder:font-normal placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </div>
            <p className="flex items-center gap-2 text-sm font-medium text-secondary">
              <span className="flex size-5 items-center justify-center rounded-full bg-secondary/15">
                <Sparkles className="size-3" />
              </span>
              ราคาตลาดวันนี้: 38 บาท/กก.
            </p>
          </section>

          {/* Quantity */}
          <section className="space-y-2">
            <label htmlFor="quantity" className="block text-base font-bold text-foreground">
              ปริมาณที่ต้องการ (กก.)
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-4 text-muted-foreground">
                <Scale className="size-5" aria-hidden="true" />
              </span>
              <input
                id="quantity"
                type="number"
                inputMode="numeric"
                min={0}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="เช่น 500"
                className="h-16 w-full rounded-2xl border border-input bg-card pl-12 pr-4 text-lg font-semibold text-foreground shadow-sm outline-none transition-all placeholder:font-normal placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </div>
          </section>

          {/* Variety selector */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">สายพันธุ์ส้มที่รับซื้อ</h2>
            <div className="grid grid-cols-2 gap-3">
              {VARIETIES.map((v) => {
                const active = variety === v.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariety(v.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-2 rounded-2xl border-2 p-3 text-left transition-all active:scale-[0.99]",
                      active
                        ? "border-primary bg-accent shadow-sm"
                        : "border-border bg-card hover:border-primary/40",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 flex-shrink-0 items-center justify-center rounded-xl transition-colors",
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Citrus className="size-5" />
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-sm font-bold",
                        active ? "text-accent-foreground" : "text-foreground",
                      )}
                    >
                      {v.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Grade selector */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">เกรดที่รับซื้อ</h2>
            <div className="space-y-3">
              {GRADES.map((g) => {
                const active = grade === g.id
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGrade(g.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.99]",
                      active
                        ? "border-primary bg-accent shadow-sm"
                        : "border-border bg-card hover:border-primary/40",
                    )}
                  >
                    <span
                      className="flex size-11 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: g.bg, color: g.text }}
                    >
                      <Award className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block text-base font-bold",
                          active ? "text-accent-foreground" : "text-foreground",
                        )}
                      >
                        {g.label} <span className="text-sm font-medium text-muted-foreground">· {g.tier}</span>
                      </span>
                      <span className="block text-sm text-muted-foreground">{g.desc}</span>
                    </span>
                    <span
                      className={cn(
                        "flex size-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        active ? "border-primary bg-primary" : "border-border",
                      )}
                    >
                      {active && <span className="size-2.5 rounded-full bg-primary-foreground" />}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Pickup details */}
          <section className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-foreground">รายละเอียดการรับซื้อ</h2>
              <p className="text-sm text-muted-foreground">ข้อมูลสำหรับเจ้าของสวน</p>
            </div>

            <Field
              id="pickup-date"
              label="วันที่ต้องการรับซื้อ"
              icon={<CalendarDays className="size-5" aria-hidden="true" />}
              type="date"
            />
            <Field
              id="pickup-area"
              label="พื้นที่รับซื้อ"
              icon={<MapPin className="size-5" aria-hidden="true" />}
              defaultValue="อ.เมือง และพื้นที่ใกล้เคียง"
              placeholder="ระบุพื้นที่"
            />
          </section>

          {/* Publish */}
          <button
            type="submit"
            disabled={publishing}
            className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-70"
          >
            {publishing ? (
              <span className="size-6 animate-spin rounded-full border-[3px] border-primary-foreground/40 border-t-primary-foreground" />
            ) : (
              <>
                <Megaphone className="size-5" aria-hidden="true" />
                ประกาศรับซื้อ
              </>
            )}
          </button>
        </div>
      </form>

      <BottomNav active="pricing" onNavigate={onNavigate} />
    </div>
  )
}

function Field({
  id,
  label,
  icon,
  ...props
}: {
  id: string
  label: string
  icon: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-medium text-foreground">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-4 text-muted-foreground">{icon}</span>
        <input
          id={id}
          className="h-16 w-full rounded-2xl border border-input bg-card pl-12 pr-4 text-lg text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
          {...props}
        />
      </div>
    </div>
  )
}
