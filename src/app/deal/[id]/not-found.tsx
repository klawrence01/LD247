export default function DealNotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold mb-3">Deal not found</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Try browsing the <a className="underline" href="/city">cities directory</a>.
      </p>
    </div>
  );
}
