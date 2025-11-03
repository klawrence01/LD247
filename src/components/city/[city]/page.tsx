// src/app/city/[city]/page.tsx

import { createSupabaseServer } from "@/utils/supabase/server";
import CityClient from "@/components/city/CityClient";

export const metadata = {
  title: "Local Deals 24/7 — City Deals",
  description: "Find real local deals from real local businesses.",
};

// Take "new-haven" and figure out:
// normalizedCity: "New Haven"
// regionTag: "New Haven County"
function resolveCityAndRegion(slugParam: string) {
  const normalizedCity = slugParam
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const regionMap: { [key: string]: string } = {
    // New Haven County cluster
    "New Haven": "New Haven County",
    "Meriden": "New Haven County",
    "Hamden": "New Haven County",
    "Wallingford": "New Haven County",
    "West Haven": "New Haven County",
    "East Haven": "New Haven County",
    "North Haven": "New Haven County",
    "Milford": "New Haven County",

    // Hartford County cluster
    "Hartford": "Hartford County",
    "East Hartford": "Hartford County",
    "West Hartford": "Hartford County",
    "Newington": "Hartford County",
    "Wethersfield": "Hartford County",
    "Bloomfield": "Hartford County",

    // NYC boroughs (no merge)
    "Brooklyn": "Brooklyn",
    "Queens": "Queens",
    "Bronx": "Bronx",
    "Manhattan": "Manhattan",
    "Staten Island": "Staten Island",
  };

  const regionTag = regionMap[normalizedCity] ?? normalizedCity;
  return { normalizedCity, regionTag };
}

export default async function CityPage({
  params,
}: {
  params: { city: string };
}) {
  const supabase = createSupabaseServer();

  // ex: "new-haven"
  const citySlugRaw = params.city;

  // figure out readable forms
  const { normalizedCity, regionTag } = resolveCityAndRegion(citySlugRaw);

  // ex: "NEW-HAVEN"
  const cityDisplayLoud = citySlugRaw
    ? citySlugRaw.replace(/-/g, "-").toUpperCase()
    : "UNKNOWN-CITY";

  // Pull coupons for this coverage zone.
  // We include:
  // - exact city match (New Haven)
  // - OR region_tag match (New Haven County, which covers Meriden, etc.)
  //
  // Spaces in values ("New Haven", "New Haven County") break .or() unless encoded,
  // so we %20 them.
  const encodedCity = normalizedCity.replaceAll(" ", "%20");
  const encodedRegion = regionTag.replaceAll(" ", "%20");

  let deals: any[] = [];
  try {
    const { data, error } = await supabase
      .from("coupons")
      .select(
        `
        id,
        title,
        description,
        start_date,
        end_date,
        businesses (
          name,
          slug,
          city,
          state,
          region_tag,
          logo_url
        )
      `
      )
      .or(
        `businesses.city.eq.${encodedCity},businesses.region_tag.eq.${encodedRegion}`
      );

    if (error) {
      console.error("Error loading deals:", error.message);
    } else if (data && data.length > 0) {
      deals = data;
    }
  } catch (e) {
    console.error("Deal fetch failed:", e);
  }

  // fallback so UI always renders
  if (!deals || deals.length === 0) {
    deals = [
      {
        id: "mock-1",
        title: "No live deals yet",
        description:
          "Local businesses are still setting up their offers in this area. Check back soon.",
        start_date: null,
        end_date: null,
        businesses: {
          name: "Coming Soon",
          slug: "#",
          city: normalizedCity || "Your City",
          state: "CT",
          region_tag: regionTag,
          logo_url: null,
        },
      },
    ];
  }

  return (
    <CityClient
      cityName={normalizedCity}          // "New Haven"
      citySlug={citySlugRaw}             // "new-haven"
      cityDisplayLoud={cityDisplayLoud}  // "NEW-HAVEN"
      deals={deals}
    />
  );
}
