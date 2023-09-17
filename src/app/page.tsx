'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TimeIndicator = dynamic(() => import('./TimeIndicator.client'), { ssr: false });

const App: React.FC = () => {
  return (
    <div>
      {/*<h1 className="text-4xl text-center m-10">24T UR</h1>*/}
      <TimeIndicator />
    </div>
  );
};

export default App;