"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import UpdateBookForm from "../../features/books/forms/UpdateBookForm";
import { IBookDetails } from "../../shared/types/bookTypes";

interface UpdateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: IBookDetails;
}

export default function UpdateBookModal({
  isOpen,
  onClose,
  book,
}: UpdateBookModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8 z-10 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800">
            Edit Book Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Update the metadata fields or replace the cover image for this book.
          </p>
        </div>

        <div className="flex-grow">
          <UpdateBookForm book={book} onSuccess={onClose} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}
