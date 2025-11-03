// src/components/CityDealsBrowser.tsx
'use client';

import { useMemo, useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CityDealsGrid from './CityDealsGrid';

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

export default function CityDealsBrowser({ deals }: { deals: DealRow[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Pull initial state from query
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState(searchParams.get('category') ?? 'All');
  const [sort, setSort] = useState<'relevance' | 'alpha' | 'price'>(
    (searchParams.get('sort') as any) ?? 'relevance'
  );

  // Push state → URL (debounced for query)
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      query ? params.set('q', query) : params.delete('q');
      category && category !== 'All'
        ? params.set('category', category)
        : params.delete('category');
      sort && sort !== 'relevance'
        ? params.set('sort', sort)
        : params.delete('sort');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 180);
    return () => clearTimeout(t);
  }, [query, category, sort, pathname, router, searchParams]);

  // Unique categories
  const categories = useMemo(() => {
    const s = new Set<string>(['All']);
    for (const d of deals) if (d.category) s.add(d.category);
    return Array.from(s);
  }, [deals]);

  // Filter + sort on client
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = deals.filter((d) => {
      const matchesQ =
        !q ||
        (d.title ?? '').toLowerCase().includes(q) ||
        (d.vendor_name ?? '').toLowerCase().includes(q) ||
        (d.category ?? '').toLowerCase().includes(q);
      const matchesCat = category === 'All' || d.category === category;
      return matchesQ && matchesCat;
    });

    if (sort === 'alpha') {
      list = [...list].sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
    } else if (sort === 'price') {
      // naive numeric parse from " $6.00 (was $12.00) "
      const num = (s?: string | null) =>
        s ? Number((s.match(/[\d.]+/) ?? ['9999'])[0]) : 9999;
      list = [...list].sort((a, b) => num(a.price_text) - num(b.price_text));
    }
    return list;
  }, [deals, query, category, sort]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <label className="mb-1 block text-sm text-gray-600">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search deals or vendors…"
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded border px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded border px-3 py-2"
          >
            <option value="relevance">Relevance</option>
            <option value="alpha">A → Z</option>
            <option value="price">Price (low)</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <CityDealsGrid deals={filtered} />

      {filtered.length === 0 && (
        <p className="text-gray-600">No matching deals. Try clearing filters.</p>
      )}
    </div>
  );
}
