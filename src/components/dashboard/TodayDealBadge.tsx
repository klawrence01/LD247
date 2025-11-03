"use client"

import { useEffect, useMemo, useState } from "react"

type DaySlot = {
  dateISO: string
  dealId?: string
  outOfStock?: boolean
  dailyLimit?: number
}

type Deal = {
  id: string
  title: string
  discountType?: "percent" | "amount" | "bogo" | "free" | "other"
  appointmentRequired?: boolean
}

export default function TodayDealBadge() {
  const todayISO = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d.toISOString().slice(0, 10)
  }, [])

  const [title, setTitle] = useState<string>("Default Deal")
  const [free, setFree] = useState(false)
  const [appt, setAppt] = useState(false)
  const [oos, setOos] = useState(false)
  const [limit, setLimit] = useState<number | undefined>(undefined)

  useEffect(() => {
    try {
      const slotsRaw = localStorage.getItem("weekSlots")
      const slots: Record<string, DaySlot> = slotsRaw ? JSON.parse(slotsRaw) : {}
      const dealsRaw = localStorage.getItem("deals")
      const deals: Deal[] = dealsRaw ? JSON.parse(dealsRaw) : []
      const defaultTitle = localStorage.getItem("defaultDealTitle") || "Default Deal"

      const s = slots[todayISO]
      const chosen = deals.find((d) => d.id === s?.dealId)

      const t = chosen?.title || defaultTitle
      setTitle(t)
      setFree(chosen?.discountType === "free")
      setAppt(Boolean(chosen?.appointmentRequired))
      setOos(Boolean(s?.outOfStock))
      setLimit(typeof s?.dailyLimit === "number" ? s?.dailyLimit : undefined)
    } catch {
      // ignore parse errors
    }
  }, [todayISO])

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Today’s Deal</h2>
          <p className="mt-1 font-medium">{title}</p>
          <div className="mt-2 space-x-2">
            {free && (
              <span className="inline-block text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
                FREE
              </span>
            )}
            {appt && (
              <span className="inline-block text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                Appt. required
              </span>
            )}
            {typeof limit === "number" && limit > 0 && (
              <span className="inline-block text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                Max {limit}/day
              </span>
            )}
            {oos && (
              <span className="inline-block text-xs px-2 py-0.5 rounded bg-red-100 text-red-700">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        <a href="/vendor/deals" className="px-3 py-2 rounded bg-gray-200 text-sm">
          Manage
        </a>
      </div>
    </div>
  )
}
