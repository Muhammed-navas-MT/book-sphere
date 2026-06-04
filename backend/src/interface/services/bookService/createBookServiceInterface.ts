import type { IBookCreate } from "../../../dtos/bookDto.js";

export interface ICreateBookService {
  execute(data: IBookCreate): Promise<void>;
}
