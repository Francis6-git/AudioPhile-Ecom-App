"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <h1 className="mb-4 text-5xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-lg text-gray-600">Oops! Page not found</p>
        <Link
          href="/"
          className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
