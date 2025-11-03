"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { startOfDayLocal as SOD, toISODateLocal as ISO } from "@/lib/date";
import DealsGrid from "@/components/city/DealsGrid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DealsClient({
  city,
  initialISO,
}: {
  city: string;
  initialISO: string;
}) {
  const [iso, setISO] = useState(initialISO);
  const [category, setCategory] = useState<string | null>(null);
  const [deals, setDeals] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function onDate(ev: any) {
      const d = SOD(ev.detail.date as Date);
      setISO(ISO(d)); // local YYYY-MM-DD
    }
    window.addEventListener("ld247:dateChange", onDate as any);
    return () => window.removeEventListener("ld247:dateChange", onDate as any);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        let q = supabase
          .from("deals")
          .select("*")
          .eq("city", city)
          .lte("start_date", iso)
          .gte("end_date", iso);

        if (category && category !== "All") q = q.eq("category", category);

        const { data, error } = await q.order("start_date", { ascending: false });
        if (error) throw error;
        if (!cancelled) setDeals(data ?? []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [iso, city, category]);

  if (loading && !deals) return <div className="text-sm opacity-70">Loading deals…</div>;
  if (error) return <div className="text-sm text-red-600">Error: {error}</div>;
  return <DealsGrid deals={deals ?? []} />;
}
