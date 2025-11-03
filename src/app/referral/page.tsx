// app/referral/page.tsx

export const metadata = {
  title: "Referral Program",
  description: "Invite your friends and earn rewards for supporting local businesses.",
};

export default function ReferralPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Referral Program</h1>

      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <p>Love Local Deals 24/7? Help us grow and get rewarded when your friends join.</p>

        <h2>How It Works</h2>
        <ul>
          <li>1. Share your custom invite link with friends or business owners.</li>
          <li>2. When someone signs up using your link, we’ll track it.</li>
          <li>3. Get credit toward free months or even cash rewards.</li>
        </ul>

        <h2>Track Your Referrals</h2>
        <p>
          Log in to your dashboard to see how many referrals you’ve made and what rewards you’ve earned.
        </p>

        <h2>Start Sharing</h2>
        <p>
          Copy your referral link and start spreading the word. Every share helps grow the local movement.
        </p>
      </div>
    </div>
  );
}
