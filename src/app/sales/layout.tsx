import "../globals.css"; // from src/app/sales → src/app/globals.css
import React from "react";

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
