import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import dynamic from 'next/dynamic'
import './globals.css'

const FloatingContactBar = dynamic(
  () => import('./components/FloatingContactBar')
)

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const helveticaNow = localFont({
  src: [
    {
      path: '../public/fonts/HelveticaNowDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNowDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNowDisplay-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica-now',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
    ? process.env.NEXT_PUBLIC_SITE_URL
    : `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Naveed — Senior Software Engineer',
  description:
    'Senior Software Engineer based in Lahore crafting fast, elegant web products and systems.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Naveed — Senior Software Engineer',
    description:
      'Senior Software Engineer based in Lahore crafting fast, elegant web products and systems.',
    url: '/',
    siteName: 'Naveed Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naveed — Senior Software Engineer',
    description:
      'Senior Software Engineer based in Lahore crafting fast, elegant web products and systems.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${helveticaNow.variable} bg-black font-sans text-white antialiased`}
      >
        {children}
        <FloatingContactBar />
      </body>
    </html>
  )
}
