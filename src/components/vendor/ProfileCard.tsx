// src/components/vendor/ProfileCard.tsx
import Link from "next/link";
import Image from "next/image";

export type VendorProfileData = {
  id: string;
  name: string | null;
  logo_url: string | null;
  website: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  slug?: string | null; // we'll try to pass this later from vendor page
  rating?: number | null;
};

export default function ProfileCard({ vendor }: { vendor: VendorProfileData }) {
  // Fallbacks
  const displayName = vendor.name ?? "Local Business";
  const logo = vendor.logo_url || "https://picsum.photos/seed/vendor/100/100";
  const ratingText =
    vendor.rating != null ? `${vendor.rating.toFixed(1)} / 5` : null;

  return (
    <section className="mt-10 rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100 flex-shrink-0">
          <Image
            src={logo}
            alt={displayName}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        {/* Basic info */}
        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold leading-tight text-gray-900">
            {displayName}
          </div>

          {ratingText && (
            <div className="text-xs text-yellow-600 font-medium">
              ⭐ {ratingText}
            </div>
          )}

          <div className="mt-1 text-xs text-gray-600 leading-snug">
            {(vendor.city || vendor.state) && (
              <div>
                {(vendor.city ?? "—")}, {vendor.state ?? ""}
              </div>
            )}
            {vendor.phone && <div>{vendor.phone}</div>}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {/* View Business Page */}
        {vendor.slug ? (
          <Link
            href={`/vendor/${vendor.slug}`}
            className="rounded-lg bg-black px-3 py-2 font-semibold text-white hover:bg-gray-900"
          >
            View Full Page
          </Link>
        ) : (
          <div className="rounded-lg bg-gray-200 px-3 py-2 font-semibold text-gray-600">
            View Full Page
          </div>
        )}

        {/* Follow Vendor */}
        {vendor.slug ? (
          <Link
            href={`/auth/login?returnUrl=/vendor/${vendor.slug}`}
            className="rounded-lg border px-3 py-2 font-medium text-gray-800 hover:bg-gray-50"
          >
            Follow Vendor
          </Link>
        ) : (
          <div className="rounded-lg border px-3 py-2 font-medium text-gray-400">
            Follow Vendor
          </div>
        )}

        {/* Directions */}
        {(vendor.name || vendor.city || vendor.state) && (
          <a
            className="rounded-lg border px-3 py-2 font-medium text-gray-800 hover:bg-gray-50"
            target="_blank"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${vendor.name ?? ""} ${vendor.city ?? ""} ${
                vendor.state ?? ""
              }`
            )}`}
          >
            Get Directions
          </a>
        )}
      </div>

      {/* Optional website link */}
      {vendor.website && (
        <div className="mt-4 text-xs">
          <a
            href={vendor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline underline-offset-2"
          >
            Visit Website
          </a>
        </div>
      )}
    </section>
  );
}
