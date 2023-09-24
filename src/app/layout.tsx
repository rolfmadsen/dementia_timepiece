'use client'
import React from 'react'
import './globals.css'
import PiwikProProvider from '@piwikpro/next-piwik-pro';

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
        <PiwikProProvider
          containerId={process.env.NEXT_PUBLIC_CONTAINER_ID!}
          containerUrl={process.env.NEXT_PUBLIC_CONTAINER_URL!}
        >
          {children}
        </PiwikProProvider>  
      </body>
    </html>
  )
}