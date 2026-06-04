import { IListBooksQuery, IListBooks } from "../../dtos/bookDto.js";
import { IListBooksService } from "../../interface/services/bookService/listBooksServiceInterface.js";
import { elasticClient } from "../../config/elasticsearch.js";
import { IBookRepository } from "../../interface/repository/bookRepositoryInterface.js";
import { BookMapper } from "../../shared/mappers/bookMapper.js";

export class ListBookService implements IListBooksService {
  constructor(private _bookRepository: IBookRepository) {}

  async execute(params: IListBooksQuery): Promise<IListBooks> {
    const { page = 1, limit = 10, author, language, search, year } = params;

    const from = (page - 1) * limit;

    const must = [];

    if (search) {
      must.push({
        multi_match: {
          query: search,
          fields: [
            "title",
            "author",
            "description",
            "language",
            "publisher",
          ],
          fuzziness: "AUTO",
        },
      });
    }

    if (author) {
      must.push({
        match: {
          author,
        },
      });
    }

    if (language) {
      must.push({
        match: {
          language,
        },
      });
    }

    if (year) {
      must.push({
        match: {
          year,
        },
      });
    }

    const response = await elasticClient.search({
      index: "books",
      from,
      size: limit,
      query: {
        bool: {
          must,
        },
      },
    });

    const bookIds = response.hits.hits
      .map((hit) => hit._id)
      .filter((id): id is string => Boolean(id));

    const mongoResponse =
      bookIds.length > 0
        ? await this._bookRepository.findByIds(bookIds)
        : [];

    const orderedBooks = bookIds
      .map((id) =>
        mongoResponse.find((book) => book._id.toString() === id),
      )
      .filter(
        (
          book,
        ): book is (typeof mongoResponse)[number] => book !== undefined,
      );

    const mappedBooks = BookMapper.listBook(orderedBooks);

    const totalBooks =
      typeof response.hits.total === "number"
        ? response.hits.total
        : response.hits.total?.value || 0;

    return {
      books: mappedBooks,
      page,
      limit,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    };
  }
}