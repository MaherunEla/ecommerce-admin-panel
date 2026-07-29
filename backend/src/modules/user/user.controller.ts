import { Request, Response } from "express";
import * as userService from "./user.service.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

export const createUser = async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const result = await userService.getUsers();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const result = await userService.getUserById(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User fetched successfully",
    data: result,
  });
};
