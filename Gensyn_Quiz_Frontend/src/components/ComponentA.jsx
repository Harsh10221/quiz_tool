import React from 'react';

export default function ComponentA({ onNavigate }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <h1 className="text-5xl font-bold text-black">Component A</h1>
      <p className="text-black">This is the first page (Light Mode).</p>
      <button
        onClick={onNavigate}
        className="mt-8 rounded-lg bg-black px-6 py-2 text-white"
      >
        Go to Component B
      </button>
    </div>
  );
}