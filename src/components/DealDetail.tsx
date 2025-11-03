// src/components/DealDetail.tsx
'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

type DealDetailProps = {
  deal: {
    id: string;
    title: string | null;
    description: string | null;
    category: string | null;
    city: string | null;
    image_url: string | null;
    price: number | null;
    original_price: number | null;
    status: string | null;
    start_date: string | null;
    end_date: string | null;
    vendors: {
      id: string;
      name: string | null;
      logo_url: string | null;
      website: string | null;
    } | null;
  };
};

export default function DealDetail({ deal }: DealDetailProps) {
  const [copied, setCopied] = useState(false);

  const priceText = useMemo(() => {
    const p = deal.price ?? undefined;
    const o = deal.original_price ?? undefined;
    if (typeof p === 'number' && typeof o === 'number') {
      return `$${p.toFixed(2)} (was $${o.toFixed(2)})`;
    }
    if (typeof p === 'number') return `$${p.toFixed(2)}`;
    return null;
  }, [deal.price, deal.original_price]);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  }, []);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }, []);

  return (
    <article className="space-y-6">
      <header className="space-y-1">
        <div className="text-sm text-gray-500">{deal.city}</div>
        <h1 className="text-3xl font-bold">{deal.title ?? 'Deal'}</h1>
        {deal.category && <div className="text-sm text-gray-600">{deal.category}</div>}
      </header>

      {deal.image_url ? (
        <img
          src={deal.image_url}
          alt={deal.title ?? ''}
          className="w-full rounded-lg border object-cover"
        />
      ) : (
        <div className="h-64 w-full rounded-lg border bg-gray-100" />
      )}

      {/* Price & CTA */}
      <div className="flex flex-wrap items-center gap-3">
        {priceText && <div className="text-xl font-semibold">{priceText}</div>}
        <button
          onClick={onCopy}
          className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
          title="Copy link"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        {deal.vendors?.website && (
          <a
            href={deal.vendors.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Visit Vendor
          </a>
        )}
      </div>

      {/* Vendor */}
      <section className="flex items-center gap-3 rounded-lg border p-4">
        {deal.vendors?.logo_url ? (
          <img
            src={deal.vendors.logo_url}
            alt={deal.vendors?.name ?? ''}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200" />
        )}
        <div>
          <div className="font-medium">{deal.vendors?.name ?? 'Vendor'}</div>
          {deal.vendors?.website && (
            <a
              href={deal.vendors.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline underline-offset-2"
            >
              {deal.vendors.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
      </section>

      {/* Description */}
      {deal.description && (
        <section className="prose max-w-none">
          <h2>About this deal</h2>
          <p>{deal.description}</p>
        </section>
      )}

      {/* Back to city */}
      {deal.city && (
        <div>
          <Link
            href={`/city/${deal.city}`}
            className="text-sm text-blue-600 underline underline-offset-2"
          >
            ← Back to {deal.city} deals
          </Link>
        </div>
      )}
    </article>
  );
}
