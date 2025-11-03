// src/components/CityPage.tsx

import HeroBanner from './city/[city]/HeroBanner';
import FeaturedMerchants from './city/[city]/FeaturedMerchants';
import DealList from './city/[city]/DealList';
import CategoryFilter from './city/[city]/CategoryFilter';
import FollowCity from './city/[city]/FollowCity';
import CityStats from './city/[city]/CityStats';
import TestimonialSlider from './city/[city]/TestimonialSlider';
import MapWidget from './city/[city]/MapWidget';

export default function CityPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      <HeroBanner />
      <FollowCity />
      <CategoryFilter />
      <DealList />
      <FeaturedMerchants />
      <TestimonialSlider />
      <CityStats />
      <MapWidget />
    </div>
  );
}
