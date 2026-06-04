import { IBookDetails } from "../../dtos/bookDto.js";
import { IBookRepository } from "../../interface/repository/bookRepositoryInterface.js";
import { IgetBookDetailService } from "../../interface/services/bookService/getBookDetailServiceInterface.js";
import { BookMapper } from "../../shared/mappers/bookMapper.js";

export class GetBookDetailService implements IgetBookDetailService {
  constructor(private _bookRepository: IBookRepository) {}
  async execute(bookId: string): Promise<IBookDetails> {
    const book = await this._bookRepository.findById(bookId);
    if (!book) {
      throw new Error("Book not found!");
    }
    const response = BookMapper.getDetailBook(book);
    return response;
  }
}
