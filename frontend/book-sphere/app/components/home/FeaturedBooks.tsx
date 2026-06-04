"use client";

import Link from "next/link";
import BookCard from "./BookCard";
import { IBookDetails } from "../../shared/types/bookTypes";
import { Sparkles } from "lucide-react";

interface Props {
  books: IBookDetails[];
}

export default function FeaturedBooks({ books = [] }: Props) {
  // Slices exactly 6 books from the database query
  const featuredBooks = books.slice(0, 6);

  return (
    <section id="featured" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
      {/* Header text */}
      <div className="flex flex-col items-center justify-center text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-1 text-purple-600 font-bold text-xs bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Our Selection
        </div>
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Featured Masterpieces
        </h2>
        <p className="text-gray-500 text-sm max-w-md">
          Browse through some of our most highly recommended book cover designs and curated texts.
        </p>
      </div>

      {/* Grid of 6 books (Cover image only) */}
      {featuredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              variant="cover-only"
            />
          ))}
        </div>
      ) : (
        /* Empty placeholder state */
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
          <p className="text-gray-500 font-medium mb-3">No books available in the collection yet.</p>
          <Link
            href="/books"
            className="text-purple-600 font-semibold hover:text-purple-700 transition"
          >
            Go to Catalogue to Add a Book &rarr;
          </Link>
        </div>
      )}

      {/* 3D styled button linking to /books */}
      <div className="flex justify-center mt-14">
        <Link
          href="/books"
          className="btn-3d inline-flex items-center gap-2 group focus:outline-none"
        >
          Explore All Books
          <span className="transform group-hover:translate-x-1 transition-transform duration-200">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}