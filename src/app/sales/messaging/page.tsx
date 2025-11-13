import { Suspense } from "react";
import SalesMessagingClient from "./sales-messaging-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sales • Messaging" };

export default function SalesMessagingPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <SalesMessagingClient />
    </Suspense>
  );
}
