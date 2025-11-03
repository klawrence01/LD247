"use client"

import { useEffect, useState } from "react"

export type Deal = {
  id: string
  title: string
  description: string
  discountType: "percent" | "amount" | "bogo" | "free" | "other"
  value: string
  limitPerPerson?: string
  appointmentRequired?: boolean
}

export default function DealForm({ onSave }: { onSave: (deal: Deal) => void }) {
  const [form, setForm] = useState<Deal>({
    id: "",
    title: "",
    description: "",
    discountType: "percent",
    value: "",
    limitPerPerson: "",
    appointmentRequired: false,
  })
  const [showPreview, setShowPreview] = useState(false)

  // Load/save local draft
  useEffect(() => {
    const raw = localStorage.getItem("dealDraft")
    if (raw) setForm(JSON.parse(raw))
  }, [])
  useEffect(() => {
    localStorage.setItem("dealDraft", JSON.stringify(form))
  }, [form])

  const handleChange = (k: keyof Deal, v: any) => setForm((p) => ({ ...p, [k]: v }))

  const handleDiscountTypeChange = (t: Deal["discountType"]) => {
    setForm((prev) => {
      const next = { ...prev, discountType: t }
      if (t === "free") next.value = "FREE"
      else if (next.value === "FREE") next.value = ""
      return next
    })
  }

  const isFree = form.discountType === "free"

  const handleSave = () => {
    const id = form.id || crypto.randomUUID()
    onSave({ ...form, id })
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Create a Deal</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Free Consultation • 20 Minutes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Discount Type</label>
          <select
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.discountType}
            onChange={(e) => handleDiscountTypeChange(e.target.value as Deal["discountType"])}
          >
            <option value="percent">Percent Off</option>
            <option value="amount">Amount Off</option>
            <option value="bogo">BOGO</option>
            <option value="free">FREE</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Value</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={isFree ? "FREE" : form.value}
            onChange={(e) => !isFree && handleChange("value", e.target.value)}
            placeholder={isFree ? "FREE" : "e.g., 25% or $5"}
            disabled={isFree}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Limit Per Person</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.limitPerPerson || ""}
            onChange={(e) => handleChange("limitPerPerson", e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 w-full rounded border px-3 py-2"
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Details and any fine print (e.g., 'New customers only. Appointment required.')."
          />
        </div>

        <div className="md:col-span-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={form.appointmentRequired || false}
              onChange={(e) => handleChange("appointmentRequired", e.target.checked)}
            />
            Appointment required
          </label>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="px-3 py-2 rounded bg-gray-200 text-sm" onClick={() => setShowPreview(true)}>
          Preview
        </button>
        <button
          className="px-3 py-2 rounded bg-orange-500 text-white text-sm"
          onClick={handleSave}
          disabled={!form.title}
          title={!form.title ? "Enter a title first" : ""}
        >
          Save Deal
        </button>
      </div>

      {/* Preview modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Deal Preview</h3>
              <button className="text-sm underline" onClick={() => setShowPreview(false)}>
                Close
              </button>
            </div>
            <div className="mt-3 border rounded p-4">
              <p className="text-xl font-bold">{form.title || "Untitled"}</p>
              <p className="text-sm text-gray-600 mt-1">
                {form.discountType === "free"
                  ? "FREE"
                  : `${form.discountType.toUpperCase()} • ${form.value || "—"}`}
                {form.limitPerPerson ? ` • Limit: ${form.limitPerPerson}` : ""}
                {form.appointmentRequired ? " • Appointment required" : ""}
              </p>
              <p className="mt-2 text-gray-800">{form.description || "—"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
