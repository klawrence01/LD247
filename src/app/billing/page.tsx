// app/billing/page.tsx
export default function BillingPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Plans & Pricing</h1>
      <p className="mb-4">
        Local Deals 24/7 was built to give small businesses affordable marketing tools that actually work. No hidden fees. No contracts. Just results.
      </p>
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">🚀 Intro Offer: $49/month</h2>
        <p>Includes 10 deal slots per month, full analytics dashboard, and access to all promotional tools.</p>
        <p className="text-sm mt-1 text-gray-500">This rate is guaranteed for your first 12 months.</p>
      </div>
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">💼 Standard Plan: $79/month</h2>
        <p>Same features as the intro plan, but with flexible month-to-month terms and priority support.</p>
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-2">What's Included</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>10 active deal slots per month</li>
        <li>Custom merchant page</li>
        <li>Testimonial management</li>
        <li>Built-in referral program</li>
        <li>Optional advertising add-ons</li>
      </ul>
      <p className="mt-6 text-gray-600">
        Questions about billing? Contact us at <a href="mailto:billing@localdeals247.com" className="text-blue-600 underline">billing@localdeals247.com</a>
      </p>
    </main>
  );
}
