import Link from "next/link";
import { Deal } from "@/utils/deals";

export default function VendorDealCard({ deal }: { deal: Deal }) {
  const pct =
    deal.price && deal.original_price
      ? Math.round(100 * (1 - deal.price / deal.original_price))
      : null;

  return (
    <div className="rounded-xl border p-4">
      <div className="mb-3 h-36 w-full rounded-lg bg-gray-200" />
      {pct && (
        <div className="mb-1 inline-block rounded-md bg-orange-500 px-2 py-1 text-xs font-bold text-white">
          {pct}% OFF
        </div>
      )}
      <div className="line-clamp-2 font-semibold">{deal.title}</div>
      <div className="mt-2 text-sm text-gray-600">{deal.address}</div>
      <Link
        href={`/deals/${deal.id}`}
        className="mt-3 inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
      >
        VIEW DEAL
      </Link>
    </div>
  );
}
