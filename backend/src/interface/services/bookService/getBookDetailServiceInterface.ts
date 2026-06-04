import { IBookDetails } from "../../../dtos/bookDto.js";

export interface IgetBookDetailService {
  execute(bookId: string): Promise<IBookDetails>;
}
