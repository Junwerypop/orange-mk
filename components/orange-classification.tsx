"use client"

import { Citrus, Award } from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------------------
 * Orange product classification system
 * Shared varieties + quality grades used across orchard listings, buyer
 * offers, market prices and marketplace transactions.
 * ------------------------------------------------------------------------- */

export type VarietyId = "green" | "shogun" | "honey" | "fremont" | "mandarin" | "other"

export type Variety = {
  id: VarietyId
  /** Full Thai name. */
  name: string
}

export const VARIETIES: Variety[] = [
  { id: "green", name: "ส้มเขียวหวาน" },
  { id: "shogun", name: "ส้มโชกุน" },
  { id: "honey", name: "ส้มสายน้ำผึ้ง" },
  { id: "fremont", name: "ส้มฟรีมอนต์" },
  { id: "mandarin", name: "ส้มแมนดาริน" },
  { id: "other", name: "ส้มอื่นๆ" },
]

export const VARIETY_MAP = Object.fromEntries(VARIETIES.map((v) => [v.id, v])) as Record<VarietyId, Variety>

export type GradeId = "A" | "B" | "C"

export type Grade = {
  id: GradeId
  /** e.g. "เกรด A" */
  label: string
  /** Short English tier name. */
  tier: string
  /** Bullet descriptors. */
  desc: string
  /** Pill background. */
  bg: string
  /** Pill text + icon color. */
  text: string
}

// Medal-tone palette: gold / silver / bronze, tuned to sit on light cards.
export const GRADES: Grade[] = [
  {
    id: "A",
    label: "เกรด A",
    tier: "Premium",
    desc: "ขนาดสม่ำเสมอ สีสวย คุณภาพสูง",
    bg: "rgba(200, 161, 75, 0.16)",
    text: "#9A7726",
  },
  {
    id: "B",
    label: "เกรด B",
    tier: "Standard",
    desc: "คุณภาพดี ขนาดปานกลาง",
    bg: "rgba(124, 132, 142, 0.16)",
    text: "#5C636C",
  },
  {
    id: "C",
    label: "เกรด C",
    tier: "Mixed",
    desc: "คละขนาด สำหรับขายจำนวนมากหรือแปรรูป",
    bg: "rgba(176, 122, 62, 0.16)",
    text: "#8A5A28",
  },
]

export const GRADE_MAP = Object.fromEntries(GRADES.map((g) => [g.id, g])) as Record<GradeId, Grade>

type Size = "sm" | "md"

/** Variety chip — citrus mark + Thai name on a soft accent pill. */
export function VarietyChip({
  variety,
  size = "md",
  className,
}: {
  variety: VarietyId
  size?: Size
  className?: string
}) {
  const v = VARIETY_MAP[variety]
  if (!v) return null
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent font-semibold text-accent-foreground",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className,
      )}
    >
      <Citrus className={cn("text-primary", size === "sm" ? "size-3.5" : "size-4")} aria-hidden="true" />
      {v.name}
    </span>
  )
}

/** Grade chip — medal-toned pill with the grade label. */
export function GradeChip({
  grade,
  size = "md",
  showTier = false,
  className,
}: {
  grade: GradeId
  size?: Size
  showTier?: boolean
  className?: string
}) {
  const g = GRADE_MAP[grade]
  if (!g) return null
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className,
      )}
      style={{ backgroundColor: g.bg, color: g.text }}
    >
      <Award className={size === "sm" ? "size-3.5" : "size-4"} aria-hidden="true" />
      {g.label}
      {showTier && <span className="font-medium opacity-80">· {g.tier}</span>}
    </span>
  )
}

/** Convenience: variety + grade chips side by side. */
export function ClassificationChips({
  variety,
  grade,
  size = "md",
  className,
}: {
  variety: VarietyId
  grade: GradeId
  size?: Size
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <VarietyChip variety={variety} size={size} />
      <GradeChip grade={grade} size={size} />
    </div>
  )
}
