import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { personalInfo } from '../data/personal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${personalInfo.name} - Portfolio`,
  description: personalInfo.bio.short,
  keywords: 'developer, portfolio, full stack, web development, react, next.js',
  authors: [{ name: personalInfo.name }],
}

export const viewport = 'width=device-width, initial-scale=1'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
} 