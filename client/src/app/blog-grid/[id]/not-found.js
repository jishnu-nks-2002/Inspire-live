import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Blog Post Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/blogs"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
        >
          Back to All Blogs
        </Link>
      </div>
    </div>
  );
}