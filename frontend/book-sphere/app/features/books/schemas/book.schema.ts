import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const bookFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  year: z
    .number({ message: "Year must be a number" })
    .int("Year must be an integer")
    .min(1000, "Year must be 1000 or later")
    .max(new Date().getFullYear() + 1, "Year cannot be in the far future"),
  isbn: z
    .string()
    .min(1, "ISBN is required")
    .max(17, "ISBN cannot exceed 17 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  publisher: z.string().min(3, "Publisher must be at least 3 characters"),
  language: z.string().min(1, "Language is required"),
  pages: z
    .number({ message: "Pages must be a number" })
    .int("Pages must be an integer")
    .min(1, "Pages must be at least 1"),

  coverImage: z
    .any()
    .refine(
      (file) => file !== undefined && file !== null && file !== "",
      "Cover image is required",
    )
    .refine((file) => {
      if (!file) return false;
      if (typeof file === "string") return true;
      return file instanceof File;
    }, "Must be a valid image file or URL")
    .refine((file) => {
      if (!file || typeof file === "string") return true;
      return file.size <= MAX_FILE_SIZE;
    }, `Max file size is 5MB.`)
    .refine((file) => {
      if (!file || typeof file === "string") return true;
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;
