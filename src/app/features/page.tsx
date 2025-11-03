// app/features/page.tsx

export const metadata = {
  title: "Features",
  description: "All the tools that make Local Deals 24/7 powerful and easy to use.",
};

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Platform Features</h1>

      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <h2>Daily Deal Calendar</h2>
        <p>Schedule and control your offers on specific days to maximize foot traffic and visibility.</p>

        <h2>Analytics Dashboard</h2>
        <p>Track views, redemptions, ratings, testimonials, and where your traffic is coming from.</p>

        <h2>Follower Tools</h2>
        <p>Customers can follow your business and get alerts when you post a new deal or message.</p>

        <h2>Messaging System</h2>
        <p>Send out quick notes, updates, or specials directly to your followers’ inboxes.</p>

        <h2>Referral Tracking</h2>
        <p>Reward users or merchants for spreading the word with our built-in referral tools.</p>
      </div>
    </div>
  );
}
