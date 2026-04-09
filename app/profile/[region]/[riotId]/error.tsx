"use client";

import { useEffect } from "react";
import { Card } from "@/components/Card";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Profile Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 min-h-[60vh]">
      <Card className="max-w-md w-full flex flex-col items-center text-center py-10 border-red-500/20">
        
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
          <AlertCircle size={32} />
        </div>
        
        <div className="space-y-3 mb-8">
          <h2 className="text-xl font-bold text-white tracking-tight">Data Not Found</h2>
          <p className="text-zinc-500 text-sm">
            We couldn't fetch this player's data. They might not exist, or the Riot API is temporarily unavailable.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors text-sm"
          >
            <RefreshCcw size={16} />
            Try Again
          </button>
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded border border-card-border hover:bg-zinc-800 text-white font-medium transition-colors text-sm"
          >
            <Home size={16} />
            Return Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
