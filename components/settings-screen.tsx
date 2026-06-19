"use client"

import { useState } from "react"
import {
  UserCog,
  Lock,
  Bell,
  Globe,
  LifeBuoy,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Check,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav, type TabId } from "@/components/bottom-nav"

type SubView = "menu" | "password" | "language"

const LANGUAGES = [
  { id: "th", label: "ภาษาไทย", sub: "Thai" },
  { id: "en", label: "English", sub: "อังกฤษ" },
  { id: "zh", label: "中文", sub: "จีน" },
]

export function SettingsScreen({
  onNavigate,
  onEditProfile,
  onContactSupport,
  onLogout,
}: {
  onNavigate: (id: TabId) => void
  onEditProfile?: () => void
  onContactSupport?: () => void
  onLogout?: () => void
}) {
  const [view, setView] = useState<SubView>("menu")
  const [notify, setNotify] = useState(true)
  const [language, setLanguage] = useState("th")

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 pb-3 pt-12">
        {view === "menu" ? (
          <span className="size-12" aria-hidden="true" />
        ) : (
          <button
            onClick={() => setView("menu")}
            aria-label="ย้อนกลับ"
            className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-6" />
          </button>
        )}
        <h1 className="text-lg font-bold text-foreground">
          {view === "menu" && "หน้าตั้งค่า"}
          {view === "password" && "เปลี่ยนรหัสผ่าน"}
          {view === "language" && "เปลี่ยนภาษา"}
        </h1>
        <span className="size-12" aria-hidden="true" />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {view === "menu" && (
          <MenuView
            notify={notify}
            onToggleNotify={() => setNotify((v) => !v)}
            onEditProfile={onEditProfile}
            onChangePassword={() => setView("password")}
            onChangeLanguage={() => setView("language")}
            onContactSupport={onContactSupport}
            onLogout={onLogout}
          />
        )}

        {view === "password" && <PasswordView onDone={() => setView("menu")} />}

        {view === "language" && (
          <div className="mt-2 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            {LANGUAGES.map((lang, i) => {
              const active = language === lang.id
              return (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={cn(
                    "flex w-full items-center justify-between px-5 py-5 text-left transition-colors hover:bg-muted",
                    i !== LANGUAGES.length - 1 && "border-b border-border",
                  )}
                >
                  <span>
                    <span className="block text-lg font-semibold text-foreground">{lang.label}</span>
                    <span className="block text-sm text-muted-foreground">{lang.sub}</span>
                  </span>
                  {active && (
                    <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <Check className="size-5" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <BottomNav active="settings" onNavigate={onNavigate} />
    </div>
  )
}

function MenuView({
  notify,
  onToggleNotify,
  onEditProfile,
  onChangePassword,
  onChangeLanguage,
  onContactSupport,
  onLogout,
}: {
  notify: boolean
  onToggleNotify: () => void
  onEditProfile?: () => void
  onChangePassword: () => void
  onChangeLanguage: () => void
  onContactSupport?: () => void
  onLogout?: () => void
}) {
  return (
    <>
      <div className="mt-2 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <SettingRow
          icon={UserCog}
          label="แก้ไขโปรไฟล์ข้อมูลส่วนตัว"
          sub="Edit Profile"
          onClick={onEditProfile}
        />
        <Divider />
        <SettingRow icon={Lock} label="เปลี่ยนรหัสผ่าน" sub="Change Password" onClick={onChangePassword} />
        <Divider />
        {/* Notification toggle row */}
        <div className="flex items-center gap-4 px-5 py-5">
          <span className="flex size-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
            <Bell className="size-6" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-semibold leading-tight text-foreground">การแจ้งเตือน</span>
            <span className="block text-sm text-muted-foreground">Notifications</span>
          </span>
          <button
            role="switch"
            aria-checked={notify}
            aria-label="เปิดปิดการแจ้งเตือน"
            onClick={onToggleNotify}
            className={cn(
              "relative h-8 w-14 flex-shrink-0 rounded-full transition-colors",
              notify ? "bg-secondary" : "bg-muted",
            )}
          >
            <span
              className={cn(
                "absolute top-1 size-6 rounded-full bg-card shadow-sm transition-all",
                notify ? "left-7" : "left-1",
              )}
            />
          </button>
        </div>
        <Divider />
        <SettingRow icon={Globe} label="เปลี่ยนภาษา" sub="Language" onClick={onChangeLanguage} />
        <Divider />
        <SettingRow
          icon={LifeBuoy}
          label="ติดต่อเจ้าหน้าที่ช่วยเหลือ"
          sub="Contact Support"
          onClick={onContactSupport}
        />
      </div>

      {/* Log out */}
      <button
        onClick={onLogout}
        className="mt-7 flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-destructive/10 text-lg font-semibold text-destructive transition-colors hover:bg-destructive/15 active:translate-y-px"
      >
        <LogOut className="size-6" aria-hidden="true" />
        ออกจากระบบ
      </button>

      <p className="mt-5 text-center text-sm text-muted-foreground">เวอร์ชัน 1.0.0</p>
    </>
  )
}

function PasswordView({ onDone }: { onDone: () => void }) {
  const [saving, setSaving] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      onDone()
    }, 650)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-5">
      <PasswordField id="current" label="รหัสผ่านปัจจุบัน" />
      <PasswordField id="new" label="รหัสผ่านใหม่" />
      <PasswordField id="confirm" label="ยืนยันรหัสผ่านใหม่" />
      <button
        type="submit"
        disabled={saving}
        className="flex h-16 w-full items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-70"
      >
        {saving ? (
          <span className="size-6 animate-spin rounded-full border-[3px] border-primary-foreground/40 border-t-primary-foreground" />
        ) : (
          "บันทึกรหัสผ่านใหม่"
        )}
      </button>
    </form>
  )
}

function PasswordField({ id, label }: { id: string; label: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type="password"
        placeholder="••••••••"
        className="h-16 w-full rounded-2xl border border-input bg-card px-4 text-lg text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </div>
  )
}

function SettingRow({
  icon: Icon,
  label,
  sub,
  onClick,
}: {
  icon: LucideIcon
  label: string
  sub: string
  onClick?: () => void
}) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-muted">
      <span className="flex size-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-semibold leading-tight text-foreground text-balance">{label}</span>
        <span className="block text-sm text-muted-foreground">{sub}</span>
      </span>
      <ChevronRight className="size-6 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
    </button>
  )
}

function Divider() {
  return <div className="mx-5 border-b border-border" aria-hidden="true" />
}
