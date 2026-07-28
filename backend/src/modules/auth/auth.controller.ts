import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await authService.login(validatedData);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
