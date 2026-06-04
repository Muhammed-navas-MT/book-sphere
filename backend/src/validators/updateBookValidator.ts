import { z } from "zod";

export const updateBookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty")
    .optional(),

  author: z
    .string()
    .trim()
    .min(1, "Author cannot be empty")
    .optional(),

  publisher: z
    .string()
    .trim()
    .min(1, "Publisher cannot be empty")
    .optional(),

  year: z
    .number()
    .int("Year must be an integer")
    .min(1000, "Invalid year")
    .max(new Date().getFullYear() + 10, "Invalid year")
    .optional(),

  isbn: z
    .string()
    .trim()
    .min(10, "ISBN must be at least 10 characters")
    .max(20, "ISBN is too long")
    .optional(),

  description: z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .optional(),

  language: z
    .string()
    .trim()
    .min(1, "Language cannot be empty")
    .optional(),

  pages: z
    .number()
    .int("Pages must be an integer")
    .positive("Pages must be greater than 0")
    .optional(),

  // coverImage: z
  //   .string()
  //   .url("Cover image must be a valid URL")
  //   .optional(),
});