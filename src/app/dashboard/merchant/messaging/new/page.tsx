import React from 'react';
import { createMessage } from './actions';

export const metadata = { title: 'Messaging • New' };

export default function NewMessagePage() {
  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold">Compose Message</h1>

      <form action={createMessage} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
          <input id="subject" name="subject" required className="w-full rounded-lg border px-3 py-2" />
        </div>

        <div className="space-y-2">
          <label htmlFor="body_text" className="block text-sm font-medium">Body (text)</label>
          <textarea id="body_text" name="body_text" rows={4} className="w-full rounded-lg border px-3 py-2" />
        </div>

        <div className="space-y-2">
          <label htmlFor="body_html" className="block text-sm font-medium">Body (HTML, optional)</label>
          <textarea id="body_html" name="body_html" rows={4} className="w-full rounded-lg border px-3 py-2" />
        </div>

        <input type="hidden" name="status" value="sent" />

        <button type="submit" className="rounded-xl px-4 py-2 border">Send</button>
      </form>
    </div>
  );
}
