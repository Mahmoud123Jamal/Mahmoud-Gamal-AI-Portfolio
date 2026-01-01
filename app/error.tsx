"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen grid place-content-center mt-5 px-6 text-center">
      <div className="bg-gray-50 dark:bg-blue-900/20 p-8 rounded-3xl shadow-xl max-w-md border border-blue-100 dark:border-blue-800">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">
          Connection Interrupted
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">
          The data fetch from Sanity failed. This usually happens due to
          temporary internet routing issues.
          <br />{" "}
          <span className="font-mono text-[10px] opacity-50">
            Digest: {error.digest}
          </span>
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95"
          >
            Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold py-3 rounded-xl border border-blue-100 dark:border-gray-700 hover:bg-gray-50 transition-all text-sm"
          >
            Refresh Full Page
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-400 text-xs">
        If this persists, please check your network connection.
      </p>
    </div>
  );
}
