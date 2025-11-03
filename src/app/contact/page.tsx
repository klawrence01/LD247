import React from 'react';

const ContactPage = () => {
  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-orange-600 mb-6 text-center">Contact Us</h1>
      <p className="text-center text-gray-700 mb-6">
        Got questions? Want to feature your business? We’d love to hear from you.
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded font-semibold"
        >
          Send Message
        </button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-6">
        Or email us directly at <a href="mailto:support@localdeals247.com" className="underline">support@localdeals247.com</a>
      </p>
    </main>
  );
};

export default ContactPage;
