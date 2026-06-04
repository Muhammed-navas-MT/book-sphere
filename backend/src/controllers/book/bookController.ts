import type { Request, Response, NextFunction } from "express";
import type { ICreateBookService } from "../../interface/services/bookService/createBookServiceInterface.js";
import type {
  IBookCreate,
  IListBooksQuery,
  IUpdateBook,
} from "../../dtos/bookDto.js";
import { createBookSchema } from "../../validators/bookValidator.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload.js";
import { IListBooksService } from "../../interface/services/bookService/listBooksServiceInterface.js";
import { updateBookSchema } from "../../validators/updateBookValidator.js";
import { IUpdateBookService } from "../../interface/services/bookService/updateBookServiceInterface.js";
import { IDeleteBookService } from "../../interface/services/bookService/deleteBookServiceInterface.js";
import { IgetBookDetailService } from "../../interface/services/bookService/getBookDetailServiceInterface.js";

export class BookController {
  constructor(
    private _createBookService: ICreateBookService,
    private _listBooksService: IListBooksService,
    private _updateBookService: IUpdateBookService,
    private _deleteBookService: IDeleteBookService,
    private _getBookDetailService: IgetBookDetailService
  ) {}

  async createBook(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data: IBookCreate = {
        ...req.body,
        year: Number(req.body.year),
        pages: Number(req.body.pages),
      };

      console.log(data);

      const validationResult = createBookSchema.safeParse(data);

      if (!validationResult.success) {
        throw new Error(validationResult.error.issues[0].message);
      }

      let imageUrl = "";
      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file.path);
      }

      if (!imageUrl) {
        throw new Error("Invalid image. Please upload again.");
      }

      await this._createBookService.execute({
        ...validationResult.data,
        coverImage: imageUrl,
      });

      res.status(201).json({
        success: true,
        message: "Book created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async listBook(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      console.log("Navas list books page")
      const params: IListBooksQuery = {
        limit: req.query.limit ? Number(req.query.limit) : 10,
        page: req.query.page ? Number(req.query.page) : 1,
        author: req.query.author ? String(req.query.author) : "",
        language: req.query.language ? String(req.query.language) : "",
        search: req.query.search ? String(req.query.search) : "",
        year: req.query.year ? Number(req.query.year) : 0,
      };
      const response = await this._listBooksService.execute(params);
      console.log(response);
      res
        .status(200)
        .json({ data: response, message: "List all Books successfully" });
    } catch (error) {
      next(error);
    }
  }

  async updateBook(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
     const data = {
        ...req.body,
        year: Number(req.body.year),
        pages: Number(req.body.pages),
      };
      const { bookId } = req.params;

      const validationResult = updateBookSchema.safeParse(data);

      if (!validationResult.success) {
        throw new Error(validationResult.error.issues[0].message);
      }

      const updateData = {
        ...validationResult.data,
      };

      if (req.file) {
        const imageUrl = await uploadToCloudinary(req.file.path);

        updateData.coverImage = imageUrl;
      }

      await this._updateBookService.execute(bookId.toString(), updateData);

      res.status(200).json({
        message: "Book updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const {bookId} = req.params;
      await this._deleteBookService.execute(bookId.toString());
      res.status(204).json({message:"Book deleted successfully"})
    } catch (error) {
      next(error);
    }
  }

  async getBookDetail(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      const {bookId} = req.params;
      const response = await this._getBookDetailService.execute(bookId.toString());
      res.status(200).json({data:response,message:"Fetched book full details"})
    } catch (error) {
      next(error)
    }
  }
}
