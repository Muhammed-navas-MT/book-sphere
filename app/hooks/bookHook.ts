"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createBook,
  listBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../services/bookService";

import {
  IListBooksQuery,
  IUpdateBook,
} from "../shared/types/bookTypes";

const BOOK_QUERY_KEYS = {
  ALL: ["books"] as const,
  DETAIL: (id: string) => ["book", id] as const,
};

interface UpdateBookParams {
  bookId: string;
  payload: IUpdateBook | FormData;
}

export const useBooks = (query: IListBooksQuery) => {
  return useQuery({
    queryKey: [...BOOK_QUERY_KEYS.ALL, query],
    queryFn: () => listBooks(query),
  });
};

export const useBook = (bookId: string) => {
  return useQuery({
    queryKey: BOOK_QUERY_KEYS.DETAIL(bookId),
    queryFn: () => getBookById(bookId),
    enabled: !!bookId,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation<FormData, Error, FormData>({
    mutationFn: createBook,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOOK_QUERY_KEYS.ALL,
      });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, payload }: UpdateBookParams) =>
      updateBook(bookId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: BOOK_QUERY_KEYS.ALL,
      });

      queryClient.invalidateQueries({
        queryKey: BOOK_QUERY_KEYS.DETAIL(variables.bookId),
      });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOOK_QUERY_KEYS.ALL,
      });
    },
  });
};