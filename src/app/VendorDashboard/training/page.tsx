"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { trainingModules } from "@/components/training/content"

type Progress = Record<string, boolean>

export default function TrainingOverviewPage() {
  const [progress, setProgress] = useState<Progress>({})

  useEffect(() => {
    const raw = localStorage.getItem("trainingProgress")
    setProgress(raw ? JSON.parse(raw) : {})
  }, [])

  const completedCount = Object.values(progress).filter(Boolean).length

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Training Center</h1>
      <p className="text-gray-600 mt-1">
        Learn the essentials. Your progress is saved on this device.
      </p>

      <div className="mt-4 text-sm">
        <span className="px-2 py-1 rounded bg-orange-100 text-orange-700">
          {completedCount}/{trainingModules.length} modules completed
        </span>
        <button
          className="ml-3 text-xs underline"
          onClick={() => {
            localStorage.removeItem("trainingProgress")
            setProgress({})
          }}
        >
          Reset progress
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {trainingModules.map((m) => {
          const done = progress[m.slug]
          return (
            <Link
              key={m.slug}
              href={`/vendor/training/${m.slug}`}
              className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold">{m.title}</h2>
                <span
                  className={
                    "text-xs px-2 py-1 rounded " +
                    (done
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600")
                  }
                >
                  {done ? "Completed" : "Not started"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{m.intro}</p>
              <div className="mt-4">
                <span className="text-orange-600 text-sm underline">
                  View module →
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
