"use client";

import Link from "next/link";
import { IBookDetails } from "../../shared/types/bookTypes";

interface Props {
  book: IBookDetails;
  variant?: "full" | "cover-only";
}

export default function BookCard({ book, variant = "full" }: Props) {
  if (variant === "cover-only") {
    return (
      <Link
        href={`/books/${book._id}`}
        className="group relative block aspect-[2/3] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    );
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full">
      <Link
        href={`/books/${book._id}`}
        className="relative block aspect-[2/3] w-full overflow-hidden bg-gray-50 focus:outline-none"
      >
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1 group-hover:text-purple-600 transition-colors">
            <Link href={`/books/${book._id}`} className="focus:outline-none">
              {book.title}
            </Link>
          </h3>
          <p className="text-gray-500 text-sm font-medium line-clamp-1">
            {book.author}
          </p>
        </div>

        <Link
          href={`/books/${book._id}`}
          className="mt-4 w-full py-2.5 bg-gray-50 hover:bg-purple-600 text-gray-700 hover:text-white rounded-xl text-xs font-semibold text-center transition-all duration-300 block focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}