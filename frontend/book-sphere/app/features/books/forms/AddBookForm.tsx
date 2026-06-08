"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { useCreateBook } from "../../../hooks/bookHook";
import { bookFormSchema, BookFormValues } from "../schemas/book.schema";

import ImageUpload from "../../../components/shared/ImageUpload";
import BookCreatingLoader from "@/app/components/modals/BookCreatingLoader";
import { useState } from "react";
import { ApiError } from "@/app/shared/types/apiError";

interface AddBookFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AddBookForm({ onSuccess, onCancel }: AddBookFormProps) {
  const [serverMessage, setServerMessage] = useState("");
  const { mutateAsync, isPending } = useCreateBook();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      publisher: "",
      year: new Date().getFullYear(),
      isbn: "",
      description: "",
      language: "English",
      pages: 100,
      coverImage: null,
    },
  });

  const inputClass = `
    w-full
    rounded-xl
    border
    border-gray-300
    px-4
    py-3
    text-sm
    outline-none
    transition
    focus:ring-2
    focus:ring-purple-500
    focus:border-purple-500
  `;

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

      if (data.coverImage) {
        formData.append("coverImage", data.coverImage as File);
      }

      await mutateAsync(formData);

      onSuccess?.();
    } catch (error) {
      const err = error as ApiError;

      setServerMessage(err.message);

      if (err.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
          setError(field as keyof BookFormValues, {
            type: "server",
            message,
          });
        });
      }
    }
  };

  return (
    <>
      {isPending && <BookCreatingLoader />}

      {serverMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium">Book Title</label>

          <input
            {...register("title")}
            placeholder="Enter book title"
            className={inputClass}
          />

          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Author + Publisher */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Author</label>

            <input
              {...register("author")}
              placeholder="Author name"
              className={inputClass}
            />

            {errors.author && (
              <p className="mt-1 text-xs text-red-500">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Publisher</label>

            <input
              {...register("publisher")}
              placeholder="Publisher"
              className={inputClass}
            />

            {errors.publisher && (
              <p className="mt-1 text-xs text-red-500">
                {errors.publisher.message}
              </p>
            )}
          </div>
        </div>

        {/* Year + Pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Year</label>

            <input
              type="number"
              {...register("year", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />

            {errors.year && (
              <p className="mt-1 text-xs text-red-500">{errors.year.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Pages</label>

            <input
              type="number"
              {...register("pages", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />

            {errors.pages && (
              <p className="mt-1 text-xs text-red-500">
                {errors.pages.message}
              </p>
            )}
          </div>
        </div>

        {/* ISBN + Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium">ISBN</label>

            <input
              {...register("isbn")}
              placeholder="ISBN Number"
              className={inputClass}
            />

            {errors.isbn && (
              <p className="mt-1 text-xs text-red-500">{errors.isbn.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Language</label>

            <input
              {...register("language")}
              placeholder="Language"
              className={inputClass}
            />

            {errors.language && (
              <p className="mt-1 text-xs text-red-500">
                {errors.language.message}
              </p>
            )}
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="mb-2 block text-sm font-medium">Cover Image</label>

          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => (
              <ImageUpload value={field.value} onChange={field.onChange} />
            )}
          />

          {errors.coverImage && (
            <p className="mt-1 text-xs text-red-500">
              {errors.coverImage.message as string}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            rows={5}
            {...register("description")}
            placeholder="Book description..."
            className={`${inputClass} resize-none`}
          />

          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2 transition"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Book"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
