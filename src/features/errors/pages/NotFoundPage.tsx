import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-6xl text-primary">
        404
      </h1>

      <p className="mt-3 text-secondary">
        Sorry, the page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-full bg-primary px-6 py-3 text-white"
      >
        Back to Home
      </Link>
    </main>
  )
}
