// src/app/city/[city]/CityClient.tsx
"use client";

import { CityClientProps } from "./city.types";

export default function CityClient({ city, todayISO, deals }: CityClientProps) {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Deals in {city}</h1>
        <p className="text-sm text-muted-foreground">Today: {todayISO}</p>
      </header>

      {deals.length === 0 ? (
        <p>No deals yet for this city.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <li key={deal.id} className="rounded-lg border p-4">
              <h2 className="font-semibold">{deal.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
