// src/components/CityDealsGrid.tsx
import Link from 'next/link';

type DealRow = {
  id: string;
  title: string | null;
  city: string | null;
  category: string | null;
  price_text: string | null;
  image_url: string | null;
  vendor_name: string | null;
  vendor_logo: string | null;
};

export default function CityDealsGrid({ deals }: { deals: DealRow[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {deals.map((d) => (
        <Link
          key={d.id}
          href={`/deal/${d.id}`}
          className="group block overflow-hidden rounded-lg border transition hover:shadow-md"
        >
          {d.image_url ? (
            <img
              src={d.image_url}
              alt={d.title ?? ''}
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="h-48 w-full bg-gray-100" />
          )}

          <div className="p-4">
            {/* vendor */}
            <div className="mb-2 flex items-center gap-2">
              {d.vendor_logo ? (
                <img
                  src={d.vendor_logo}
                  alt={d.vendor_name ?? ''}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <div className="h-6 w-6 rounded-full bg-gray-200" />
              )}
              <div className="text-sm text-gray-700">{d.vendor_name}</div>
            </div>

            {/* title */}
            <div className="line-clamp-2 text-lg font-semibold">
              {d.title ?? 'Untitled deal'}
            </div>

            {/* category */}
            <div className="mt-1 text-sm text-gray-600">{d.category}</div>

            {/* price */}
            <div className="mt-4 text-base font-semibold">{d.price_text}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
