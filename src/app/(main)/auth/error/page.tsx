"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the error from URL parameters
    const error = searchParams.get("error");

    // Default error message if none provided
    const errorMessage = error || "Authentication failed. Please try again.";

    // Redirect to login page with error parameter
    router.replace(`/auth/login?error=${encodeURIComponent(errorMessage)}`);
  }, [router, searchParams]);

  // Show loading state while redirecting
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
}
