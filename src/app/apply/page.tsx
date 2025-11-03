// app/sales/apply/page.tsx

export const metadata = {
  title: "Apply to Join the LD247 Sales Team",
  description: "Start your journey as a Local Deals 24/7 rep.",
};

export default function SalesApplyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Join the Local Deals 24/7 Sales Team</h1>

      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <p>We’re looking for purpose-driven people who believe in supporting small businesses. If that’s you — let’s build something big together.</p>

        <h2>What You’ll Be Doing</h2>
        <ul>
          <li>Introduce LD247 to local businesses in your area</li>
          <li>Help merchants claim their page and post their first deals</li>
          <li>Earn commission and recognition for every successful signup</li>
        </ul>

        <h2>Perks</h2>
        <ul>
          <li>Commission-based pay (50% on early signups)</li>
          <li>Training, tools, and support</li>
          <li>Join a mission, not just a company</li>
        </ul>

        <h2>Ready to Apply?</h2>
        <p>
          <a href="mailto:sales@localdeals247.com" className="text-blue-600 underline">
            Email sales@localdeals247.com
          </a>{" "}
          or contact your local territory manager to set up an interview.
        </p>
      </div>
    </div>
  );
}
