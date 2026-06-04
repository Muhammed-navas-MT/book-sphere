"use client";

import { Loader2, BookOpen } from "lucide-react";

export default function BookCreatingLoader() {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4 min-w-[320px]">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-purple-200" />
          <div className="relative bg-purple-100 p-4 rounded-full">
            <BookOpen className="w-10 h-10 text-purple-600" />
          </div>
        </div>

        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Adding Book
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Please wait while we save your book...
          </p>
        </div>

        <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-purple-600 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}