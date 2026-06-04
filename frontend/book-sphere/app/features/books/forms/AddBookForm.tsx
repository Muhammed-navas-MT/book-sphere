"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBook } from "../../../hooks/bookHook";
import { bookFormSchema, BookFormValues } from "../schemas/book.schema";
import ImageUpload from "../../../components/shared/ImageUpload";
import { Loader2 } from "lucide-react";
import BookCreatingLoader from "@/app/components/modals/BookCreatingLoader";

interface AddBookFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AddBookForm({ onSuccess, onCancel }: AddBookFormProps) {
  const { mutateAsync, isPending } = useCreateBook();

  const {
    register,
    handleSubmit,
    control,
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

      formData.append("coverImage", data.coverImage as File);

      await mutateAsync(formData);

      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isPending && <BookCreatingLoader />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <input
            placeholder="Book Title"
            {...register("title")}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.title ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <input
            placeholder="Author"
            {...register("author")}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.author ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.author && (
            <p className="text-xs text-red-600">{errors.author.message}</p>
          )}
        </div>

        {/* Publisher */}
        <div>
          <input
            placeholder="Publisher"
            {...register("publisher")}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.publisher ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.publisher && (
            <p className="text-xs text-red-600">{errors.publisher.message}</p>
          )}
        </div>

        {/* Year */}
        <div>
          <input
            type="number"
            placeholder="Year"
            {...register("year", { valueAsNumber: true })}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.year ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.year && (
            <p className="text-xs text-red-600">{errors.year.message}</p>
          )}
        </div>

        {/* Pages */}
        <div>
          <input
            type="number"
            placeholder="Pages"
            {...register("pages", { valueAsNumber: true })}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.pages ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.pages && (
            <p className="text-xs text-red-600">{errors.pages.message}</p>
          )}
        </div>

        {/* ISBN */}
        <div>
          <input
            placeholder="ISBN"
            {...register("isbn")}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.isbn ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.isbn && (
            <p className="text-xs text-red-600">{errors.isbn.message}</p>
          )}
        </div>

        {/* Language */}
        <div>
          <input
            placeholder="Language"
            {...register("language")}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.language ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.language && (
            <p className="text-xs text-red-600">{errors.language.message}</p>
          )}
        </div>

        {/* Cover Image */}
        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <div>
              <ImageUpload value={field.value} onChange={field.onChange} />
              {errors.coverImage && (
                <p className="text-xs text-red-600">
                  {errors.coverImage.message as string}
                </p>
              )}
            </div>
          )}
        />

        {/* Description */}
        <div>
          <textarea
            placeholder="Description"
            {...register("description")}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.description ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}

          <button type="submit" disabled={isPending}>
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
