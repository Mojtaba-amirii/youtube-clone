import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600" aria-live="assertive">
        404 - Not Found
        <p className="text-xl font-semibold text-red-400">
          The page you are looking for does not exist.
        </p>
      </h1>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Return Home
      </Link>
    </div>
  );
}
