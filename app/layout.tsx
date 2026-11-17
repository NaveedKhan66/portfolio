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

export const metadata: Metadata = {
  title: 'Naveed — Portfolio',
  description: 'Personal portfolio website',
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
