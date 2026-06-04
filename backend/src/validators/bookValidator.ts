import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(2).max(100).trim(),

  author: z.string().min(2).max(50).trim(),

  publisher: z.string().min(2).max(50).trim(),

  year: z.number().min(1000).max(new Date().getFullYear()),

  isbn: z.string().min(10).max(20).trim(),

  description: z.string().min(10).max(1000),

  language: z.string().min(2).trim(),

  pages: z.number().positive(),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
