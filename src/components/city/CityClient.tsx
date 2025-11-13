// src/components/city/CityClient.tsx
"use client";

import Image from "next/image";

type Deal = {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  vendorName?: string;
  address?: string;
  // add more later as your real data shape shows up
};

type CityClientProps = {
  cityName: string;
  citySlug: string;
  cityDisplayLoud?: string;
  deals?: Deal[];
};

export default function CityClient({
  cityName,
  citySlug,
  cityDisplayLoud,
  deals = [],
}: CityClientProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
        {/* header */}
        <header className="border-b pb-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            City
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            {cityName || citySlug}
          </h1>
          {cityDisplayLoud ? (
            <p className="text-sm text-muted-foreground">{cityDisplayLoud}</p>
          ) : null}
        </header>

        {/* deals list */}
        <section className="grid gap-4 md:grid-cols-2">
          {deals.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No deals for this city yet.
            </p>
          ) : (
            deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))
          )}
        </section>
      </div>
    </div>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  return (
    <div className="flex gap-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      {/* optional image spot */}
      <div className="relative h-32 w-40 flex-shrink-0 bg-muted">
        <Image
          src="/placeholder.svg"
          alt={deal.title ?? "Deal"}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col py-3 pr-3">
        <h2 className="text-base font-semibold line-clamp-1">
          {deal.title ?? "Untitled deal"}
        </h2>

        {/* safe description line */}
        {deal.description ? (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {deal.description}
          </p>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {deal.category ? (
            <span className="rounded bg-muted px-2 py-0.5 text-[0.65rem] uppercase tracking-wide">
              {deal.category}
            </span>
          ) : null}

          {typeof deal.price === "number" ? (
            <span>${deal.price.toFixed(2)}</span>
          ) : null}

          {deal.vendorName ? <span>• {deal.vendorName}</span> : null}

          {deal.address ? (
            <span className="truncate max-w-[10rem]">{deal.address}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
