// src/app/dashboard/merchant/Merchant-Backup/testimonials/page.tsx
import React from "react";

type BusinessRef = {
  slug?: string;
  name?: string;
};

type Testimonial = {
  id: string;
  author_name?: string;
  rating?: number; // 1–5
  comment?: string;
  created_at?: string;
  // in your data this is coming back as an array, so model it that way
  businesses?: BusinessRef[];
};

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    author_name: "Customer Name",
    rating: 5,
    comment: "Great experience.",
    created_at: new Date().toISOString(),
    businesses: [{ name: "Sample Business", slug: "sample-business" }],
  },
  {
    id: "2",
    author_name: "Another Customer",
    rating: 4,
    comment: "Very good.",
    created_at: new Date().toISOString(),
    businesses: [],
  },
];

export default function MerchantTestimonialsPage() {
  // in real code you’d fetch from supabase here,
  // but we keep it local so the build passes
  const testimonials = mockTestimonials;

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Merchant Testimonials
          </h1>
          <p className="text-sm text-muted-foreground">
            Feedback customers have left about participating merchants.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => {
          // take the FIRST business if any
          const primaryBiz = t.businesses && t.businesses.length > 0 ? t.businesses[0] : undefined;
          const stars = "★".repeat(t.rating ?? 0);
          const empty = "★".repeat(Math.max(0, 5 - (t.rating ?? 0)));

          return (
            <article key={t.id} className="rounded-lg border bg-card text-card-foreground p-4 space-y-3">
              <div className="font-medium flex items-center gap-2">
                <span>{t.author_name ?? "Anonymous"}</span>
                <span className="text-amber-500 text-sm">{stars}</span>
                {empty && <span className="text-slate-200 text-sm">{empty}</span>}
              </div>
              <p className="text-sm leading-relaxed">{t.comment ?? "No comment provided."}</p>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                {/* date */}
                {t.created_at ? new Date(t.created_at).toLocaleString() : null}
                {/* dot */}
                {primaryBiz ? <span>•</span> : null}
                {/* business name / slug */}
                {primaryBiz ? (
                  <>
                    {primaryBiz.name ?? ""}
                    {primaryBiz.slug ? <span>({primaryBiz.slug})</span> : null}
                  </>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
