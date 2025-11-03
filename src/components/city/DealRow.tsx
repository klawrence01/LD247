"use client";

import { Deal } from "@/utils/deals";
import Link from "next/link";

export default function DealRow({ deal }: { deal: Deal }) {
  const percentOff =
    deal.original_price && deal.price
      ? Math.round(100 * (1 - deal.price / deal.original_price))
      : null;

  return (
    <div className="flex items-center justify-between py-4 gap-4">
      <div className="flex items-center gap-4">
        {deal.image_url ? (
          <img
            src={deal.image_url}
            alt={deal.title}
            className="h-24 w-24 rounded-xl object-cover"
          />
        ) : (
          <div className="h-24 w-24 rounded-xl bg-gray-200" />
        )}

        <div>
          {percentOff ? (
            <div className="inline-block bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded-md mb-1">
              {percentOff}% OFF
            </div>
          ) : null}
          <div className="font-bold text-lg">{deal.title}</div>
          <div className="text-sm text-gray-600">{deal.address}</div>
          <div className="text-sm text-gray-500">{deal.hours}</div>
        </div>
      </div>

      <div className="text-right">
        <Link
          href={`/deals/${deal.id}`}
          className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold"
        >
          VIEW DEAL
        </Link>
        <div className="text-xs text-gray-500 mt-1">SHARE THIS DEAL</div>
      </div>
    </div>
  );
}
