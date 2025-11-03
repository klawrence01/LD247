// app/privacy/page.tsx

export const metadata = {
  title: "Privacy Policy",
  description: "Understand how Local Deals 24/7 collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-sm text-gray-600 mb-4 italic">
        Last updated: August 5, 2025
      </p>

      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <p>
          At Local Deals 24/7, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly, such as your name, email, business details, and feedback. We may also collect usage data like page visits and clicks to improve the platform.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          Your information helps us personalize your experience, provide support, improve features, and send updates. We do not sell your data to third parties.
        </p>

        <h2>3. Cookies</h2>
        <p>
          We use cookies to enhance functionality and track usage patterns. You can disable cookies in your browser settings, but some features may not work correctly.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your information. However, no system is 100% secure, and we encourage you to protect your own login credentials.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data by contacting us. We will respond promptly.
        </p>

        <h2>6. Children's Privacy</h2>
        <p>
          Local Deals 24/7 is not intended for children under 13. We do not knowingly collect information from children.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy at any time. Continued use of the platform after changes means you accept the new terms.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this policy, please contact us at{" "}
          <a href="mailto:support@localdeals247.com">
            support@localdeals247.com
          </a>.
        </p>
      </div>
    </div>
  );
}
