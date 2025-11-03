"use client"

import { useMemo, useState } from "react"

type Props = {
  title?: string
  text?: string
  url?: string
  label?: string
}

export default function SocialShare({ title = "Check this out", text, url, label = "Share" }: Props) {
  const [open, setOpen] = useState(false)

  const shareUrl = useMemo(() => {
    const base = typeof window !== "undefined" ? (url || window.location.href) : (url || "")
    try {
      const u = new URL(base, typeof window !== "undefined" ? window.location.origin : undefined)
      if (!u.searchParams.has("utm_source")) {
        u.searchParams.set("utm_medium", "social")
        u.searchParams.set("utm_campaign", "city_share")
      }
      return u.toString()
    } catch {
      return base
    }
  }, [url])

  const message = text || title

  const onNativeShare = async () => {
    try {
      if ((navigator as any)?.share) {
        await (navigator as any).share({ title, text: message, url: shareUrl })
        return
      }
    } catch {}
    setOpen((s) => !s)
  }

  const tw = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(shareUrl)}`
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  const wa = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${message} ${shareUrl}`)}`
  const sms = `sms:?body=${encodeURIComponent(`${message} ${shareUrl}`)}`
  const mail = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${message}\n\n${shareUrl}`)}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert("Link copied!")
    } catch {
      window.prompt("Copy this link:", shareUrl)
    }
  }

  return (
    <div className="relative inline-block">
      <button onClick={onNativeShare} className="px-3 py-2 rounded bg-gray-200 text-sm"> {label} </button>
      {open && (
        <div className="absolute z-50 mt-2 w-72 rounded-2xl border bg-white p-3 shadow-md right-0">
          <p className="text-sm font-medium mb-2">Share this city</p>
          <div className="grid grid-cols-2 gap-2">
            <a className="px-3 py-2 rounded bg-gray-100 text-sm text-center" href={tw} target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a className="px-3 py-2 rounded bg-gray-100 text-sm text-center" href={fb} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="px-3 py-2 rounded bg-gray-100 text-sm text-center" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="px-3 py-2 rounded bg-gray-100 text-sm text-center" href={sms}>SMS</a>
            <a className="px-3 py-2 rounded bg-gray-100 text-sm text-center col-span-2" href={mail}>Email</a>
            <button className="px-3 py-2 rounded bg-orange-500 text-white text-sm col-span-2" onClick={copyLink}>Copy Link</button>
          </div>
          <button className="mt-2 text-xs underline text-gray-600" onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </div>
  )
}
