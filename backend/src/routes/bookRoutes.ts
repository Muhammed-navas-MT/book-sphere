import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { Routes } from "../shared/constant/routes.js";
import { injectedBookController } from "../dependencies/bookDependencies.js";
import { upload } from "../middleware/multerMiddleware.js";

export class BookRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      Routes.BOOK.CREATE,
      upload.single("coverImage"),
      (req: Request, res: Response, next: NextFunction) => {
        injectedBookController.createBook(req, res, next);
      },
    );
    this.router.get(
      Routes.BOOK.LIST,
      (req: Request, res: Response, next: NextFunction) => {
        injectedBookController.listBook(req, res, next);
      },
    );
    this.router.post(
      Routes.BOOK.UPDATE_BY_ID,
      upload.single("coverImage"),
      (req: Request, res: Response, next: NextFunction) => {
        injectedBookController.updateBook(req, res, next);
      },
    );
    this.router.delete(
      Routes.BOOK.DELETE_BY_ID,
      (req: Request, res: Response, next: NextFunction) => {
        injectedBookController.deleteBook(req, res, next);
      },
    );
    this.router.get(
      Routes.BOOK.GET_BY_ID,
      (req: Request, res: Response, next: NextFunction) => {
        injectedBookController.getBookDetail(req, res, next);
      },
    );
  }
}
