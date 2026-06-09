import { Book, IBook } from "../models/bookModel.js";
import type { IBookCreate, IUpdateBook } from "../dtos/bookDto.js";
import type { IBookRepository } from "../interface/repository/bookRepositoryInterface.js";

export class BookRepository implements IBookRepository {
  async create(data: IBookCreate): Promise<IBook> {
    try {
      const book = await Book.create(data);
      return book.toObject();
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.isbn) {
        throw new Error("This ISBN is already linked to another book in the system.");
      }

      throw error;
    }
  }

  async findById(id: string): Promise<IBook | null> {
    const book = await Book.findById(id);
    return book ? book.toObject() : null;
  }

  async findByIds(ids: string[]): Promise<IBook[]> {
    return Book.find({
      _id: { $in: ids },
    });
  }

  async deleteById(bookId: string): Promise<void> {
    await Book.deleteOne({
      _id: bookId,
    });
  }

  async updatedById(bookId: string, data: IUpdateBook): Promise<IBook> {
    const updatedBook = await Book.findByIdAndUpdate(bookId, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      throw new Error("Book not found");
    }

    return updatedBook.toObject();
  }
}
