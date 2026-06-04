import { BookController } from "../controllers/book/bookController.js";
import { BookRepository } from "../repositories/bookRepository.js";
import { CreateBookService } from "../services/bookService/createBookService.js";
import { DeleteBookService } from "../services/bookService/deleteBookService.js";
import { GetBookDetailService } from "../services/bookService/getBookDetailService.js";
import { ListBookService } from "../services/bookService/listBooksService.js";
import { UpdateBookService } from "../services/bookService/updateBookService.js";
import { BookElasticService } from "../services/elasticsearch/bookElasticService.js";

const bookRepository = new BookRepository();
const bookElasticService = new BookElasticService();
const createBookService = new CreateBookService(
  bookRepository,
  bookElasticService,
);
const listBooksService = new ListBookService(bookRepository);
const updateBookService = new UpdateBookService(
  bookRepository,
  bookElasticService,
);
const deleteBookService = new DeleteBookService(bookRepository,bookElasticService);
const getDetailService = new GetBookDetailService(bookRepository);
export const injectedBookController = new BookController(
  createBookService,
  listBooksService,
  updateBookService,
  deleteBookService,
  getDetailService,
);
