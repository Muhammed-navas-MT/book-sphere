import mongoose, { Document } from "mongoose";
import { bookSchema } from "../schemas/bookSchema.js";

export interface IBook extends Document {
  title: string;
  author: string;
  year: number;
  isbn: string;
  publisher: string;
  description: string;
  language: string;
  pages: number;
  coverImage: string;
  createdAt: Date;
}

export const Book = mongoose.model<IBook>("Book", bookSchema);
