import * as mediaService from "./media.service.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
export const createMedia = async (req, res) => {
    const result = await mediaService.createMedia(req.body);
    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "Media created successfully",
        data: result,
    });
};
export const getMedia = async (req, res) => {
    const result = await mediaService.getMedia();
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Media fetched successfully",
        data: result,
    });
};
export const getMediaById = async (req, res) => {
    const result = await mediaService.getMediaById(req.params.id);
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Media fetched successfully",
        data: result,
    });
};
export const updateMedia = async (req, res) => {
    const result = await mediaService.updateMedia(req.params.id, req.body);
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Media updated successfully",
        data: result,
    });
};
export const deleteMedia = async (req, res) => {
    await mediaService.deleteMedia(req.params.id);
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Media deleted successfully",
    });
};
