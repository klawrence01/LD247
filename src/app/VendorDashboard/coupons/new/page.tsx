'use client';

import DealForm from '../_components/DealForm';

export default function NewDealPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Create Deal</h1>
      <DealForm />
    </div>
  );
}
