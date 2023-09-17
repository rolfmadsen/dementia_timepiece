import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Demens uret',
  description: 'Udarbejdet med Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  )
}