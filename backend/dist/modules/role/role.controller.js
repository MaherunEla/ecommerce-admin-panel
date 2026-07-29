import * as roleService from "./role.service.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
export const createRole = async (req, res) => {
    const result = await roleService.createRole(req.body);
    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "Role created successfully",
        data: result,
    });
};
export const getRoles = async (req, res) => {
    const result = await roleService.getRoles();
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Roles fetched successfully",
        data: result,
    });
};
export const getRoleById = async (req, res) => {
    const result = await roleService.getRoleById(req.params.id);
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Role fetched successfully",
        data: result,
    });
};
