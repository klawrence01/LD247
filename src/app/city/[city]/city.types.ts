// src/app/city/[city]/city.types.ts

export type CityDeal = {
  id: string;
  title: string;
  startsAt?: string | null;
  endsAt?: string | null;
};

// This is the page-level props for Next.js 15 dynamic routes
export interface CityPageProps {
  params: Promise<{ city: string }>;
}

// This is what the client component actually uses
export interface CityClientProps {
  city: string;
  todayISO: string;
  deals: CityDeal[];
}
