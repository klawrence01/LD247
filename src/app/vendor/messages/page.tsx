// app/vendor/messages/page.tsx
import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = {
  title: "Vendor Messages | Local Deals 24/7",
  description: "Send and receive messages with your customers and sales rep.",
};

export default async function VendorMessagesPage() {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl font-semibold mb-2">Sign in required</h1>
        <p className="text-gray-500 mb-6">
          Please log in to access your message center.
        </p>
        <a
          href="/login"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">
          Vendor Message Center
        </h1>
        <p className="text-neutral-400 mb-6">
          Here you can send notes to your customers or contact your sales rep.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Send a Note</h2>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-200 placeholder-neutral-500"
              />
              <textarea
                placeholder="Write your message..."
                className="w-full h-32 bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-200 placeholder-neutral-500"
              ></textarea>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Inbox</h2>
            <div className="text-neutral-500 text-sm">
              No new messages yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
