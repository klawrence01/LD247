import React from "react";

export function AdminHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
      {description ? (
        <p className="text-sm text-white/50 mt-2">{description}</p>
      ) : null}
    </div>
  );
}
