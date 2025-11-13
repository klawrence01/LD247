// src/app/dashboard/merchant/testimonials/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Testimonial = {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  created_at: string;
  // what’s coming back from supabase
  businesses?: Array<{
    name?: string;
    slug?: string;
  }>;
};

export default function MerchantTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: wire to supabase again
    // for now, keep scaffolded data
    setItems([
      {
        id: "t1",
        author_name: "Test Customer",
        rating: 5,
        text: "Great service.",
        created_at: new Date().toISOString(),
        businesses: [
          {
            name: "Sample Business",
            slug: "sample-business",
          },
        ],
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Merchant testimonials
          </h1>
          <p className="text-sm text-muted-foreground">
            Feedback that merchants (or their customers) have left.
          </p>
        </div>
      </header>

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No testimonials found.
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((t) => {
            // 👇 this is the fix
            const biz = t.businesses && t.businesses.length > 0 ? t.businesses[0] : null;

            return (
              <div
                key={t.id}
                className="rounded-lg border bg-card text-card-foreground p-4 space-y-3"
              >
                <div className="font-medium">{t.author_name}</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  {"★".repeat(t.rating)}
                  {"★".repeat(Math.max(0, 5 - t.rating))}
                </div>
                <div className="text-sm">{t.text}</div>

                <div className="text-xs text-gray-500">
                  {new Date(t.created_at).toLocaleString()} •{" "}
                  {biz?.name ?? ""} {biz?.slug ? `(${biz.slug})` : ""}
                </div>

                <div className="flex items-center gap-2">
                  {biz?.slug ? (
                    <Link
                      href={`/s/${biz.slug}`}
                      className="rounded-lg border px-3 py-1 text-sm"
                      target="_blank"
                    >
                      Open
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
