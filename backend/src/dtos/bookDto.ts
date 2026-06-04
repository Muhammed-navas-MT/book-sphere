export interface IBookCreate {
  title: string;
  author: string;
  year: number;
  isbn: string;
  description: string;
  language: string;
  pages: number;
  coverImage: string;
}

export interface IUpdateBook {
  title?: string;
  author?: string;
  publisher?: string;
  year?: number;
  isbn?: string;
  description?: string;
  language?: string;
  pages?: number;
  coverImage?: string;
}

export interface IBookDetails {
  _id: string;
  title: string;
  author: string;
  year: number;
  isbn: string;
  description: string;
  language: string;
  pages: number;
  coverImage: string;
  createdAt: Date;
}

export interface IListBooksQuery {
  search?: string;
  language?: string;
  author?: string;
  year?: number;
  page: number;
  limit: number;
}

export interface IListBooks {
  books: IBookDetails[];
  search?: string;
  language?: string;
  author?: string;
  year?: number;
  page: number;
  totalPages: number;
  totalBooks: number;
  limit: number;
}
