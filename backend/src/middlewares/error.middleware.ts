import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
  });
};
