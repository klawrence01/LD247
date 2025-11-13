// src/app/sales/tools/referral/success/success-client.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessClient() {
  const params = useSearchParams();
  const code = params.get("code") ?? "";
  const invited = params.get("invited") ?? "";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Referral Success</h1>
      <p className="mt-2 text-sm text-gray-700">
        Thanks! {invited && <>Invited: <b>{invited}</b>. </>}
        {code && <>Confirmation code: <b>{code}</b>.</>}
      </p>
    </div>
  );
}
