"use client";

import { marked } from "marked";

const MD = `
# Admin help

We can render markdown here later.
`;

marked.setOptions({
  gfm: true,
  breaks: true,
  // headerIds: true, // ❌ TS doesn't know this option here
  // mangle: false,   // same
});

export default function AdminHelpPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Admin Help</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: marked(MD) }}
      />
    </main>
  );
}
