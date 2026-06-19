"use client"

import { useState } from "react"
import { Phone, Lock, ShieldCheck, MapPin, Eye, EyeOff, Sprout, Truck, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { OrchardBackground } from "@/components/orchard-background"

type Mode = "login" | "register"
type Role = "owner" | "buyer"

export function AuthScreen({ onAuthenticated }: { onAuthenticated: (role: Role) => void }) {
  const [mode, setMode] = useState<Mode>("login")
  const [role, setRole] = useState<Role>("owner")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const isRegister = mode === "register"

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    // simulate a brief auth round-trip, then move to the role-specific experience
    setTimeout(() => {
      onAuthenticated(role)
    }, 650)
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <OrchardBackground intense={isRegister} />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-10 pt-14">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-sm">
            <Sprout className="size-8" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-pretty text-2xl font-bold text-foreground">สวนส้มของเรา</h1>
          <p className="mt-1 text-base text-muted-foreground">ระบบติดตามและจัดการสวนส้ม</p>
        </div>

        {/* Segmented tabs */}
        <div
          role="tablist"
          aria-label="เลือกเข้าสู่ระบบหรือสมัครสมาชิก"
          className="mb-7 flex rounded-2xl border border-border bg-muted/70 p-1.5"
        >
          <SegTab active={!isRegister} onClick={() => setMode("login")}>
            เข้าสู่ระบบ
          </SegTab>
          <SegTab active={isRegister} onClick={() => setMode("register")}>
            สมัครสมาชิก
          </SegTab>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
          <div className="space-y-5">
            <Field
              id="phone"
              label="เบอร์โทรศัพท์"
              icon={<Phone className="size-5" aria-hidden="true" />}
              type="tel"
              inputMode="tel"
              placeholder="08X-XXX-XXXX"
              autoComplete="tel"
            />

            <Field
              id="password"
              label="รหัสผ่าน"
              icon={<Lock className="size-5" aria-hidden="true" />}
              type={showPassword ? "text" : "password"}
              placeholder="กรอกรหัสผ่าน"
              autoComplete={isRegister ? "new-password" : "current-password"}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
                  aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              }
            />

            {/* Role selector — always visible; determines which experience to open */}
            <div>
              <p className="mb-2.5 text-base font-medium text-foreground">ประเภทผู้ใช้งาน</p>
              <div className="grid grid-cols-2 gap-3">
                <RolePill
                  active={role === "owner"}
                  onClick={() => setRole("owner")}
                  icon={<Sprout className="size-6" aria-hidden="true" />}
                  label="เจ้าของสวน"
                />
                <RolePill
                  active={role === "buyer"}
                  onClick={() => setRole("buyer")}
                  icon={<Truck className="size-6" aria-hidden="true" />}
                  label="ผู้รับซื้อ"
                />
              </div>
            </div>

            {/* Register-only fields */}
            <div
              className={cn(
                "grid transition-all duration-500 ease-out",
                isRegister ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-5 pt-0.5">
                  <Field
                    id="confirm"
                    label="ยืนยันรหัสผ่าน"
                    icon={<ShieldCheck className="size-5" aria-hidden="true" />}
                    type={showPassword ? "text" : "password"}
                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                    autoComplete="new-password"
                  />

                  {/* Orchard location — only relevant for owners registering */}
                  <div
                    className={cn(
                      "grid transition-all duration-400 ease-out",
                      role === "owner" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mb-2.5 text-base font-medium text-foreground">ที่ตั้งของสวน</p>
                      <MapPickerCard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Primary action */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={submitting}
              className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-70"
            >
              {submitting ? (
                <span className="size-6 animate-spin rounded-full border-[3px] border-primary-foreground/40 border-t-primary-foreground" />
              ) : (
                <>
                  {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
                  <ChevronRight className="size-5" aria-hidden="true" />
                </>
              )}
            </button>

            {!isRegister && (
              <button
                type="button"
                className="mt-4 w-full text-center text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                ลืมรหัสผ่าน?
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

function SegTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "flex-1 rounded-xl py-3.5 text-base font-semibold transition-all",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

function Field({
  id,
  label,
  icon,
  trailing,
  ...props
}: {
  id: string
  label: string
  icon: React.ReactNode
  trailing?: React.ReactNode
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
          className={cn(
            "h-16 w-full rounded-2xl border border-input bg-card pl-12 text-lg text-foreground shadow-sm outline-none transition-all",
            "placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15",
            trailing ? "pr-14" : "pr-4",
          )}
          {...props}
        />
        {trailing && <span className="absolute right-2">{trailing}</span>}
      </div>
    </div>
  )
}

function RolePill({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 text-base font-semibold transition-all",
        active
          ? "border-primary bg-accent text-accent-foreground shadow-sm"
          : "border-border bg-card text-muted-foreground hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-full transition-colors",
          active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
      >
        {icon}
      </span>
      {label}
    </button>
  )
}

function MapPickerCard() {
  return (
    <button
      type="button"
      className="group relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-secondary/50 bg-secondary/10 text-center transition-colors hover:border-secondary"
    >
      {/* simple map grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(#8BA888 1px, transparent 1px), linear-gradient(90deg, #8BA888 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "-1px -1px",
        }}
      />
      <div className="relative flex flex-col items-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm">
          <MapPin className="size-6" aria-hidden="true" />
        </span>
        <span className="mt-2 text-base font-medium text-foreground">เลือกตำแหน่งบนแผนที่</span>
        <span className="text-sm text-muted-foreground">แตะเพื่อปักหมุดที่ตั้งสวน</span>
      </div>
    </button>
  )
}
