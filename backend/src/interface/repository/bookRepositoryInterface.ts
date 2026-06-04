import type { IBookCreate, IUpdateBook } from "../../dtos/bookDto.js";
import { IBook } from "../../models/bookModel.js";

export interface IBookRepository {
    create(data:IBookCreate):Promise<IBook>;
    findById(bookId:string):Promise<IBook | null>;
    findByIds(ids: string[]): Promise<IBook[]>;
    updatedById(bookId:string,data:IUpdateBook):Promise<IBook>;
    deleteById(bookId:string):Promise<void>;
}
