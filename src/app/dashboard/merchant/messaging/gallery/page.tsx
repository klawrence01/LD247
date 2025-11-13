import React from 'react';
import { addGalleryImage } from './actions';

export const metadata = { title: 'Messaging • Gallery' };

export default function GalleryPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Gallery</h1>

      <form action={addGalleryImage} className="space-y-4 max-w-xl">
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium">Image URL</label>
          <input id="url" name="url" type="url" required className="w-full rounded-lg border px-3 py-2" />
        </div>

        <div className="space-y-2">
          <label htmlFor="caption" className="block text-sm font-medium">Caption (optional)</label>
          <input id="caption" name="caption" type="text" className="w-full rounded-lg border px-3 py-2" />
        </div>

        <button type="submit" className="rounded-xl px-4 py-2 border">Add to Gallery</button>
      </form>
    </div>
  );
}
