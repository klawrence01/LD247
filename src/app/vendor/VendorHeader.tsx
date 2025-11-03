import FollowVendorButton from "@/components/follow/FollowVendorButton";

export default function VendorHeader({
  id,
  name,
  logoUrl,
  website,
  phone,
  address,
  rating = 4,
  tagline,
}: {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  phone?: string;
  address?: string;
  rating?: number;
  tagline?: string;
}) {
  return (
    <header className="mb-6 flex items-center gap-4">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={name}
          className="h-16 w-16 rounded-full object-cover"
        />
      ) : (
        <div className="h-16 w-16 rounded-full bg-gray-200" />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h1 className="truncate text-2xl font-extrabold">{name}</h1>
          <div className="text-orange-500 text-sm">
            {"★".repeat(Math.round(rating))}
            <span className="text-gray-300">
              {"★".repeat(5 - Math.round(rating))}
            </span>
          </div>
        </div>

        {tagline ? (
          <p className="mt-1 text-sm text-gray-500">{tagline}</p>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <FollowVendorButton vendorId={id} vendorName={name} />
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border px-4 py-2"
            >
              Website
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} className="rounded-lg border px-4 py-2">
              Call
            </a>
          )}
          {address && (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                address
              )}`}
              className="rounded-lg border px-4 py-2"
            >
              Directions
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
