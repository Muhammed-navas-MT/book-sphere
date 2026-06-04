import api from "../axios/axios";
import { Routes } from "../shared/constent/routes";
import { IBookCreate,IListBooksQuery,IUpdateBook } from "../shared/types/bookTypes";

export const createBook = async (payload: FormData) => {
  const response = await api.post(
    `${Routes.BOOK.BASE}${Routes.BOOK.CREATE}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

export const listBooks = async (query: IListBooksQuery) => {
  const response = await api.get(`${Routes.BOOK.BASE}${Routes.BOOK.LIST}`, {
    params: query,
  });

  return response.data.data;
};

export const getBookById = async (bookId: string) => {
  const response = await api.get(
    `${Routes.BOOK.BASE}${Routes.BOOK.GET_BY_ID}/${bookId}`,
  );

  return response.data.data;
};

export const updateBook = async (bookId: string, payload: IUpdateBook|FormData) => {
  const response = await api.post(
    `${Routes.BOOK.BASE}${Routes.BOOK.UPDATE_BY_ID}/${bookId}`,
    payload,
  );

  return response.data.data;
};

export const deleteBook = async (bookId: string) => {
  const response = await api.delete(
    `${Routes.BOOK.BASE}${Routes.BOOK.DELETE_BY_ID}/${bookId}`,
  );

  return response.data.data;
};
