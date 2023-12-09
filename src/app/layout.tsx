//'use client'
import React from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="Udarbejdet med Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Demens uret</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}