import React from 'react';

export default function ComponentB({ onNavigate }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      <h1 className="text-5xl font-bold text-white">Component B</h1>
      <p className="text-white">This is the second page (Dark Mode).</p>
      <button
        onClick={onNavigate}
        className="mt-8 rounded-lg bg-white px-6 py-2 text-black"
      >
        Go to Component A
      </button>
    </div>
  );
}