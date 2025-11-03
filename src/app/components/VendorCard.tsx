"use client";

import React from "react";
import Link from "next/link";

export default function VendorCard({
  slug,
  name,
  image,
}: {
  slug: string;
  name: string;
  image: string;
}) {
  const onImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = "/logo-ld247.png";
  };

  return (
    <Link href={`/vendor/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <img
          src={image}
          alt={name}
          onError={onImgError}
          style={{ width: "100%", height: 140, objectFit: "cover" }}
        />
        <div style={{ padding: "0.75rem 1rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: 0 }}>{name}</h3>
        </div>
      </div>
    </Link>
  );
}
