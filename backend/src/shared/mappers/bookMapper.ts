import { IBookDetails } from "../../dtos/bookDto.js";
import { IBook } from "../../models/bookModel.js";

export class BookMapper {
  static listBook(books: IBook[]): IBookDetails[] {
    return books.map((book) => {
      return {
        _id: book._id.toString(),
        author: book.author,
        publisher: book.publisher,
        coverImage: book.coverImage,
        createdAt: book.createdAt,
        description: book.description,
        isbn: book.isbn,
        language: book.language,
        pages: book.pages,
        title: book.title,
        year: book.year,
      };
    });
  }

  static getDetailBook(book: IBook): IBookDetails {
    return {
      _id: book._id.toString(),
      author: book.author,
      publisher: book.publisher,
      coverImage: book.coverImage,
      createdAt: book.createdAt,
      description: book.description,
      isbn: book.isbn,
      language: book.language,
      pages: book.pages,
      title: book.title,
      year: book.year,
    };
  }
}
