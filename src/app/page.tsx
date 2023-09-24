'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TimeIndicator = dynamic(() => import('./components/TimeIndicator'), { ssr: false });

export default function App() {
  return (
    <div>
      <TimeIndicator />
    </div>
  );
};