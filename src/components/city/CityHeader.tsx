"use client"

import SocialShare from "@/components/shared/SocialShare"

const SITE_NAME = "Local Deals 24/7"

export default function CityHeader({
  city,
  tagline,
}: {
  city: string
  tagline?: string
}) {
  const blurb = tagline ?? `Discover today's best local deals in ${city}.`

  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div>
        <h1 className="text-3xl font-bold">{city}</h1>
        <p className="text-gray-600">{blurb}</p>
      </div>

      {/* Social share uses the current page URL by default */}
      <SocialShare
        label="Share City"
        title={`Check out ${city} deals on ${SITE_NAME}`}
        text={blurb}
        // url prop omitted on purpose
      />
    </div>
  )
}
