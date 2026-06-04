"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBook } from "../../../hooks/bookHook";
import { bookFormSchema, BookFormValues } from "../schemas/book.schema";
import { IBookDetails } from "../../../shared/types/bookTypes";
import ImageUpload from "../../../components/shared/ImageUpload";
import { Loader2 } from "lucide-react";

interface UpdateBookFormProps {
  book: IBookDetails;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function UpdateBookForm({
  book,
  onSuccess,
  onCancel,
}: UpdateBookFormProps) {
  const { mutateAsync, isPending, error: mutationError } = useUpdateBook();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      year: book.year,
      isbn: book.isbn,
      description: book.description,
      language: book.language,
      pages: book.pages,
      coverImage: book.coverImage,
    },
  });

  useEffect(() => {
    reset({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      year: book.year,
      isbn: book.isbn,
      description: book.description,
      language: book.language,
      pages: book.pages,
      coverImage: book.coverImage,
    });
  }, [book, reset]);

  const onSubmit = async (data: BookFormValues) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("publisher", data.publisher);
      formData.append("year", String(data.year));
      formData.append("isbn", data.isbn);
      formData.append("description", data.description);
      formData.append("language", data.language);
      formData.append("pages", String(data.pages));

      if (data.coverImage instanceof File) {
        formData.append("coverImage", data.coverImage);
        formData.append("fileName", data.coverImage.name);
        formData.append("fileSize", String(data.coverImage.size));
        formData.append("mimeType", data.coverImage.type);
        formData.append("lastModified", String(data.coverImage.lastModified));
      } else if (typeof data.coverImage === "string") {
        formData.append("coverImage", data.coverImage);
      }

      await mutateAsync({
        bookId: book._id,
        payload: formData,
      });

      onSuccess?.();
    } catch (err) {
      console.error("Failed to update book:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {mutationError && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
          <strong>Update failed:</strong>{" "}
          {mutationError.message || "An unexpected error occurred."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Book Title
            </label>
            <input
              type="text"
              {...register("title")}
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ${
                errors.title ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Author
            </label>
            <input
              type="text"
              {...register("author")}
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ${
                errors.author ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.author && (
              <p className="mt-1 text-xs text-red-600">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Publisher
            </label>
            <input
              type="text"
              {...register("publisher")}
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ${
                errors.publisher ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.publisher && (
              <p className="mt-1 text-xs text-red-600">
                {errors.publisher.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Year
              </label>
              <input
                type="number"
                {...register("year", {
                  valueAsNumber: true,
                })}
                className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ${
                  errors.year ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.year && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.year.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Pages
              </label>
              <input
                type="number"
                {...register("pages", {
                  valueAsNumber: true,
                })}
                className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ${
                  errors.pages ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.pages && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.pages.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                ISBN
              </label>
              <input
                type="text"
                {...register("isbn")}
                className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ${
                  errors.isbn ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.isbn && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.isbn.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Language
              </label>
              <input
                type="text"
                {...register("language")}
                className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ${
                  errors.language ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.language && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.language.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                error={
                  errors.coverImage?.message
                    ? String(errors.coverImage.message)
                    : undefined
                }
              />
            )}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description
            </label>

            <textarea
              rows={4}
              {...register("description")}
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 resize-none ${
                errors.description ? "border-red-500" : "border-gray-200"
              }`}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        {onCancel && (
          <button
            type="button"
            disabled={isPending}
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving Changes...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
