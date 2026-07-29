import { Request, Response } from "express";
import * as mediaService from "./media.service.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

export const createMedia = async (req: Request, res: Response) => {
  const result = await mediaService.createMedia(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Media created successfully",
    data: result,
  });
};

export const getMedia = async (req: Request, res: Response) => {
  const result = await mediaService.getMedia();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Media fetched successfully",
    data: result,
  });
};

export const getMediaById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const result = await mediaService.getMediaById(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Media fetched successfully",
    data: result,
  });
};

export const updateMedia = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const result = await mediaService.updateMedia(req.params.id, req.body);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Media updated successfully",
    data: result,
  });
};

export const deleteMedia = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  await mediaService.deleteMedia(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Media deleted successfully",
  });
};
