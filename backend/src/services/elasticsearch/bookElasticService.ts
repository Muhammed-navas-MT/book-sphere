import { elasticClient } from "../../config/elasticsearch.js";
import { IBookElasticService } from "../../interface/services/elasticsearch/bookElasticServiceInterface.js";
import type { IBook } from "../../models/bookModel.js";

export class BookElasticService implements IBookElasticService {
  async indexBook(book: IBook): Promise<void> {
    console.log(book, "inside the indexing in elastic search");
    await elasticClient.index({
      index: "books",
      id: book._id.toString(),
      document: {
        title: book.title,
        author: book.author,
        description: book.description,
        language: book.language,
        publisher: book.publisher,
        year: book.year,
      },
      refresh: true,
    });
  }
  async updateBook(book: IBook): Promise<void> {
    await elasticClient.update({
      index: "books",
      id: book._id.toString(),
      doc: {
        title: book.title,
        author: book.author,
        description: book.description,
        language: book.language,
        publisher: book.publisher,
        year: book.year,
      },
    });
  }
  async deleteBook(bookId: string): Promise<void> {
    await elasticClient.delete({
      index: "books",
      id: bookId,
    });
  }
}
