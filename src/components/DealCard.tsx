// src/components/DealCard.tsx
import Link from "next/link";
import type { Deal } from "@/lib/mock";

export default function DealCard({ deal, href }: { deal: Deal; href?: string }) {
  const content = (
    <div className="rounded-2xl overflow-hidden border hover:shadow transition">
      <img src={deal.image} alt={deal.title} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{deal.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{deal.description}</p>
        <div className="mt-2 text-sm">
          {deal.priceText && <span className="font-medium">{deal.priceText}</span>}
          {deal.percentOff && <span className="font-medium">{deal.percentOff}% Off</span>}
        </div>
        <div className="mt-2 text-xs text-gray-500">Valid: {deal.date}</div>
      </div>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
