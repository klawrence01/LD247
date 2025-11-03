"use client";

import { useState } from "react";
import NoteEditor from "@/components/NoteEditor";

export const metadata = {
  title: "Send a Note",
  description: "Write a simple update to your customers.",
};

export default function SendNotePage() {
  const [subject, setSubject] = useState("");
  const [audience, setAudience] = useState<"all" | "list" | "tag">("all");
  const [audienceRef, setAudienceRef] = useState("");
  const [html, setHtml] = useState("");

  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // TODO: load actual business_id from session/profile
  const business_id = "__REPLACE_WITH_BUSINESS_ID__";

  async function saveDraft() {
    setSending(true);
    setToast(null);
    try {
      const res = await fetch("/api/notes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id,
          subject,
          body_html: html,
          audience_type: audience,
          audience_ref: audience === "all" ? null : audienceRef || null,
          status: "draft",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save draft");
      setToast("Draft saved.");
    } catch (e: any) {
      setToast(e.message || "Error saving draft");
    } finally {
      setSending(false);
    }
  }

  function sendTest() {
    // Placeholder for test send — wire later to email function
    setToast("Test sent (placeholder).");
  }

  function previewNote() {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>Preview</title></head><body>${html}</body></html>`);
    win.document.close();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2
