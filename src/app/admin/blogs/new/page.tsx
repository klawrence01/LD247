'use client'

import { useState } from 'react'
import slugify from '@sindresorhus/slugify'

export default function NewBlogPostPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [date, setDate] = useState('')
  const [blogType, setBlogType] = useState('behind-the-hustle')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const handleTitleChange = async (value: string) => {
    setTitle(value)
    const generatedSlug = await slugify(value)
    setSlug(generatedSlug)
  }

  const handleSubmit = async () => {
    setStatus('saving')

    const postData = {
      title,
      slug,
      date,
      blogType,
      content,
    }

    const res = await fetch('/api/save-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })

    if (res.ok) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create New Blog Post</h1>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
        placeholder="Enter blog title"
      />

      <label className="block mb-2 font-medium">Slug</label>
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
        placeholder="auto-generated-slug"
      />

      <label className="block mb-2 font-medium">Publish Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
      />

      <label className="block mb-2 font-medium">Blog Type</label>
      <select
        value={blogType}
        onChange={(e) => setBlogType(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
      >
        <option value="behind-the-hustle">Behind the Hustle</option>
        <option value="inside-the-hustle">Inside the Hustle</option>
        <option value="everyday-heroes">Everyday Heroes</option>
      </select>

      <label className="block mb-2 font-medium">Blog Content</label>
      <textarea
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
        placeholder="Write your blog in Markdown..."
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Blog Post
      </button>

      {status === 'success' && <p className="text-green-700 mt-4">✅ Post saved successfully!</p>}
      {status === 'error' && <p className="text-red-600 mt-4">❌ Error saving post.</p>}
    </main>
  )
}
