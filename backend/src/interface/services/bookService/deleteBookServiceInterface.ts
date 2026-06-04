export interface IDeleteBookService {
  execute(bookId: string): Promise<void>;
}
