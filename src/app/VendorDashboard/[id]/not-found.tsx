export default function VendorNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-semibold">Vendor not found</h1>
      <p className="text-gray-600">
        Try browsing the <a className="underline" href="/city">cities directory</a>.
      </p>
    </div>
  );
}
