// src/app/city/[city]/page.tsx
import CityClient from "./CityClient";
import { CityDeal, CityClientProps, CityPageProps } from "./city.types";

export default async function CityPage({ params }: CityPageProps) {
  // next 15: params is a Promise, so we await it
  const { city } = await params;

  const todayISO = new Date().toISOString();

  // TODO: replace with real Supabase fetch
  const deals: CityDeal[] = [];

  const props: CityClientProps = {
    city,
    todayISO,
    deals,
  };

  return (
    <div className="min-h-screen">
      <CityClient {...props} />
    </div>
  );
}
