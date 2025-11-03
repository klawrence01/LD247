// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
        © {new Date().getFullYear()} Local Deals 24/7 — Built for Small Business Heroes.
      </div>
    </footer>
  );
}
