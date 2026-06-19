"use client"

import { useRef, useState } from "react"
import {
  ArrowLeft,
  Bell,
  Flower2,
  Leaf,
  CircleDot,
  ShoppingBasket,
  ImagePlus,
  Check,
  Store,
  User,
  Phone,
  MapPin,
  Save,
  X,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav, type TabId } from "@/components/bottom-nav"

type StageOption = {
  id: string
  label: string
  sub: string
  icon: LucideIcon
}

const STAGE_OPTIONS: StageOption[] = [
  { id: "flowering", label: "กำลังออกดอก", sub: "Flowering", icon: Flower2 },
  { id: "growing", label: "กำลังปลูก", sub: "Growing", icon: Leaf },
  { id: "nearly", label: "ใกล้เก็บเกี่ยว", sub: "Nearly Ready", icon: CircleDot },
  { id: "ready", label: "พร้อมเก็บแล้ว", sub: "Ready to Harvest", icon: ShoppingBasket },
]

export function UpdateStatus({
  onNavigate,
  onSave,
}: {
  onNavigate: (id: TabId) => void
  onSave?: () => void
}) {
  const [stage, setStage] = useState<string>("nearly")
  const [photo, setPhoto] = useState<string | null>(null)
  const [price, setPrice] = useState("")
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      onSave?.()
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
          <p className="text-sm text-muted-foreground">สวนของฉัน</p>
          <h1 className="text-lg font-bold text-foreground">อัพเดตสถานะ</h1>
        </div>
        <button
          aria-label="การแจ้งเตือน"
          className="relative flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <Bell className="size-6" />
          <span className="absolute right-3 top-3 size-2.5 rounded-full bg-primary ring-2 ring-card" />
        </button>
      </header>

      <form onSubmit={handleSave} className="flex flex-1 flex-col">
        <div className="flex-1 space-y-7 overflow-y-auto px-5 pb-6">
          {/* SECTION 1: Status & quick update */}
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-foreground">ระยะการเติบโต</h2>
              <p className="text-sm text-muted-foreground">เลือกสถานะปัจจุบันของสวน</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {STAGE_OPTIONS.map((opt) => {
                const Icon = opt.icon
                const active = stage === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStage(opt.id)}
                    aria-pressed={active}
                    className={cn(
                      "relative flex flex-col items-start gap-3 rounded-3xl border-2 p-4 text-left transition-all active:scale-[0.98]",
                      active
                        ? "border-primary bg-accent shadow-sm"
                        : "border-border bg-card hover:border-primary/40",
                    )}
                  >
                    {active && (
                      <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-4" />
                      </span>
                    )}
                    <span
                      className={cn(
                        "flex size-12 items-center justify-center rounded-2xl transition-colors",
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block text-base font-bold leading-tight",
                          active ? "text-accent-foreground" : "text-foreground",
                        )}
                      >
                        {opt.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">{opt.sub}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Image upload */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">รูปภาพสวน</h2>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFile} className="sr-only" />
            {photo ? (
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo || "/placeholder.svg"} alt="รูปภาพสวนที่แนบ" className="h-48 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  aria-label="ลบรูปภาพ"
                  className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-card"
                >
                  <X className="size-5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex h-40 w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-secondary/50 bg-secondary/10 text-center transition-colors hover:border-secondary"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm">
                  <ImagePlus className="size-7" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-foreground">แนบรูปภาพสวน</span>
                  <span className="block text-sm text-muted-foreground">Attach Photo · แตะเพื่อถ่ายหรือเลือกรูป</span>
                </span>
              </button>
            )}
          </section>

          {/* Price input */}
          <section className="space-y-2">
            <label htmlFor="price" className="block text-base font-bold text-foreground">
              ตั้งราคาขาย (บาท/กก.)
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-5 text-lg font-bold text-muted-foreground">฿</span>
              <input
                id="price"
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
              <span className="flex size-5 items-center justify-center rounded-full bg-secondary/15 text-[10px] font-bold">AI</span>
              ราคาแนะนำวันนี้: ไม่เกิน 35-40 บาท
            </p>
          </section>

          {/* SECTION 2: Orchard information */}
          <section className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-foreground">ข้อมูลสวน</h2>
              <p className="text-sm text-muted-foreground">แก้ไขข้อมูลติดต่อและรายละเอียดสวน</p>
            </div>

            <ProfileField
              id="orchard-name"
              label="ชื่อสวน"
              icon={<Store className="size-5" aria-hidden="true" />}
              defaultValue="สวนส้มสมชาย"
              placeholder="กรอกชื่อสวน"
            />
            <ProfileField
              id="seller-name"
              label="ชื่อผู้ขาย"
              icon={<User className="size-5" aria-hidden="true" />}
              defaultValue="สมชาย ใจดี"
              placeholder="กรอกชื่อผู้ขาย"
            />
            <ProfileField
              id="phone"
              label="เบอร์โทรศัพท์"
              icon={<Phone className="size-5" aria-hidden="true" />}
              type="tel"
              inputMode="tel"
              defaultValue="081-234-5678"
              placeholder="08X-XXX-XXXX"
            />
            <ProfileField
              id="address"
              label="ที่อยู่สวน"
              icon={<MapPin className="size-5" aria-hidden="true" />}
              defaultValue="123 หมู่ 4 ต.ในเมือง อ.เมือง"
              placeholder="กรอกที่อยู่สวน"
            />
          </section>

          {/* Save button */}
          <button
            type="submit"
            disabled={saving}
            className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-70"
          >
            {saving ? (
              <span className="size-6 animate-spin rounded-full border-[3px] border-primary-foreground/40 border-t-primary-foreground" />
            ) : (
              <>
                <Save className="size-5" aria-hidden="true" />
                บันทึกข้อมูล
              </>
            )}
          </button>
        </div>
      </form>

      <BottomNav active="update" onNavigate={onNavigate} />
    </div>
  )
}

function ProfileField({
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
