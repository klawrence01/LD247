// app/faq/page.tsx

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about Local Deals 24/7.",
};

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <h2>How do I use a deal?</h2>
        <p>Browse deals in your city, save the ones you like, and show the deal at the business when you’re ready to use it.</p>

        <h2>Do I need to pay for a coupon?</h2>
        <p>Nope! Just save it to your phone. There’s no upfront cost to redeem deals on Local Deals 24/7.</p>

        <h2>How often are deals updated?</h2>
        <p>Deals can change daily or weekly. Merchants update their offers based on availability and demand.</p>

        <h2>Can I follow my favorite businesses?</h2>
        <p>Yes! Hit the “Follow” button on any business page to get alerts when new deals drop.</p>

        <h2>I’m a business owner. How do I get listed?</h2>
        <p>Head over to our merchant sign-up page or speak with a Local Deals 24/7 rep to get started.</p>
      </div>
    </div>
  );
}
