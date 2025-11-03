"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { trainingModules } from "@/components/training/content"

export default function TrainingModulePage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const moduleData = trainingModules.find((m) => m.slug === slug)

  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem("trainingProgress")
    const obj = raw ? JSON.parse(raw) : {}
    setCompleted(Boolean(obj[slug]))
  }, [slug])

  if (!moduleData) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Module not found</h1>
        <p className="mt-2">
          <Link href="/vendor/training" className="text-orange-600 underline">
            Back to Training Center
          </Link>
        </p>
      </div>
    )
  }

  const toggleComplete = () => {
    const raw = localStorage.getItem("trainingProgress")
    const obj = raw ? JSON.parse(raw) : {}
    obj[slug] = !completed
    localStorage.setItem("trainingProgress", JSON.stringify(obj))
    setCompleted(!completed)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.push("/vendor/training")}
            className="text-sm text-gray-600 underline"
          >
            ← Back to Training Center
          </button>
          <h1 className="text-2xl font-bold mt-2">{moduleData.title}</h1>
          <p className="text-gray-600 mt-1">{moduleData.intro}</p>
        </div>
        <button
          className={
            "px-3 py-2 rounded text-sm " +
            (completed
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-900")
          }
          onClick={toggleComplete}
        >
          {completed ? "Completed" : "Mark Complete"}
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {moduleData.sections.map((sec, idx) => (
          <div key={idx} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{sec.title}</h2>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-700">
              {sec.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
