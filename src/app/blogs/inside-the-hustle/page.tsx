import Link from 'next/link'

const posts = [
  { title: 'The Pivot That Saved the Project', slug: 'the-pivot' },
  { title: 'The Deal Calendar Gamble', slug: 'deal-calendar-gamble' }
]

export default function InsideTheHustleIndex() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Inside the Hustle</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blogs/inside-the-hustle/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
