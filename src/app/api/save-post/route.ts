import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { title, slug, date, blogType, content } = await req.json()

    if (!title || !slug || !blogType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const frontmatter = `---
title: "${title}"
date: "${date || ''}"
---\n\n`

    const fullContent = frontmatter + content
    const fileName = `${slug}.md`
    const blogDir = path.join(process.cwd(), 'content', blogType)

    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true })
    }

    const filePath = path.join(blogDir, fileName)

    fs.writeFileSync(filePath, fullContent)

    return NextResponse.json({ message: 'Blog post saved successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Save Post Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
