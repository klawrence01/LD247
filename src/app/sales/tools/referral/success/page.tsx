// src/app/sales/tools/referral/success/page.tsx
import { Suspense } from "react";
import SuccessClient from "./success-client";

// avoid static prerender pitfalls for query-string pages
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Referral • Success",
};

export default function ReferralSuccessPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <SuccessClient />
    </Suspense>
  );
}
