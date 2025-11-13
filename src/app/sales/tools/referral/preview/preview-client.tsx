"use client";

import { useSearchParams } from "next/navigation";

export default function PreviewClient() {
  const params = useSearchParams();
  const subject = params.get("subject") ?? "";
  const body = params.get("body") ?? "";

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Referral Preview</h1>
      <div>
        <div className="text-sm text-gray-500">Subject</div>
        <div className="font-medium">{subject || "—"}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Body</div>
        <pre className="whitespace-pre-wrap">{body || "—"}</pre>
      </div>
    </div>
  );
}
