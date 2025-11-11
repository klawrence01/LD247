// src/app/approvals/page.tsx
import { redirect } from "next/navigation";

export default function ApprovalsRedirectPage() {
  // send anyone hitting /approvals to the real admin screen
  redirect("/admin/approvals");
}
