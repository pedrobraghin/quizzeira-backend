import EStatusCode from "../enums/EStatusCode";

import { AppEror } from "./../errors/AppError";
import { Request, Response, NextFunction } from "express";

export async function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppEror) {
    return res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  }

  console.log(error.message);

  return res.status(EStatusCode.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
}
