'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Merchant = {
  slug: string;
  name: string;
  rating: number;
  reviews: number;
  address: string;
  phone: string;
  coverImg: string;
  logo: string;
  about: string;
};

const DEFAULT_MERCHANT: Merchant = {
  slug: 'tonys-pizza',
  name: "Tony's Pizza",
  rating: 4.7,
  reviews: 238,
  address: '123 Main St, Atlanta, GA',
  phone: '(404) 555-1212',
  coverImg: '/images/vendor-pizza.jpg',
  logo: '/images/pizza.jpg',
  about:
    'Neighborhood favorite since 1989. Fresh dough daily, real mozzarella, and family recipes.',
};

const DEALS = [
  { id: '1', title: '2 Slices + Drink — $6.99', desc: 'Lunch special, dine-in or takeout.', valid: 'Valid: Today–Aug 20' },
  { id: '2', title: 'Family Pie Night — 20% Off', desc: 'Any 2 large pies after 5pm.', valid: 'Valid: Aug 21 only' },
  { id: '3', title: 'Free Garlic Knots', desc: 'With any large pizza purchase.', valid: 'Valid: Aug 22–Aug 25' },
];

export default function CustomizeMerchantPage() {
  const [m, setM] = useState<Merchant>(DEFAULT_MERCHANT);
  const [following, setFollowing] = useState(false);

  const set = (patch: Partial<Merchant>) => setM({ ...m, ...patch });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Customize Page</h1>
          <div className="flex gap-2">
            <Link
              href={`/m/${m.slug}`}
              className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-white bg-white"
              title="Open the public page in a new tab"
              target="_blank"
            >
              View Live Page →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Editor */}
          <section className="lg:col-span-1 rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Page Settings</h2>

            <div className="mt-4 space-y-3">
              <label className="block text-sm">
                <span className="text-gray-600">Business Name</span>
                <input value={m.name} onChange={e => set({ name: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" />
              </label>

              <label className="block text-sm">
                <span className="text-gray-600">Public URL Slug</span>
                <input value={m.slug} onChange={e => set({ slug: e.target.value.replace(/\s+/g,'-').toLowerCase() })} className="mt-1 w-full rounded-lg border px-3 py-2" />
                <span className="text-xs text-gray-500">Live URL: /m/{m.slug}</span>
              </label>

              <label className="block text-sm">
                <span className="text-gray-600">Address</span>
                <input value={m.address} onChange={e => set({ address: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" />
              </label>

              <label className="block text-sm">
                <span className="text-gray-600">Phone</span>
                <input value={m.phone} onChange={e => set({ phone: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" />
              </label>

              <label className="block text-sm">
                <span className="text-gray-600">Cover Image URL</span>
                <input value={m.coverImg} onChange={e => set({ coverImg: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" />
              </label>

              <label className="block text-sm">
                <span className="text-gray-600">Logo URL</span>
                <input value={m.logo} onChange={e => set({ logo: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" />
              </label>

              <label className="block text-sm">
                <span className="text-gray-600">About</span>
                <textarea value={m.about} onChange={e => set({ about: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" rows={3} />
              </label>

              <div className="pt-2 text-xs text-gray-500">
                (Demo only — changes are not saved to a database yet.)
              </div>
            </div>
          </section>

          {/* Right: Live Preview */}
          <section className="lg:col-span-2 rounded-2xl border bg-white shadow-sm overflow-hidden">
            {/* Hero */}
            <div className="relative h-48 w-full">
              {m.coverImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.coverImg} alt="cover" className="h-full w-full object-cover opacity-70" />
              ) : (
                <div className="h-full w-full bg-gradient-to-r from-orange-500 to-amber-500" />
              )}
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl border-2 border-white/80 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {m.logo ? <img src={m.logo} alt="logo" className="h-full w-full object-cover" /> : null}
                </div>
                <div className="text-white drop-shadow">
                  <div className="text-xl font-semibold">{m.name}</div>
                  <div className="text-sm opacity-90">
                    {m.rating}★ · {DEFAULT_MERCHANT.reviews} reviews
                  </div>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={() => setFollowing(v => !v)}
                    className={`rounded-xl px-3 py-2 text-sm font-medium shadow ${following ? 'bg-white text-orange-600' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                  >
                    {following ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
            </div>

            {/* Info & deals */}
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border p-4">
                  <div className="font-medium">Visit</div>
                  <div className="mt-1 text-gray-700">{m.address}</div>
                  <div className="mt-3">
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.address)}`}
                      className="text-orange-600 hover:underline"
                      target="_blank"
                    >
                      Get Directions →
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="font-medium">Call</div>
                  <Link href={`tel:${m.phone}`} className="mt-1 block text-gray-700">
                    {m.phone}
                  </Link>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="font-medium">About</div>
                  <div className="mt-1 text-gray-700 text-sm">{m.about}</div>
                </div>
              </div>

              <section className="mt-6">
                <h2 className="mb-2 text-lg font-semibold">Current Deals</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {DEALS.map((d) => (
                    <div key={d.id} className="rounded-2xl border bg-white p-4 shadow-sm">
                      <div className="text-base font-medium">{d.title}</div>
                      <div className="mt-1 text-sm text-gray-600">{d.desc}</div>
                      <div className="mt-2 text-xs text-gray-500">{d.valid}</div>
                      <div className="mt-4 flex gap-2">
                        <button className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-600">
                          View Deal
                        </button>
                        <button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50">
                          Save to Phone
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
