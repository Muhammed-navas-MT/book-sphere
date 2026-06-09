"use client";

import { useState, useEffect, useRef } from "react";
import { useBooks } from "../../hooks/bookHook";
import BookCard from "../home/BookCard";
import AddBookModal from "../modals/AddBookModal";
import { IBookDetails } from "../../shared/types/bookTypes";
import { useSuggestions } from "../../hooks/bookHook";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  AlertCircle,
} from "lucide-react";

export default function BooksListingClient() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 12;

  const { data: suggestionsData, isLoading: isSuggestionLoading } =
    useSuggestions(searchInput);

  const suggestions: string[] = suggestionsData ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const apiQuery = {
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearch ? debouncedSearch : undefined,
    language: selectedLanguage !== "All" ? selectedLanguage : undefined,
    sortBy: sortBy !== "title-asc" ? sortBy : undefined,
  };

  const { data, isLoading, isError, error } = useBooks(apiQuery);

  const booksList: IBookDetails[] = data?.books || [];
  const totalPages = data?.totalPages || 1;
  const totalBooks = data?.totalBooks || 0;

  const processedBooks: IBookDetails[] = booksList;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setSelectedLanguage("All");
    setSortBy("title-asc");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 min-h-screen">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Book Directory
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Showing {totalBooks} books available in the collection
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold shadow-md shadow-purple-100 hover:shadow-purple-200 transition-all duration-200 active:scale-95 focus:outline-none"
        >
          <Plus className="w-5 h-5" />
          Add Book
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-gray-50/50 border border-gray-100 p-4 sm:p-5 rounded-3xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <div ref={suggestionRef} className="relative lg:w-[70%]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />

            <input
              type="text"
              placeholder="Search books, author, ISBN..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSuggestions(true);
                setCurrentPage(1);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            {isSuggestionLoading && searchInput.trim() && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl p-3 shadow-lg z-50">
                Searching...
              </div>
            )}

            {showSuggestions &&
              searchInput.trim() &&
              suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50">
                  {suggestions.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSearchInput(item);
                        setDebouncedSearch(item);
                        setCurrentPage(1);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-purple-50 transition border-b border-gray-100 last:border-b-0"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:w-[30%]">
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-2xl appearance-none text-sm"
              >
                <option value="All">All Languages</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Malayalam">Malayalam</option>
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-2xl appearance-none text-sm"
              >
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="year-desc">Year (Newest)</option>
                <option value="year-asc">Year (Oldest)</option>
              </select>
              <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8">
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4 animate-pulse"
            >
              <div className="aspect-[2/3] w-full bg-gray-200 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-red-50/50 border border-red-100 rounded-3xl p-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <h3 className="text-lg font-bold text-red-800">
            Error Loading Catalogue
          </h3>
          <p className="text-sm text-red-600 max-w-sm">
            {error?.message ||
              "An unexpected error occurred while communicating with the database server."}
          </p>
        </div>
      ) : processedBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-gray-200 rounded-3xl bg-gray-50/30">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">No books found</h3>
            <p className="text-gray-500 text-sm max-w-sm mt-1">
              We couldn't find any books matching your criteria. Try adjusting
              your filters or search keywords.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl text-sm font-semibold transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {processedBooks.map((book) => (
            <BookCard key={book._id} book={book} variant="full" />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-10 border-t border-gray-100">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className="w-10 h-10 rounded-xl border border-gray-200"
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
