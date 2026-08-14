import type React from 'react'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lumorademoore.com'),
  title: {
    default: 'Lumora DeMoore Properties | Construction & Property Development',
    template: '%s | Lumora DeMoore Properties',
  },
  description:
    'Lumora DeMoore Properties delivers construction, property development and specialist finishing solutions across Ghana with a commitment to quality, precision and lasting value.',
  generator: 'v0.app',
  keywords: [
    'construction Ghana',
    'property development',
    'epoxy flooring',
    'fairface concrete',
    'waterproofing',
    'concrete rectification',
    'specialist finishing',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0b0b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${montserrat.variable} ${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
