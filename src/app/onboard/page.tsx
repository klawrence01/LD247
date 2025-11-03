"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Business = {
  id: string;
};

const LAUNCH_CITIES = [
  "Atlanta, GA",
  "New York City, NY",
  "Philadelphia, PA",
  "Boston, MA",
  "New Haven, CT",
  "Hartford, CT",
  "Springfield, MA",
  "Stamford, CT",
  "Waterbury, CT",
  "Meriden, CT",
];

const STARTER_DEALS = [
  {
    code: "D1",
    title: "10% Off Any Service",
    desc: "Good on walk-ins. Show this deal at checkout.",
  },
  {
    code: "D2",
    title: "BOGO 50% Off",
    desc: "Buy one, get the 2nd 50% off.",
  },
  {
    code: "D3",
    title: "Slow Day Booster",
    desc: "Pick your slowest day and we’ll spotlight it.",
  },
  {
    code: "D4",
    title: "New Customer Offer",
    desc: "Great for salons, spas, chiropractic, gyms.",
  },
  {
    code: "D5",
    title: "Return Visit Deal",
    desc: "Bring them back in within 7–14 days.",
  },
  {
    code: "D6",
    title: "High-Margin Promo",
    desc: "Showcase your most profitable service.",
  },
  {
    code: "D7",
    title: "Flash Deal",
    desc: "One-day-only. Creates urgency.",
  },
  {
    code: "D8",
    title: "BOGO 50% Off (Repeat)",
    desc: "We repeat this because it converts.",
  },
];

export default function OnboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const repCode = searchParams?.get("rep") || searchParams?.get("sales") || "";
  const prefillName = searchParams?.get("name") || "";
  const prefillCity = searchParams?.get("city") || "";
  const prefillEmail = searchParams?.get("email") || "";

  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // form state
  const [bizName, setBizName] = useState(prefillName);
  const [city, setCity] = useState(prefillCity);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(prefillEmail);
  const [agreePlan, setAgreePlan] = useState(true);

  // deal picking
  const [selectedDeals, setSelectedDeals] = useState<string[]>(["D1", "D2", "D3"]);

  useEffect(() => {
    // if the QR had a city, drop it into the select
    if (prefillCity) {
      setCity(prefillCity);
    }
  }, [prefillCity]);

  async function handleCreateBusiness(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!bizName.trim()) {
      setErrorMsg("Business name is required.");
      return;
    }
    if (!city.trim()) {
      setErrorMsg("City is required.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Email is required.");
      return;
    }

    setLoading(true);

    try {
      // create the business in Supabase
      // NOTE: change "businesses" to your actual table name if different
      const { data, error } = await supabase
        .from("businesses")
        .insert({
          name: bizName.trim(),
          city: city.trim(),
          phone: phone.trim() || null,
          contact_email: email.trim(),
          sales_rep_code: repCode || null,
          source: repCode ? "rep_qr" : "direct",
          plan: agreePlan ? "intro_49" : "free",
          status: "pending",
        })
        .select("id")
        .maybeSingle();

      if (error) {
        console.error("Error inserting business:", error);
        setErrorMsg("Could not create business right now. We’ll try again.");
      } else if (data) {
        setBusinessId(data.id);
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function toggleDeal(code: string) {
    setSelectedDeals((prev) => {
      if (prev.includes(code)) {
        return prev.filter((c) => c !== code);
      }
      return [...prev, code];
    });
  }

  async function handleSaveDeals() {
    if (!businessId) {
      alert("Business not created yet.");
      return;
    }
    setLoading(true);
    try {
      // create 1 row per selected deal
      // NOTE: change "deals" to "coupons" if that’s your actual table
      const rows = selectedDeals.map((code) => {
        const def = STARTER_DEALS.find((d) => d.code === code)!;
        return {
          business_id: businessId,
          title: def.title,
          description: def.desc,
          // we can leave image empty – vendor will replace
          image_url: null,
          // default to THIS week – they can edit later
          start_date: new Date().toISOString().slice(0, 10),
          end_date: new Date().toISOString().slice(0, 10),
          status: "draft",
        };
      });

      const { error } = await supabase.from("deals").insert(rows);
      if (error) {
        console.error("Error inserting starter deals:", error);
        alert("Business created, but we couldn’t add the starter deals.");
      } else {
        alert("You’re in! We created your business and starter deals.");
        // send them to their vendor page (public)
        router.push(`/vendor/${encodeURIComponent(bizName.toLowerCase().replace(/\s+/g, "-"))}`);
      }
    } catch (err) {
      console.error(err);
      alert("Business created, but we couldn’t add the starter deals.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* top */}
      <div className="w-full bg-white border-b border-[#eee]">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#111]">
              Local Deals 24/7
            </span>
            <span className="text-xs text-[#f97316]">
              Merchant Onboarding
            </span>
          </div>
          {repCode ? (
            <div className="text-xs text-[#555]">
              Referred by: <span className="font-semibold">{repCode}</span>
            </div>
          ) : null}
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {step === 1 ? (
          <div className="bg-white rounded-3xl border border-[#eee] p-6 md:p-8">
            <h1 className="text-2xl font-bold text-[#111]">
              Let’s set up your business
            </h1>
            <p className="text-sm text-[#777] mt-2">
              This takes about 60 seconds. Your sales rep will help you finish the rest.
            </p>

            <form onSubmit={handleCreateBusiness} className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-[#111]">
                  Business name
                </label>
                <input
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#ddd] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#f97316]"
                  placeholder="e.g. Big Tony’s Pizza"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#111]">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#ddd] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#f97316] bg-white"
                >
                  <option value="">Select a city…</option>
                  {LAUNCH_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-[#111]">
                    Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#ddd] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#f97316]"
                    placeholder="(860) 555-1234"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-[#111]">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#ddd] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#f97316]"
                    placeholder="owner@business.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="agreePlan"
                  type="checkbox"
                  checked={agreePlan}
                  onChange={(e) => setAgreePlan(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="agreePlan" className="text-sm text-[#444] leading-snug">
                  Yes — enroll me in the <span className="font-semibold">$49 intro</span> plan so I can start posting up to 10 deals a month.
                </label>
              </div>

              {repCode ? (
                <p className="text-xs text-[#999]">
                  Your account will be linked to rep: <strong>{repCode}</strong>
                </p>
              ) : null}

              {errorMsg ? (
                <p className="text-sm text-red-500">{errorMsg}</p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-black/90 disabled:opacity-50"
              >
                {loading ? "Creating…" : "Continue to deal setup →"}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#eee] p-6 md:p-8">
            <h1 className="text-2xl font-bold text-[#111]">
              Pick your starter deals
            </h1>
            <p className="text-sm text-[#777] mt-2">
              We pre-built 8 proven offer types. Choose the ones that fit your business. You can edit them later.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {STARTER_DEALS.map((deal) => {
                const active = selectedDeals.includes(deal.code);
                return (
                  <button
                    key={deal.code}
                    type="button"
                    onClick={() => toggleDeal(deal.code)}
                    className={`text-left rounded-2xl border p-4 transition ${
                      active
                        ? "border-[#f97316] bg-[#fff5ec]"
                        : "border-[#eee] bg-white hover:border-[#ddd]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-sm font-semibold text-[#111]">
                        {deal.title}
                      </h2>
                      {active ? (
                        <span className="text-xs text-[#f97316] font-semibold">
                          Selected
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-[#777] mt-2">{deal.desc}</p>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSaveDeals}
              disabled={loading}
              className="mt-6 w-full bg-black text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-black/90 disabled:opacity-50"
            >
              {loading ? "Saving…" : "Finish & view my page →"}
            </button>

            <p className="text-xs text-[#aaa] mt-3">
              We’ll generate the deals as drafts so your rep can review and publish.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
