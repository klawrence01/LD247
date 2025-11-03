'use client';

import { useState } from 'react';
import { Deal, DealStatus, newId, upsertDeal, recomputeStatus } from '../../_lib/deals';
import { useRouter } from 'next/navigation';

type Props = { initial?: Partial<Deal> };

const STATUS: DealStatus[] = ['Draft', 'Scheduled', 'Active', 'Expired'];

export default function DealForm({ initial = {} }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Deal>({
    id: initial.id || newId(),
    title: initial.title || '',
    description: initial.description || '',
    price: initial.price || '',
    image: initial.image || '',
    startDate: initial.startDate || new Date().toISOString().slice(0, 10),
    endDate:
      initial.endDate ||
      new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    status: (initial.status as DealStatus) || 'Draft',
    redemptionLimit:
      typeof initial.redemptionLimit === 'number' ? initial.redemptionLimit : null,
  });

  const set = (patch: Partial<Deal>) => setForm({ ...form, ...patch });

  const submit = (publish = false) => {
    // Basic validation
    if (!form.title.trim()) return alert('Title is required');
    if (new Date(form.endDate) < new Date(form.startDate))
      return alert('End date must be after start date');

    // If publishing, compute status from dates (Draft stays Draft unless publish is true)
    const finalStatus = publish ? recomputeStatus(form) : form.status;
    upsertDeal({ ...form, status: finalStatus });
    router.push('/vendor/coupons');
  };

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="text-gray-600">Title</span>
          <input
            value={form.title}
            onChange={(e) => set({ title: e.target.value })}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="e.g., Family Pie Night — 20% Off"
          />
        </label>

        <label className="block text-sm">
          <span className="text-gray-600">Price / Discount (optional)</span>
          <input
            value={form.price || ''}
            onChange={(e) => set({ price: e.target.value })}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="$6.99 / 20% Off / Free"
          />
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="text-gray-600">Description</span>
          <textarea
            value={form.description}
            onChange={(e) => set({ description: e.target.value })}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            rows={3}
            placeholder="What’s included, any conditions, dine-in/takeout, etc."
          />
        </label>

        <label className="block text-sm">
          <span className="text-gray-600">Start Date</span>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => set({ startDate: e.target.value })}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          <span className="text-gray-600">End Date</span>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => set({ endDate: e.target.value })}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          <span className="text-gray-600">Status</span>
          <select
            value={form.status}
            onChange={(e) => set({ status: e.target.value as DealStatus })}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-gray-600">Redemption Limit (optional)</span>
          <input
            type="number"
            value={form.redemptionLimit ?? ''}
            onChange={(e) =>
              set({ redemptionLimit: e.target.value ? Number(e.target.value) : null })
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="e.g., 100"
          />
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="text-gray-600">Image URL (optional)</span>
          <input
            value={form.image || ''}
            onChange={(e) => set({ image: e.target.value })}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="https://…"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => submit(false)}
          className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50"
        >
          Save as Draft
        </button>
        <button
          onClick={() => submit(true)}
          className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
        >
          Save & Publish
        </button>
      </div>
    </div>
  );
}
