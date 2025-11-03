// app/training/page.tsx

export const metadata = {
  title: "Vendor Training Center",
  description: "Get the most out of Local Deals 24/7 with quick training guides.",
};

export default function TrainingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Vendor Training Center</h1>

      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <p>Welcome to your one-stop shop for learning how to succeed with Local Deals 24/7.</p>

        <h2>Getting Started</h2>
        <p>Learn how to set up your profile, upload your logo, and complete your business details.</p>

        <h2>Creating Deals</h2>
        <p>Step-by-step guide to scheduling, previewing, and posting your daily or weekly deals.</p>

        <h2>Using the Deal Calendar</h2>
        <p>Maximize visibility by filling in your coupon slots and planning out the week.</p>

        <h2>Analytics & Performance</h2>
        <p>Understand how your deals are performing using your analytics dashboard.</p>

        <h2>Testimonials & Follower Tools</h2>
        <p>Get more reviews, use the “Follow Us” feature, and keep your customers coming back.</p>
      </div>
    </div>
  );
}
