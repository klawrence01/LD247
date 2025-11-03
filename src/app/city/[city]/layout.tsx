// src/app/city/[city]/layout.tsx
import type { ReactNode } from "react";

export default function CityLayout({ children }: { children: ReactNode }) {
  return <section className="container mx-auto">{children}</section>;
}
