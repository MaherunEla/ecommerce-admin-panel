import { verifyAccessToken } from "../utils/jwt.js";
import { ApiError } from "../errors/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
export const authenticate = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Access token is required");
    }
    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    }
    catch {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired access token");
    }
};
