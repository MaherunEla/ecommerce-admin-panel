import { Request, Response } from "express";
import * as permissionService from "./permission.service.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

export const createPermission = async (req: Request, res: Response) => {
  const result = await permissionService.createPermission(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Permission created successfully",
    data: result,
  });
};
