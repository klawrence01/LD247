// src/app/VendorDashboard/coupons/edit/[id]/page.tsx

import DealForm from "../../DealForm";

export default async function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Edit Deal</h1>
      <p className="text-sm text-muted-foreground">
        Editing deal: <code>{id}</code>
      </p>

      {/* keep the form visible, don't pass unknown props */}
      <DealForm />
    </div>
  );
}
