"use client";

import { useSearchParams } from "next/navigation";

export default function VendorJoinClient() {
  const params = useSearchParams();
  const ref = params.get("ref") ?? "";

  // Put your existing join form/UI here.
  // If you used the query string in the old page, read it via `ref` above.
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Become a Vendor</h1>
      {ref && (
        <p className="text-sm opacity-70">
          Referred by: <code>{ref}</code>
        </p>
      )}
      {/* TODO: move the real form/CTA here */}
    </div>
  );
}
