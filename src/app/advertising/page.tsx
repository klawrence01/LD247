// app/advertising/page.tsx
export default function AdvertisingPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Advertise with Us</h1>
      <p className="mb-4">
        Want to stand out in your city? Local Deals 24/7 offers powerful advertising opportunities to boost your visibility and drive customers directly to your business.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Ad Placement Options</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Homepage Banner:</strong> Featured space on our main homepage.</li>
        <li><strong>City Page Spotlight:</strong> Get listed at the top of your city’s page.</li>
        <li><strong>Search Boost:</strong> Jump to the top of search results for relevant keywords.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How to Get Started</h2>
      <p className="mb-4">
        Reach out to your LD247 sales representative or email us at <a href="mailto:ads@localdeals247.com" className="text-blue-600 underline">ads@localdeals247.com</a> to discuss pricing and availability. Space is limited, so don’t wait!
      </p>
      <p className="mt-6 italic text-sm text-gray-500">*Note: Advertising is only available to active LD247 vendors.</p>
    </main>
  );
}
