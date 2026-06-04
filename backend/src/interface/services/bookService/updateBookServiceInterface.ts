import { IUpdateBook } from "../../../dtos/bookDto.js";

export interface IUpdateBookService {
  execute(bookId: string, data: IUpdateBook): Promise<void>;
}
