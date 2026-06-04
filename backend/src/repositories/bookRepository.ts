import { Book, IBook } from "../models/bookModel.js";
import type { IBookCreate, IUpdateBook } from "../dtos/bookDto.js";
import type { IBookRepository } from "../interface/repository/bookRepositoryInterface.js";

export class BookRepository implements IBookRepository {
  async create(data: IBookCreate): Promise<IBook> {
    const book = await Book.create(data);
    return book;
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
