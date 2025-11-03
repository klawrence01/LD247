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

const fmt = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })

export default function WeekSlots({
  deals,
  defaultDealTitle = "Default Deal",
}: {
  deals: Deal[]
  defaultDealTitle?: string
}) {
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  const days = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      const iso = d.toISOString().slice(0, 10)
      return { label: fmt(d), iso }
    })
  }, [])

  const [slots, setSlots] = useState<Record<string, DaySlot>>({})

  useEffect(() => {
    const raw = localStorage.getItem("weekSlots")
    setSlots(raw ? JSON.parse(raw) : {})
  }, [])
  useEffect(() => {
    localStorage.setItem("weekSlots", JSON.stringify(slots))
  }, [slots])

  const setDealForDay = (iso: string, dealId?: string) =>
    setSlots((p) => ({ ...p, [iso]: { ...(p[iso] || { dateISO: iso }), dateISO: iso, dealId } }))

  const toggleOOS = (iso: string) =>
    setSlots((p) => ({
      ...p,
      [iso]: { ...(p[iso] || { dateISO: iso }), dateISO: iso, outOfStock: !p[iso]?.outOfStock },
    }))

  const setDailyLimit = (iso: string, val?: number) =>
    setSlots((p) => ({
      ...p,
      [iso]: { ...(p[iso] || { dateISO: iso }), dateISO: iso, dailyLimit: val },
    }))

  const getDealById = (dealId?: string) => (dealId ? deals.find((d) => d.id === dealId) : undefined)
  const getDealTitle = (dealId?: string) =>
    dealId ? deals.find((d) => d.id === dealId)?.title || defaultDealTitle : defaultDealTitle

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">This Week’s Slots (7-day public window)</h2>
        <button
          className="text-sm underline"
          onClick={() => {
            localStorage.removeItem("weekSlots")
            setSlots({})
          }}
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {days.map(({ label, iso }) => {
          const s = slots[iso]
          const selectedId = s?.dealId
          const oos = s?.outOfStock
          const selected = getDealById(selectedId)

          return (
            <div key={iso} className="rounded-xl border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">{label}</p>
                  <p className="font-semibold mt-1">{getDealTitle(selectedId)}</p>

                  {/* badges */}
                  <div className="mt-1 space-x-2">
                    {selected?.discountType === "free" && (
                      <span className="inline-block text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
                        FREE
                      </span>
                    )}
                    {selected?.appointmentRequired && (
                      <span className="inline-block text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                        Appt. required
                      </span>
                    )}
                    {typeof s?.dailyLimit === "number" && s?.dailyLimit > 0 && (
                      <span className="inline-block text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                        Max {s.dailyLimit}/day
                      </span>
                    )}
                    {oos && (
                      <span className="inline-block text-xs px-2 py-0.5 rounded bg-red-100 text-red-700">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <select
                  className="w-full rounded border px-3 py-2 text-sm"
                  value={selectedId || ""}
                  onChange={(e) => setDealForDay(iso, e.target.value || undefined)}
                >
                  <option value="">— Use Default Slot Deal —</option>
                  {deals.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-sm"
                    onClick={() => setDealForDay(iso, undefined)}
                  >
                    Use Default
                  </button>
                  <button
                    className={
                      "px-3 py-1 rounded text-sm " +
                      (oos ? "bg-red-600 text-white" : "bg-gray-200")
                    }
                    onClick={() => toggleOOS(iso)}
                  >
                    {oos ? "Set In Stock" : "Mark Out of Stock"}
                  </button>

                  <div className="flex items-center gap-2 ml-auto">
                    <label className="text-sm text-gray-700">Max/day</label>
                    <input
                      type="number"
                      min={0}
                      className="w-24 rounded border px-2 py-1 text-sm"
                      value={s?.dailyLimit ?? ""}
                      onChange={(e) => {
                        const val = e.target.value === "" ? undefined : Math.max(0, parseInt(e.target.value, 10) || 0)
                        setDailyLimit(iso, val)
                      }}
                      placeholder="e.g., 20"
                      title="Max redemptions for this day"
                    />
                  </div>
                </div>

                {/* Stub for "Notify Me When Deal Returns" */}
                {oos && (
                  <button
                    className="w-full px-3 py-1 rounded bg-orange-500 text-white text-sm"
                    title="Stubbed locally — will notify users when wired."
                  >
                    Notify Me When Deal Returns
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Tip: If you don’t pick a specific deal for a day, the <strong>Default Slot Deal</strong> is shown.
      </p>
    </div>
  )
}
