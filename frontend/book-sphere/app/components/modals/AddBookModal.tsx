"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import AddBookForm from "../../features/books/forms/AddBookForm";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Box */}
          <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8 z-10 flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-gray-800">
                Add New Book
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Fill in the details below to add a new book to the library catalogue.
              </p>
            </div>

            {/* Form */}
            <div className="flex-grow">
              <AddBookForm onSuccess={onClose} onCancel={onClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}