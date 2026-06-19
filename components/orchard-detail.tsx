"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Phone,
  MapPin,
  Citrus,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  CheckCircle2,
  Clock,
  ImageIcon,
  BadgeCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav, type TabId } from "@/components/bottom-nav"

const PHOTOS = ["/orchard-photo-1.png", "/orchard-photo-2.png", "/orchard-photo-3.png"]

type StatusTone = {
  label: string
  bg: string
  text: string
}

// Soft pill badge tones keyed to the growth stage.
const STATUS: StatusTone = {
  label: "ใกล้เก็บเกี่ยว",
  bg: "rgba(240, 138, 29, 0.14)",
  text: "#B56A16",
}

const DETAILS = [
  { label: "สายพันธุ์ส้ม", value: "ส้มสายน้ำผึ้ง" },
  { label: "อายุผลผลิต", value: "ประมาณ 8 เดือน" },
  { label: "ช่วงเก็บเกี่ยว", value: "ปลายเดือนนี้ – ต้นเดือนหน้า" },
  { label: "ปริมาณโดยประมาณ", value: "ราว 2,500 กก." },
]

const TRUST = [
  { icon: Clock, label: "อัปเดตล่าสุด 2 วันที่แล้ว" },
  { icon: ImageIcon, label: "มีรูปภาพสวน" },
  { icon: BadgeCheck, label: "ยืนยันตำแหน่งแล้ว" },
]

export function OrchardDetail({
  onBack,
  onViewMap,
  onShowBuyers,
  onNavigate,
}: {
  onBack: () => void
  onViewMap?: () => void
  onShowBuyers?: () => void
  onNavigate: (id: TabId) => void
}) {
  const [index, setIndex] = useState(0)

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + PHOTOS.length) % PHOTOS.length)
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 pb-3 pt-12">
        <button
          onClick={onBack}
          aria-label="ย้อนกลับไปแผนที่"
          className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-lg font-bold text-foreground">รายละเอียดสวนส้ม</h1>
        <span className="size-12" aria-hidden="true" />
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 pb-6">
        {/* Photo gallery */}
        <section>
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[index] || "/placeholder.svg"}
              alt={`รูปภาพสวนส้ม รูปที่ ${index + 1}`}
              className="h-60 w-full object-cover"
            />

            {/* Photo count indicator */}
            <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-foreground/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <ImageIcon className="size-3.5" aria-hidden="true" />
              {index + 1} / {PHOTOS.length}
            </span>

            {/* Prev / next controls */}
            <button
              onClick={() => go(-1)}
              aria-label="รูปก่อนหน้า"
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-card"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="รูปถัดไป"
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-card"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Pagination dots */}
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`ไปที่รูปที่ ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-6 bg-white" : "w-2 bg-white/60",
                  )}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Summary card */}
        <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
                <Citrus className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-xl font-bold text-foreground">สวนส้มสมชาย</h2>
            </div>
            <span
              className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold"
              style={{ backgroundColor: STATUS.bg, color: STATUS.text }}
            >
              <CircleDot className="size-4" aria-hidden="true" />
              {STATUS.label}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-base text-foreground">
            <User className="size-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground">ชื่อผู้ขาย:</span>
            <span className="font-semibold">สมชาย ใจดี</span>
          </div>

          {/* Price emphasis */}
          <div className="mt-4 flex items-end justify-between rounded-2xl bg-accent px-4 py-3">
            <span className="text-sm font-medium text-accent-foreground">ราคา</span>
            <span className="text-2xl font-extrabold text-primary">
              35 <span className="text-base font-semibold">บาท/กก.</span>
            </span>
          </div>
        </section>

        {/* Contact information */}
        <section className="space-y-3 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-base font-bold text-foreground">ข้อมูลติดต่อ</h3>
          <div className="flex items-center gap-3">
            <span className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-secondary">
              <Phone className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">เบอร์โทร</p>
              <p className="text-base font-semibold text-foreground">081-234-5678</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-secondary">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">ที่อยู่</p>
              <p className="text-base font-semibold leading-relaxed text-foreground">
                123 หมู่ 4 ต.ในเมือง อ.เมือง จ.เชียงใหม่
              </p>
            </div>
          </div>
        </section>

        {/* Additional details */}
        <section className="space-y-3 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-base font-bold text-foreground">รายละเอียดเพิ่มเติม</h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            ส้มสายน้ำผึ้งปลูกแบบปลอดสารเคมี รสชาติหวานฉ่ำ เนื้อแน่น เก็บจากต้นสดทุกวัน
            พร้อมจัดส่งและรับซื้อยกสวน
          </p>
          <dl className="divide-y divide-border">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex items-center justify-between py-2.5">
                <dt className="text-sm text-muted-foreground">{d.label}</dt>
                <dd className="text-base font-semibold text-foreground">{d.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Trust indicators */}
        <section className="flex flex-wrap gap-2">
          {TRUST.map((t) => {
            const Icon = t.icon
            return (
              <span
                key={t.label}
                className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
              >
                <CheckCircle2 className="size-4 text-secondary" aria-hidden="true" />
                {t.label}
                <Icon className="sr-only" />
              </span>
            )
          })}
        </section>

        {/* Action buttons */}
        <div className="space-y-3 pt-1">
          <a
            href="tel:0812345678"
            className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:translate-y-px"
          >
            <Phone className="size-5" aria-hidden="true" />
            ติดต่อผู้ขาย
          </a>
          <button
            onClick={onViewMap}
            className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-card text-lg font-semibold text-primary transition-colors hover:bg-accent active:translate-y-px"
          >
            <MapPin className="size-5" aria-hidden="true" />
            ดูบนแผนที่
          </button>
          <button
            onClick={onShowBuyers}
            className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-secondary text-lg font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 active:translate-y-px"
          >
            <Users className="size-5" aria-hidden="true" />
            ดูผู้รับซื้อส้ม
          </button>
        </div>
      </div>

      <BottomNav active="map" onNavigate={onNavigate} />
    </div>
  )
}
