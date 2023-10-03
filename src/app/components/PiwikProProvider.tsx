'use client'
import React from 'react'
import PiwikProProvider from '@piwikpro/next-piwik-pro';
// https://www.npmjs.com/package/@piwikpro/next-piwik-pro

export default function PiwikPro() {
  return (
        <PiwikProProvider
          containerId={process.env.NEXT_PUBLIC_CONTAINER_ID!}
          containerUrl={process.env.NEXT_PUBLIC_CONTAINER_URL}
        >
        </PiwikProProvider>  
  )
}