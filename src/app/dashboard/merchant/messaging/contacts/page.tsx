// C:\Users\Owner\ld247\src\app\dashboard\merchant\messaging\contacts\page.tsx

export default function MerchantMessagingContactsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Messaging Contacts
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            This is the vendor&apos;s contacts hub for the messaging center.
            Live data and search will be wired in later. For now this page is
            static so the project can deploy cleanly.
          </p>
        </header>

        {/* Placeholder content */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
          <h2 className="text-sm font-semibold tracking-tight">
            Contacts will appear here
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            In the final version, this screen will list all of your messaging
            contacts, show recent conversations, and let you start a new chat
            with any customer or lead.
          </p>

          <ul className="mt-4 space-y-2 text-xs text-slate-400">
            <li>• Search or filter contacts by name and channel.</li>
            <li>• View unread messages and last-contacted time.</li>
            <li>• Tap a contact to open the full conversation thread.</li>
          </ul>

          <p className="mt-4 text-xs text-slate-500">
            For now, this layout is a safe placeholder so the dashboard compiles
            on Vercel. We&apos;ll plug in Supabase queries and real message data
            once deployment is stable.
          </p>
        </div>
      </div>
    </div>
  );
}
