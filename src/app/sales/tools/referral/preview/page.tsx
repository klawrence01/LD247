import { Suspense } from "react";
import PreviewClient from "./preview-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Referral • Preview" };

export default function ReferralPreviewPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <PreviewClient />
    </Suspense>
  );
}
