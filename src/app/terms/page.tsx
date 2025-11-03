// app/terms/page.tsx

export const metadata = {
  title: "Terms and Conditions",
  description: "Review the terms and conditions for using Local Deals 24/7.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <p className="text-sm text-gray-600 mb-4 italic">
        Last updated: August 5, 2025
      </p>

      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <p>
          Welcome to Local Deals 24/7. By using this platform, you agree to the
          following terms and conditions. Please read them carefully.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Local Deals 24/7, you agree to be bound by these
          terms. If you do not agree, you may not use the platform.
        </p>

        <h2>2. Use of the Platform</h2>
        <p>
          You agree to use the platform only for lawful purposes. You may not use
          the platform in a way that violates any laws or regulations.
        </p>

        <h2>3. Merchant Responsibilities</h2>
        <p>
          Merchants are responsible for the accuracy of their listings, deals,
          business hours, and customer service. Local Deals 24/7 is not liable for
          any false claims or disputes between merchants and users.
        </p>

        <h2>4. User Responsibilities</h2>
        <p>
          Users agree not to misuse coupons or submit fraudulent claims. Abuse of
          the platform may result in account termination.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on this platform, including logos, text, and designs, is the
          property of Local Deals 24/7 unless otherwise stated. You may not use or
          reproduce any part of this platform without permission.
        </p>

        <h2>6. Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts at our discretion,
          especially in cases of fraud, abuse, or violation of these terms.
        </p>

        <h2>7. Changes to These Terms</h2>
        <p>
          We may update these terms at any time. Continued use of the platform
          after changes constitutes acceptance of those changes.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          For questions or concerns, please contact us at{" "}
          <a href="mailto:support@localdeals247.com">
            support@localdeals247.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
