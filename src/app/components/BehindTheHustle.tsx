"use client";

import React from "react";
import Link from "next/link";

export default function BehindTheHustle() {
  // Static sample; we can later read real MD posts.
  const posts = [
    { slug: "why-im-building-local-deals-247", title: "Why I’m Building Local Deals 24/7", teaser: "The mission, the stakes, and the plan." },
    { slug: "my-why-is-greater-than-my-fear", title: "My Why Is Greater Than My Fear", teaser: "Pushing through the early days." }
  ];

  return (
    <section style={{ padding: "2rem", borderTop: "1px solid #eee", background: "#fafafa" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Behind the Hustle</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {posts.map(p => (
          <Link key={p.slug} href={`/blogs/behind-the-hustle/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ border: "1px solid #ddd", borderRadius: 12, background: "#fff", padding: "1rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{p.title}</h3>
              <p style={{ margin: "0.5rem 0 0", color: "#555" }}>{p.teaser}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
