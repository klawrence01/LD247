import Link from 'next/link'

const posts = [
  { title: 'You Are an Everyday Hero', slug: 'you-are-an-everyday-hero' },
  { title: '10 Reasons You Need LD247', slug: '10-reasons-you-need-ld247' }
]

export default function EverydayHeroesIndex() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Everyday Heroes</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blogs/everyday-heroes/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
