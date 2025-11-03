// app/pricing/page.tsx

export const metadata = {
  title: "Pricing Plans",
  description: "Simple, affordable plans to grow your business with Local Deals 24/7.",
};

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Pricing Plans</h1>

      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <p>We believe local marketing should be powerful and affordable. Our plans are designed to give you full visibility without the high cost of traditional advertising.</p>

        <h2>Current Promo Rate</h2>
        <p><strong>$49/month</strong> — includes 10 active deal slots per month. Limited-time offer!</p>

        <h2>Standard Plan</h2>
        <p><strong>$79/month</strong> — full access to:</p>
        <ul>
          <li>10 coupon slots per month</li>
          <li>Analytics dashboard</li>
          <li>Follower tools & notifications</li>
          <li>Training & support</li>
        </ul>

        <h2>Need More Slots?</h2>
        <p>Extra coupon packs and promo boosts available soon. Stay tuned or contact your rep.</p>

        <h2>Cancel Anytime</h2>
        <p>No long-term contracts. We grow when you grow — that’s the deal.</p>
      </div>
    </div>
  );
}
