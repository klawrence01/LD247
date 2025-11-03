'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Deal, getDeal } from '../../../_lib/deals';
import DealForm from '../../_components/DealForm';

export default function EditDealPage() {
  const params = useParams<{ id: string }>();
  const [deal, setDeal] = useState<Deal | null>(null);

  useEffect(() => {
    const d = getDeal(params.id);
    setDeal(d || null);
  }, [params.id]);

  if (!deal) {
    return <div className="p-6">Deal not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Edit Deal</h1>
      <DealForm initial={deal} />
    </div>
  );
}
