// src/app/city/[city]/page.tsx
import CityClient from "@/components/city/CityClient";

type PageProps = {
  params: {
    city: string;
  };
};

export default async function CityPage({ params }: PageProps) {
  const rawCity = params.city; // e.g. "new-haven"
  const cityName =
    rawCity
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ") || "City";

  // placeholder deals — real data goes here later
  const deals = [];

  return (
    <div className="min-h-screen bg-background">
      <CityClient
        cityName={cityName}
        citySlug={rawCity}
        cityDisplayLoud={cityName.toUpperCase()}
        deals={deals}
      />
    </div>
  );
}
