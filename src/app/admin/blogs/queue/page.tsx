'use client'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { useState } from 'react'

type BlogPost = {
  title: string
  slug: string
  date: string | null
  status: 'Published' | 'Scheduled' | 'Draft'
  blogType: string
}

const BLOG_FOLDERS = ['behind-the-hustle', 'inside-the-hustle', 'everyday-heroes']

function getStatus(dateString: string | null): 'Published' | 'Scheduled' | 'Draft' {
  if (!dateString) return 'Draft'
  const now = new Date()
  const postDate = new Date(dateString)
  return postDate <= now ? 'Published' : 'Scheduled'
}

function getAllPosts(): BlogPost[] {
  const allPosts: BlogPost[] = []

  for (const blogType of BLOG_FOLDERS) {
    const blogDir = path.join(process.cwd(), 'content', blogType)
    if (!fs.existsSync(blogDir)) continue

    const files = fs.readdirSync(blogDir)

    files.forEach((filename) => {
      const filePath = path.join(blogDir, filename)
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)

      const title = data.title || slug
      const date = data.date || null
      const status = getStatus(date)

      allPosts.push({ title, slug, date, status, blogType })
    })
  }

  return allPosts.sort((a, b) => {
    const dateA = new Date(a.date || '').getTime()
    const dateB = new Date(b.date || '').getTime()
    return dateB - dateA
  })
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    Published: 'bg-green-100 text-green-800',
    Scheduled: 'bg-yellow-100 text-yellow-800',
    Draft: 'bg-gray-100 text-gray-800',
  }
  return (
    <span className={`text-sm px-2 py-1 rounded-full font-medium ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  )
}

export default function BlogQueuePage() {
  const allPosts = getAllPosts()
  const [filter, setFilter] = useState<'All' | 'Published' | 'Scheduled' | 'Draft'>('All')

  const filteredPosts =
    filter === 'All' ? allPosts : allPosts.filter((post) => post.status === filter)

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Blog Queue Dashboard</h1>
        <Link
          href="/admin/blogs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Blog
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        {['All', 'Published', 'Scheduled', 'Draft'].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded-full border ${
              filter === status ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            onClick={() => setFilter(status as typeof filter)}
          >
            {status}
          </button>
        ))}
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Title</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Publish Date</th>
            <th className="p-2">Link</th>
            <th className="p-2">Edit</th>
