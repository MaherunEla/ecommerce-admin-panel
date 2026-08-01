import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { ApiError } from "../../errors/ApiError.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await authService.login(validatedData);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Login successful",
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response) => {
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

export const me = async (req: Request, res: Response) => {
  const result = await authService.me(req.user!.userId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Current user fetched successfully",
    data: result,
  });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Logout successful",
  });
};
