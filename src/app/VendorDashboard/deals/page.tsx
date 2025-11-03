"use client"

import { useEffect, useState } from "react"
import DealForm, { Deal } from "@/components/deals/DealForm"
import WeekSlots from "@/components/deals/WeekSlots"

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [defaultTitle, setDefaultTitle] = useState("House Special – 10% Off")

  useEffect(() => {
    const raw = localStorage.getItem("deals")
    setDeals(raw ? JSON.parse(raw) : [])
    const def = localStorage.getItem("defaultDealTitle")
    if (def) setDefaultTitle(def)
  }, [])

  const saveDeals = (next: Deal[]) => {
    setDeals(next)
    localStorage.setItem("deals", JSON.stringify(next))
  }

  const addDeal = (deal: Deal) => {
    const exists = deals.find((d) => d.id === deal.id)
    if (exists) {
      const updated = deals.map((d) => (d.id === deal.id ? deal : d))
      saveDeals(updated)
    } else {
      saveDeals([deal, ...deals])
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Deals</h1>
      <p className="text-gray-600 mt-1">
        Create deals and assign them to days. Empty days automatically use your Default Slot Deal.
      </p>

      {/* Default Slot Deal control */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm mt-4">
        <h2 className="text-lg font-semibold">Default Slot Deal</h2>
        <div className="mt-2 flex gap-2">
          <input
            className="w-full max-w-lg rounded border px-3 py-2"
            value={defaultTitle}
            onChange={(e) => setDefaultTitle(e.target.value)}
            placeholder="e.g., House Special – 10% Off"
          />
          <button
            className="px-3 py-2 rounded bg-gray-200 text-sm"
            onClick={() => localStorage.setItem("defaultDealTitle", defaultTitle)}
          >
            Save Default
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          This title appears on any day that doesn’t have a specific deal assigned.
        </p>
      </div>

      {/* Create / preview a deal */}
      <div className="mt-4">
        <DealForm onSave={addDeal} />
      </div>

      {/* List of saved deals */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm mt-4">
        <h2 className="text-lg font-semibold">Saved Deals</h2>
        {deals.length === 0 ? (
          <p className="text-sm text-gray-600 mt-2">No deals yet — create one above.</p>
        ) : (
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
            {deals.map((d) => (
              <li key={d.id}>
                <span className="font-medium">{d.title}</span>{" "}
                <span className="text-gray-600">
                  {d.discountType === "free" ? "FREE" : `${d.discountType}, ${d.value}`}
                  {d.appointmentRequired ? " • Appt. required" : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Week slots (7-day public window) */}
      <div className="mt-4">
        <WeekSlots
          deals={deals.map((d) => ({
            id: d.id,
            title: d.title,
            discountType: d.discountType,
            appointmentRequired: d.appointmentRequired,
          }))}
          defaultDealTitle={defaultTitle}
        />
      </div>
    </div>
  )
}
