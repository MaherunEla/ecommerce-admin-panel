import prisma from "../../lib/prisma.js";
import { ApiError } from "../../errors/ApiError.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
export const createRole = async (payload) => {
    const exists = await prisma.role.findUnique({
        where: {
            name: payload.name,
        },
    });
    if (exists) {
        throw new ApiError(HTTP_STATUS.CONFLICT, "Role already exists");
    }
    return prisma.role.create({
        data: payload,
    });
};
export const getRoles = async () => {
    return prisma.role.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
export const getRoleById = async (id) => {
    const role = await prisma.role.findUnique({
        where: {
            id,
        },
    });
    if (!role) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }
    return role;
};
