import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
  title: 'MORF - Interactive UI',
  description: 'A modern 3-column layout with interactive features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" defer></script>
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
} 