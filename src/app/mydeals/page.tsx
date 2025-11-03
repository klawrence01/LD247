// src/app/mydeals/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";

// Mock data for now. Later this will come from Supabase per user session.
const mockSavedDeals = [
  {
    claimId: "CLAIM-XYZ123",
    businessName: "Tony’s Pizza",
    businessCity: "New Haven, CT",
    img: "/images/pizza.jpg",
    title: "2 slices + drink for $3",
    expires: "Sun Oct 27",
    status: "active", // "active" | "redeemed" | "expired"
  },
  {
    claimId: "CLAIM-ABC555",
    businessName: "Glow Nails Studio",
    businessCity: "Hartford, CT",
    img: "/images/nails.jpg",
    title: "Free Brow Wax w/ Manicure",
    expires: "Sat Oct 26",
    status: "redeemed",
  },
  {
    claimId: "CLAIM-NTF998",
    businessName: "Revive Fitness",
    businessCity: "Boston, MA",
    img: "/images/gym.jpg",
    title: "First Class $10 (Reg $30)",
    expires: "Fri Oct 31",
    status: "expired",
  },
];

const mockFollowedVendors = [
  {
    slug: "tonys-pizza",
    name: "Tony’s Pizza",
    city: "New Haven, CT",
    logo: "/images/vendor-pizza.jpg",
    latest: "New deal drops Friday",
  },
  {
    slug: "glow-nails-studio",
    name: "Glow Nails Studio",
    city: "Hartford, CT",
    logo: "/images/vendor-nails.jpg",
    latest: "No new deal yet — follow to get alerts",
  },
];

const mockPoints = {
  heroLevel: "Bronze Hero",
  savedAmount: "$42.75",
  businessesSupported: 4,
  points: 180,
};

export const metadata: Metadata = {
  title: "My Deals • Local Deals 24/7",
  description:
    "Your saved coupons, followed businesses, and rewards — all in one place.",
};

export default function MyDealsPage() {
  return (
    <main className="mx-auto max-w-lg px-6 pt-10 pb-24">
      {/* HEADER */}
      <header className="text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-black">
          My Deals
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Saved coupons, your favorite local spots, and how much you’ve kept in
          the community.
        </p>

        <div className="mt-4 inline-block rounded-xl bg-black px-3 py-1 text-[11px] font-semibold text-white">
          Everyday Deals. Everyday Heroes.
        </div>
      </header>

      {/* SAVED COUPONS */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-black">
            Saved / Active Coupons
          </h2>
          <div className="text-xs text-gray-500">
            Show this screen in-store to redeem
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {mockSavedDeals.map((deal, i) => {
            let badgeText = "";
            let badgeColor = "";
            if (deal.status === "active") {
              badgeText = "ACTIVE";
              badgeColor =
                "bg-green-100 text-green-700 border-green-300";
            } else if (deal.status === "redeemed") {
              badgeText = "REDEEMED";
              badgeColor =
                "bg-blue-100 text-blue-700 border-blue-300";
            } else {
              badgeText = "EXPIRED";
              badgeColor =
                "bg-gray-200 text-gray-600 border-gray-300";
            }

            return (
              <div
                key={i}
                className="rounded-2xl border shadow-sm bg-white overflow-hidden"
              >
                {/* top row */}
                <div className="flex gap-4 p-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border">
                    <Image
                      src={deal.img}
                      alt={deal.businessName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="text-sm font-semibold leading-tight text-black">
                        {deal.title}
                      </div>
                      <span
                        className={
                          "ml-2 rounded-md border px-2 py-[2px] text-[10px] font-bold " +
                          badgeColor
                        }
                      >
                        {badgeText}
                      </span>
                    </div>

                    <div className="mt-1 text-xs text-gray-600">
                      {deal.businessName} • {deal.businessCity}
                    </div>
                    <div className="mt-1 text-[11px] text-gray-500">
                      Expires {deal.expires}
                    </div>
                  </div>
                </div>

                {/* bottom row */}
                <div className="border-t bg-gray-50 px-4 py-3 text-sm flex flex-wrap gap-3 sm:flex-nowrap sm:justify-between">
                  {deal.status === "active" && (
                    <Link
                      href={`/coupon/${deal.claimId}`}
                      className="inline-block rounded-lg bg-[#F15A29] px-3 py-2 font-semibold text-white shadow hover:bg-black hover:text-white transition"
                    >
                      Show Coupon →
                    </Link>
                  )}

                  {deal.status === "redeemed" && (
                    <div className="text-xs text-gray-600">
                      You redeemed this. How was it?{" "}
                      <Link
                        href="#rate"
                        className="underline text-[#F15A29] font-medium"
                      >
                        Rate experience
                      </Link>
                    </div>
                  )}

                  {deal.status === "expired" && (
                    <Link
                      href={`/notify?business_id=TODO`}
                      className="inline-block rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                    >
                      Notify me next time
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOLLOWED VENDORS */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-black">
          Businesses I Follow
        </h2>
        <div className="mt-4 space-y-4">
          {mockFollowedVendors.map((biz, i) => (
            <Link
              key={i}
              href={`/vendor/${biz.slug}`}
              className="flex items-start gap-4 rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border">
                <Image
                  src={biz.logo}
                  alt={biz.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="text-sm font-semibold leading-tight text-black">
                    {biz.name}
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium mt-1 sm:mt-0">
                    {biz.city}
                  </div>
                </div>

                <div className="mt-1 text-xs text-gray-600">
                  {biz.latest}
                </div>

                <div className="mt-2 text-[11px] text-[#F15A29] font-semibold underline underline-offset-2">
                  View Page →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HERO POINTS / IMPACT */}
      <section className="mt-12 rounded-2xl border bg-black p-6 text-white">
        <div className="text-orange-400 text-base font-semibold">
          {mockPoints.heroLevel}
        </div>

        <div className="mt-2 text-lg font-bold text-white">
          You’ve saved {mockPoints.savedAmount}
        </div>

        <div className="mt-1 text-sm text-gray-300">
          You’ve supported {mockPoints.businessesSupported} local{" "}
          {mockPoints.businessesSupported === 1 ? "business" : "businesses"}.
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            <div className="font-semibold text-white">
              {mockPoints.points} Hero Points
            </div>
            <div>Earn points when you redeem, rate, and refer friends.</div>
          </div>

          <Link
            href="#rewards"
            className="inline-block rounded-lg bg-white px-3 py-2 font-semibold text-black shadow hover:bg-[#F15A29] hover:text-white transition"
          >
            View Rewards →
          </Link>
        </div>

        <div className="mt-4 text-[11px] text-gray-500 italic">
          Your dollars stay local. Your neighbors stay in business.
        </div>
      </section>

      {/* space at bottom so text isn't hidden under nav bar */}
      <div className="h-10" />

      <BottomNav />
    </main>
  );
}
