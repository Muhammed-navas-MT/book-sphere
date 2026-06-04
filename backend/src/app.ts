import express, { type Application } from "express";
import cors from "cors";

import { BookRoutes } from "./routes/bookRoutes.js";
import { Routes } from "./shared/constant/routes.js";
import { errorMiddleware } from "./middleware/errorHadleMiddleware.js";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    const bookRoutes = new BookRoutes();

    this.app.use(Routes.BOOK.BASE, bookRoutes.router);
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}