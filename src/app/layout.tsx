import "./globals.css";
import React from "react";

export const metadata = {
  title: "Local Deals 24/7",
  description: "LD247 – Advertising You Can Count On",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
