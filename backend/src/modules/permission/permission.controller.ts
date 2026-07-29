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

export const getPermissions = async (req: Request, res: Response) => {
  const result = await permissionService.getPermissions();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Permissions fetched successfully",
    data: result,
  });
};

export const getPermissionById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const result = await permissionService.getPermissionById(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Permission fetched successfully",
    data: result,
  });
};

export const updatePermission = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const result = await permissionService.updatePermission(
    req.params.id,
    req.body,
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Permission updated successfully",
    data: result,
  });
};

export const deletePermission = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  await permissionService.deletePermission(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Permission deleted successfully",
  });
};
