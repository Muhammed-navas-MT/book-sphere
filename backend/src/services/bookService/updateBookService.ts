import { IUpdateBook } from "../../dtos/bookDto.js";
import { IBookRepository } from "../../interface/repository/bookRepositoryInterface.js";
import { IUpdateBookService } from "../../interface/services/bookService/updateBookServiceInterface.js";
import { IBookElasticService } from "../../interface/services/elasticsearch/bookElasticServiceInterface.js";

export class UpdateBookService implements IUpdateBookService {
  constructor(
    private _bookRepository: IBookRepository,
    private _bookElasticService: IBookElasticService,
  ) {}

  async execute(bookId: string, data: IUpdateBook): Promise<void> {
    const book = await this._bookRepository.updatedById(bookId, data);

    await this._bookElasticService.updateBook(book);
  }
}
