// src/components/site-footer.tsx
export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-600">
        © {new Date().getFullYear()} Local Deals 24/7 — Built for Small Business Heroes.
      </div>
    </footer>
  );
}
