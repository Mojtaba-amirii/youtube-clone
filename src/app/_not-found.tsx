export const dynamic = "force-dynamic";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center text-center w-full items-center min-h-screen">
      <h1 className="text-4xl text-red-600 font-bold" aria-live="assertive">
        404 - Not Found
        <p className="text-red-400 text-xl font-semibold">
          The page you are looking for does not exist.
        </p>
      </h1>
      <Link
        href="/"
        className="bg-blue-500 rounded-lg text-white focus:outline-hidden focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 hover:bg-blue-600 inline-block mt-6 px-6 py-2"
      >
        Return Home
      </Link>
    </div>
  );
}
