'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error:', error); 
  }, [error]);

  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
      <p className="text-gray-700 dark:text-gray-300">{error.message}</p>
      <button
        onClick={() => reset()} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}
