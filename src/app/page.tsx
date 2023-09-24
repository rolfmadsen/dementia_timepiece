'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const TimeIndicator = dynamic(() => import('./components/TimeIndicator'), { ssr: false });

export default function App() {
  return (
    <div>
      <TimeIndicator />
      <p className="text-[clamp(0.8rem,2vw,1.2rem)]">
        <Link className="absolute bottom-0 left-0 m-4 opacity-80" href="/privacy_policy">Privatlivspolitik</Link>
      </p>
    </div>
  );
};