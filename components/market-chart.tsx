"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export type ChartPoint = {
  label: string
  price: number
  lastWeek: number
}

const chartConfig = {
  price: {
    label: "ราคาสัปดาห์นี้",
    color: "var(--chart-1)",
  },
  lastWeek: {
    label: "สัปดาห์ก่อน",
    color: "var(--chart-blue)",
  },
} satisfies ChartConfig

export function MarketChart({ data }: { data: ChartPoint[] }) {
  const prices = data.flatMap((d) => [d.price, d.lastWeek])
  const min = Math.floor((Math.min(...prices) - 4) / 2) * 2
  const max = Math.ceil((Math.max(...prices) + 4) / 2) * 2

  return (
    <ChartContainer config={chartConfig} className="aspect-[16/10] w-full">
      <AreaChart data={data} margin={{ left: -8, right: 12, top: 12, bottom: 0 }}>
        <defs>
          <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.28} />
            <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillLastWeek" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-lastWeek)" stopOpacity={0.12} />
            <stop offset="95%" stopColor="var(--color-lastWeek)" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 12, fontWeight: 600, fill: "var(--muted-foreground)" }}
        />
        <YAxis
          domain={[min, max]}
          tickLine={false}
          axisLine={false}
          width={40}
          tickMargin={4}
          tick={{ fontSize: 12, fontWeight: 600, fill: "var(--muted-foreground)" }}
          tickFormatter={(v) => `${v}`}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--border)", strokeWidth: 1.5 }}
          content={<ChartTooltipContent indicator="line" formatter={tooltipFormatter} />}
        />
        <Area
          dataKey="lastWeek"
          type="monotone"
          fill="url(#fillLastWeek)"
          stroke="var(--color-lastWeek)"
          strokeWidth={2}
          strokeDasharray="5 4"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 2, fill: "var(--card)" }}
        />
        <Area
          dataKey="price"
          type="monotone"
          fill="url(#fillPrice)"
          stroke="var(--color-price)"
          strokeWidth={3.5}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 3, fill: "var(--card)" }}
        />
      </AreaChart>
    </ChartContainer>
  )
}

function tooltipFormatter(value: unknown, name: unknown) {
  const label = name === "price" ? "ราคาสัปดาห์นี้" : "สัปดาห์ก่อน"
  const color = name === "price" ? "var(--chart-1)" : "var(--chart-blue)"
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <span className="size-2.5 rounded-[3px]" style={{ backgroundColor: color }} />
        {label}
      </span>
      <span className="font-mono font-bold text-foreground">{value as number} บาท</span>
    </div>
  )
}
