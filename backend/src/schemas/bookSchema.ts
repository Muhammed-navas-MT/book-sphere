import { Schema } from "mongoose";

export const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    publisher: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
    },

    pages: {
      type: Number,
      required: true,
      min: 1,
    },

    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);