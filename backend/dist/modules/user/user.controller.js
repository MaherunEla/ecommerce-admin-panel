import * as userService from "./user.service.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
export const createUser = async (req, res) => {
    const result = await userService.createUser(req.body);
    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "User created successfully",
        data: result,
    });
};
