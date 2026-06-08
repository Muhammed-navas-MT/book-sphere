import { IBook } from "../../../models/bookModel.js";

export interface IBookElasticService {
  indexBook(book: IBook): Promise<void>;
  updateBook(book: IBook): Promise<void>;
  deleteBook(bookId: string): Promise<void>;
  getSuggestions(search: string): Promise<string[]>;
}
