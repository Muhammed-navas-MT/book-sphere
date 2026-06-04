import { IListBooks, IListBooksQuery } from "../../../dtos/bookDto.js";

export interface IListBooksService {
    execute(params:IListBooksQuery):Promise<IListBooks>
}