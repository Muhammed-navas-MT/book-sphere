import { IBookRepository } from "../../interface/repository/bookRepositoryInterface.js";
import { IDeleteBookService } from "../../interface/services/bookService/deleteBookServiceInterface.js";
import { IBookElasticService } from "../../interface/services/elasticsearch/bookElasticServiceInterface.js";

export class DeleteBookService implements IDeleteBookService {
  constructor(
    private _bookRepository: IBookRepository,
    private _elasticSearchService: IBookElasticService,
  ) {}
  async execute(bookId: string): Promise<void> {
    await this._bookRepository.deleteById(bookId);

    try {
      await this._elasticSearchService.deleteBook(bookId);
    } catch (error) {
      console.error("Failed to delete from Elasticsearch:", error);
    }
  }
}
