'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try again
          </button>
          <Link
            href="/blogs"
            className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 inline-block"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}