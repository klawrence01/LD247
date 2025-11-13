// src/components/vendor/CityPage.tsx

import HeroBanner from "@/components/city/HeroBanner";
import FeaturedMerchants from "@/components/city/FeaturedMerchants";
import DealList from "@/components/city/DealList";
import CategoryFilter from "@/components/city/CategoryFilter";
import { useState } from "react";

type CityPageProps = {
  city: string;
  deals?: Array<{ id: string; title: string; description?: string }>;
  merchants?: Array<{ id: string; name: string; tagline?: string }>;
};

export default function CityPage({
  city,
  deals = [],
  merchants = [],
}: CityPageProps) {
  const [category, setCategory] = useState("All");

  // later you can actually filter based on category
  const visibleDeals = deals;

  return (
    <div className="space-y-4">
      <HeroBanner city={city} />
      <FeaturedMerchants merchants={merchants} />
      <CategoryFilter value={category} onChange={setCategory} />
      <DealList deals={visibleDeals} />
    </div>
  );
}
