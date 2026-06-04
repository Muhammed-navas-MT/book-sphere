import type { IBookCreate } from "../../dtos/bookDto.js";
import type { IBookRepository } from "../../interface/repository/bookRepositoryInterface.js";
import type { ICreateBookService } from "../../interface/services/bookService/createBookServiceInterface.js";
import type { IBookElasticService } from "../../interface/services/elasticsearch/bookElasticServiceInterface.js";

export class CreateBookService implements ICreateBookService {
  constructor(
    private _bookRepository: IBookRepository,
    private _bookElasticService: IBookElasticService
  ) {}
  async execute(data: IBookCreate): Promise<void> {
      const book = await this._bookRepository.create(data);
      await this._bookElasticService.indexBook(book);
      return;
  }
}
