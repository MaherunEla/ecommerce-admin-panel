import { Request, Response } from "express";
import * as roleService from "./role.service.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

export const createRole = async (req: Request, res: Response) => {
  const result = await roleService.createRole(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Role created successfully",
    data: result,
  });
};
