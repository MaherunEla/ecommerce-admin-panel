import * as authService from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { ApiError } from "../../errors/ApiError.js";
export const login = async (req, res, next) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const result = await authService.login(validatedData);
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Refresh token is required");
    }
    const result = await authService.refreshToken(refreshToken);
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Access token refreshed successfully",
        data: result,
    });
};
export const me = async (req, res) => {
    const result = await authService.me(req.user.userId);
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Current user fetched successfully",
        data: result,
    });
};
export const logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Refresh token is required");
    }
    await authService.logout(refreshToken);
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Logout successful",
    });
};
