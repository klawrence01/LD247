"use client";

import { useState } from "react";

export default function VendorDashboardByBusiness() {
  // TODO: replace with real fetch by businessId from Supabase
  const [form, setForm] = useState({
    name: "Tony’s Pizza",
    tagline: "Neighborhood favorite since ‘98.",
    about:
      "We make our pies fresh every day with a family sauce recipe. Order ahead, walk in, or catch one of our LD247 specials below.",
    story:
      "My father started Tony’s as a 2-oven shop serving the South End. We wanted to bring back the neighborhood pizza experience.",
    address: "128 Maple Ave, Hartford, CT",
    phone: "(860) 555-1234",
    website: "https://example.com",
    citySlug: "hartford",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    // later: supabase.from("vendors").update(...)
    alert(
      "Saved (mock). Public vendor page can now read: name, tagline, about, story, address, phone, website."
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-[#f5eee7] p-6">
        <h1 className="text-2xl font-bold text-[#0f172a]">Vendor dashboard</h1>
        <p className="text-sm text-slate-500">
          Edit what appears on your public LD247 vendor page.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#f5eee7] p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm font-medium text-slate-700">
            Business name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Tagline
            <input
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Address
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Phone
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Website
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="https://"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            City (slug)
            <input
              name="citySlug"
              value={form.citySlug}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="hartford"
            />
          </label>
        </div>

        <label className="text-sm font-medium text-slate-700 block">
          About (short)
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 block">
          Mission / Story (longer)
          <textarea
            name="story"
            value={form.story}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
          />
        </label>

        <button
          onClick={handleSave}
          className="rounded-full bg-[#f0472c] text-white px-6 py-2 text-sm"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
