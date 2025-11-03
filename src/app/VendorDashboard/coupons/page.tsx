'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Deal, deleteDeal, loadDeals, saveDeals, newId } from '../_lib/deals';

export default function DealsListPage() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => setDeals(loadDeals()), []);

  const onDelete = (id: string) => {
    if (!confirm('Delete this deal?')) return;
    deleteDeal(id);
    setDeals(loadDeals());
  };

  const onDuplicate = (deal: Deal) => {
    const copy: Deal = {
      ...deal,
      id: newId(),
      title: deal.title + ' (Copy)',
      // keep dates & status as-is; you can tweak if desired
    };
    const list = [copy, ...deals];
    saveDeals(list);
    setDeals(list);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Deals</h1>
        <div className="flex gap-2">
          <Link href="/vendor/slots" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
            Purchase Slots
          </Link>
          <Link href="/vendor/coupons/new" className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600">
            + Create Deal
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Start</th>
              <th className="py-2 pr-4">End</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {deals.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="py-2 pr-4">
                  <div className="font-medium">{d.title}</div>
                  <div className="text-xs text-gray-500">{d.description}</div>
                </td>
                <td className="py-2 pr-4">{d.status}</td>
                <td className="py-2 pr-4">{d.startDate}</td>
                <td className="py-2 pr-4">{d.endDate}</td>
                <td className="py-2 pr-4">{d.price || '—'}</td>
                <td className="py-2 pr-0">
                  <div className="flex gap-3">
                    <Link href={`/vendor/coupons/edit/${d.id}`} className="text-orange-600 hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => onDuplicate(d)} className="text-gray-600 hover:underline">
                      Duplicate
                    </button>
                    <button onClick={() => onDelete(d.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {deals.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No deals yet. Click “Create Deal” to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
