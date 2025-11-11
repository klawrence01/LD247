// src/app/VendorDashboard/coupons/_components/DealForm.tsx
"use client";

import React, { useState } from "react";

type DealFormProps = {
  onSubmit?: (data: any) => void;
};

export default function DealForm({ onSubmit }: DealFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      start_date: startDate,
      end_date: endDate,
    };
    onSubmit?.(payload);
    // for now just log it so build doesn’t break
    console.log("new deal:", payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-200/10 bg-slate-900/40 p-6"
    >
      <h2 className="text-lg font-semibold text-white">Create New Deal</h2>

      <div className="space-y-1">
        <label className="text-sm text-slate-200">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg bg-slate-950/40 border border-slate-700 px-3 py-2 text-sm text-white outline-none"
          placeholder="25% off service…"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-slate-200">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg bg-slate-950/40 border border-slate-700 px-3 py-2 text-sm text-white outline-none"
          rows={3}
          placeholder="Explain what the customer gets"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-slate-200">Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg bg-slate-950/40 border border-slate-700 px-3 py-2 text-sm text-white outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-200">End date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg bg-slate-950/40 border border-slate-700 px-3 py-2 text-sm text-white outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400"
      >
        Save Deal
      </button>
    </form>
  );
}
