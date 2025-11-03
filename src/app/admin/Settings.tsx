import { getPostContent } from '@/lib/getPostContent'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostContent(params.slug, 'behind-the-hustle')

  if (!post) {
    notFound()
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {post.date} • {post.author}
      </p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
