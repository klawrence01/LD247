'use client';

import Image from 'next/image';

type Deal = {
  id: string;
  title: string;
  category?: string | null;
  price_text?: string | null;
  image_url?: string | null;
  vendor_name?: string | null;
  vendor_logo?: string | null;
};

export default function CityDealCard({ deal }: { deal: Deal }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Image */}
      <div className="relative aspect-[16/9] w-full bg-gray-100">
        {deal.image_url ? (
          <Image
            src={deal.image_url}
            alt={deal.title || 'Deal image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Body */}
      <div className="space-y-3 p-4">
        {/* Vendor */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
            {deal.vendor_logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={deal.vendor_logo}
                alt={deal.vendor_name || 'Vendor'}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="text-sm font-medium text-gray-800">
            {deal.vendor_name ?? 'Local Vendor'}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold tracking-tight">{deal.title}</h3>

        {/* Category */}
        {deal.category ? (
          <div className="text-sm text-gray-600">{deal.category}</div>
        ) : null}

        {/* Price text */}
        {deal.price_text ? (
          <div className="pt-1 text-base font-semibold text-gray-900">
            {deal.price_text}
          </div>
        ) : null}
      </div>
    </article>
  );
}
