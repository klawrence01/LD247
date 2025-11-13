import { Suspense } from "react";
import VendorJoinClient from "./join-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Join LD247 (Vendor)" };

export default function VendorJoinPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <VendorJoinClient />
    </Suspense>
  );
}
