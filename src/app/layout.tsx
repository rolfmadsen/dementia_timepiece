import Head from 'next/head';
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
      <head>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
      </head>
      <body>{children}</body>
    </html>
  )
}