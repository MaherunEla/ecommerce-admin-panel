import { ApiError } from "../errors/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
export const errorHandler = (error, req, res, next) => {
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
