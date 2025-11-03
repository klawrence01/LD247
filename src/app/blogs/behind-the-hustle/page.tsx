import Link from 'next/link'

const posts = [
  { title: 'Why I’m Building Local Deals 24/7', slug: 'why-im-building' },
  { title: 'Advertising is expensive, but it doesn’t have to be', slug: 'advertising-costs' }
]

export default function BehindTheHustleIndex() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📰 Behind the Hustle</h1>
      {posts.length === 0 ? (
        <p>No blog posts published yet. Stay tuned!</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.slug}>
              <Link href={`/blogs/behind-the-hustle/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
