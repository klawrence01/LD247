// app/testimonials/page.tsx

export const metadata = {
  title: "Testimonials",
  description: "What people are saying about Local Deals 24/7.",
};

export default function TestimonialsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">What People Are Saying</h1>

      <div className="space-y-6">
        <blockquote className="border-l-4 pl-4 border-orange-500 italic">
          “Local Deals 24/7 helped us bring in new customers almost immediately. Best $49 I’ve ever spent.”
          <footer className="text-sm text-gray-500 mt-1">— Sarah L., Café Owner</footer>
        </blockquote>

        <blockquote className="border-l-4 pl-4 border-orange-500 italic">
          “I love how easy it is to find deals around my city. I’ve already saved over $120 in just two weeks.”
          <footer className="text-sm text-gray-500 mt-1">— Marcus T., User</footer>
        </blockquote>

        <blockquote className="border-l-4 pl-4 border-orange-500 italic">
          “Our business page looks amazing. The dashboard is so much easier than Groupon.”
          <footer className="text-sm text-gray-500 mt-1">— The Rusty Nail Barbershop</footer>
        </blockquote>
      </div>
    </div>
  );
}
