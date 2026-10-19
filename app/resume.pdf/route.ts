import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET() {
  const rootPath = path.join(process.cwd(), 'resume.pdf')
  const publicPath = path.join(process.cwd(), 'public', 'resume.pdf')

  let filePath = ''
  if (fs.existsSync(rootPath)) {
    filePath = rootPath
  } else if (fs.existsSync(publicPath)) {
    filePath = publicPath
  }

  if (filePath) {
    const fileBuffer = fs.readFileSync(filePath)
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  }

  return new NextResponse('Resume not found. Please place resume.pdf in the project root or public/ folder.', {
    status: 404,
  })
}
