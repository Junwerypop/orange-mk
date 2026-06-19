"use client"

import { Phone, MessageCircle, Mail, ChevronRight, ArrowLeft, LifeBuoy, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav, type TabId } from "@/components/bottom-nav"

type Channel = {
  icon: LucideIcon
  label: string
  value: string
  href: string
  tone: "primary" | "secondary"
}

const CHANNELS: Channel[] = [
  {
    icon: Phone,
    label: "โทรหาเจ้าหน้าที่",
    value: "02-123-4567",
    href: "tel:021234567",
    tone: "primary",
  },
  {
    icon: MessageCircle,
    label: "แชทไลน์ช่วยเหลือ",
    value: "@orangeorchard",
    href: "#",
    tone: "secondary",
  },
  {
    icon: Mail,
    label: "ส่งอีเมล",
    value: "help@orangeorchard.app",
    href: "mailto:help@orangeorchard.app",
    tone: "secondary",
  },
]

const FAQ = [
  { q: "จะอัพเดตสถานะสวนได้อย่างไร?", a: "ไปที่เมนู “อัพเดตสถานะ” เลือกระยะการเติบโต แนบรูปและตั้งราคา จากนั้นกดบันทึก" },
  { q: "ผู้รับซื้อจะติดต่อเราได้อย่างไร?", a: "ผู้รับซื้อจะเห็นเบอร์โทรของคุณในหน้ารายละเอียดสวน และสามารถกดโทรหาได้ทันที" },
  { q: "ลืมรหัสผ่านทำอย่างไร?", a: "ไปที่หน้าตั้งค่า เลือก “เปลี่ยนรหัสผ่าน” หรือโทรหาเจ้าหน้าที่เพื่อขอความช่วยเหลือ" },
]

export function SupportScreen({
  onBack,
  onNavigate,
}: {
  onBack: () => void
  onNavigate: (id: TabId) => void
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 pb-3 pt-12">
        <button
          onClick={onBack}
          aria-label="ย้อนกลับไปหน้าตั้งค่า"
          className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-lg font-bold text-foreground">ติดต่อช่วยเหลือ</h1>
        <span className="size-12" aria-hidden="true" />
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 pb-6">
        {/* Intro */}
        <section className="flex items-center gap-4 rounded-3xl border border-secondary/30 bg-secondary/10 p-5">
          <span className="flex size-14 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-sm">
            <LifeBuoy className="size-7" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium text-muted-foreground">เราพร้อมช่วยเหลือคุณ</p>
            <p className="text-xl font-extrabold leading-snug text-foreground text-balance">มีปัญหาการใช้งาน?</p>
          </div>
        </section>

        {/* Contact channels */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">ช่องทางติดต่อ</h2>
          {CHANNELS.map((c) => {
            const Icon = c.icon
            return (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 rounded-3xl border border-border bg-card px-4 py-4 shadow-sm transition-colors hover:bg-muted active:translate-y-px"
              >
                <span
                  className={cn(
                    "flex size-12 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm",
                    c.tone === "primary"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-primary",
                  )}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold text-foreground">{c.label}</span>
                  <span className="block truncate text-sm text-muted-foreground">{c.value}</span>
                </span>
                <ChevronRight className="size-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              </a>
            )
          })}
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">คำถามที่พบบ่อย</h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                <p className="text-base font-bold text-foreground text-pretty">{item.q}</p>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground text-pretty">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hours */}
        <p className="text-center text-sm text-muted-foreground">
          เวลาทำการ: จันทร์ – เสาร์ 08:00 – 18:00 น.
        </p>
      </div>

      <BottomNav active="settings" onNavigate={onNavigate} />
    </div>
  )
}
