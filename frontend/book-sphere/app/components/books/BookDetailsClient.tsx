"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteBook } from "../../hooks/bookHook";
import { IBookDetails } from "../../shared/types/bookTypes";
import UpdateBookModal from "../modals/UpdateBookModal";
import {
  Calendar,
  FileText,
  Globe,
  Hash,
  Edit3,
  Trash2,
  ChevronLeft,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { ApiError } from "@/app/shared/types/apiError";

interface BookDetailsClientProps {
  book: IBookDetails;
}

export default function BookDetailsClient({ book }: BookDetailsClientProps) {
  const router = useRouter();
  const [deleteError, setDeleteError] = useState("");
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { mutateAsync: deleteBookMutate, isPending: isDeleting } =
    useDeleteBook();

  const handleDelete = async () => {
    try {
      setDeleteError("");

      await deleteBookMutate(book._id);

      setIsDeleteConfirmOpen(false);
      router.push("/books");
    } catch (error) {
      const err = error as ApiError;

      setDeleteError(err.message || "Failed to delete book");
    }
  };

  const category = React.useMemo(() => {
    const desc = book.description?.toLowerCase() || "";
    if (
      desc.includes("novel") ||
      desc.includes("story") ||
      desc.includes("fiction")
    )
      return "Fiction & Literature";
    if (
      desc.includes("science") ||
      desc.includes("study") ||
      desc.includes("learn")
    )
      return "Academic & Science";
    if (
      desc.includes("life") ||
      desc.includes("biography") ||
      desc.includes("memoir")
    )
      return "Biography & Memoir";
    return "General Literature";
  }, [book.description]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8 min-h-screen">
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-purple-600 transition-colors duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Directory
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="sticky top-28 bg-gray-50 border border-gray-100 rounded-3xl p-4 shadow-sm">
            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 bg-white">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full uppercase tracking-wider">
                {category}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-gray-500 font-medium">
              by{" "}
              <span className="text-purple-600 font-semibold">
                {book.author}
              </span>
            </p>
          </div>

          <div className="prose max-w-none text-gray-600 leading-relaxed text-base border-t border-b border-gray-100 py-6">
            <h3 className="font-bold text-gray-800 text-lg mb-2">Synopsis</h3>
            <p className="whitespace-pre-line">{book.description}</p>
          </div>

          {/* Spec Metadata Table Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Published
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {book.year}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Pages
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {book.pages} pages
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Language
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {book.language}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Hash className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  ISBN
                </p>
                <p
                  className="text-sm font-semibold text-gray-700 truncate max-w-[100px]"
                  title={book.isbn}
                >
                  {book.isbn}
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setIsUpdateOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-md shadow-purple-100 hover:shadow-purple-200 transition duration-200 active:scale-95 cursor-pointer"
            >
              <Edit3 className="w-5 h-5" />
              Edit Details
            </button>

            <button
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 font-semibold rounded-2xl transition duration-200 active:scale-95 cursor-pointer"
            >
              <Trash2 className="w-5 h-5" />
              Remove Book
            </button>
          </div>
        </div>
      </div>

      {/* Edit Details Update Modal Wrapper */}
      <UpdateBookModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        book={book}
      />

      {/* Custom Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDeleteConfirmOpen(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 z-10 shadow-2xl border border-gray-100 space-y-6">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800">
                Confirm Book Deletion
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Are you absolutely sure you want to remove{" "}
                <span className="font-semibold text-gray-700">
                  {book.title}
                </span>
                ? This action is permanent and cannot be undone.
              </p>
            </div>

            {deleteError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed transition cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Removing...
                  </>
                ) : (
                  "Yes, Delete Book"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
