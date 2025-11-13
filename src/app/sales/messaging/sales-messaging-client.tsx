"use client";

import { useSearchParams } from "next/navigation";

export default function SalesMessagingClient() {
  const params = useSearchParams();
  const filter = params.get("filter") ?? "";
  const q = params.get("q") ?? "";

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Sales Messaging</h1>

      {(filter || q) && (
        <div className="text-sm opacity-70">
          {!!filter && <>Filter: <code>{filter}</code>{" "}</>}
          {!!q && <>Query: <code>{q}</code></>}
        </div>
      )}

      {/* TODO: move your current messaging UI here */}
    </div>
  );
}
