import type { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(error);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (error instanceof Error) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
