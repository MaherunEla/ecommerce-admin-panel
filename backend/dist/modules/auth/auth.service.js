import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { ApiError } from "../../errors/ApiError.js";
import prisma from "../../lib/prisma.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { comparePassword } from "../../utils/password.js";
export const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
    }
    if (!user.isActive) {
        throw new ApiError(HTTP_STATUS.FORBIDDEN, "User account is inactive");
    }
    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
    }
    const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
    });
    const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
    });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt,
        },
    });
    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
        },
    };
};
