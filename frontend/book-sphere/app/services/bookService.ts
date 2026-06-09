import api from "../axios/axios";
import axios from "axios";
import { Routes } from "../shared/constent/routes";
import { IListBooksQuery, IUpdateBook } from "../shared/types/bookTypes";
import { param } from "framer-motion/client";

export const createBook = async (payload: FormData) => {
  try {
    const response = await api.post(
      `${Routes.BOOK.BASE}${Routes.BOOK.CREATE}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Failed to create book",
        errors: error.response?.data?.errors || {},
        status: error.response?.status,
      };
    }

    throw {
      message: "Something went wrong",
      errors: {},
      status: 500,
    };
  }
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

export const updateBook = async (
  bookId: string,
  payload: IUpdateBook | FormData,
) => {
  const response = await api.post(
    `${Routes.BOOK.BASE}${Routes.BOOK.UPDATE_BY_ID}/${bookId}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.data;
};

export const deleteBook = async (bookId: string) => {
  const response = await api.delete(
    `${Routes.BOOK.BASE}${Routes.BOOK.DELETE_BY_ID}/${bookId}`,
  );

  return response.data.data;
};

export const suggestion = async (search: string): Promise<string[]> => {
  try {
    const response = await api.get(
      `${Routes.BOOK.BASE}${Routes.BOOK.SUGGESTION}?search=${search}`,
    );

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
    throw error;
  }
};
