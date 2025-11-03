'use client'
import { useParams } from 'next/navigation'

export default function InsideTheHustlePost() {
  const { slug } = useParams()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 capitalize">Post: {slug}</h1>
      <p>This is where your Inside the Hustle blog content will go.</p>
    </div>
  )
}
