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
        include: {
            permissions: {
                include: {
                    permission: true,
                },
            },
        },
    });
    if (!role) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }
    return role;
};
export const updateRole = async (id, payload) => {
    const role = await prisma.role.findUnique({
        where: {
            id,
        },
    });
    if (!role) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }
    if (payload.name) {
        const existingRole = await prisma.role.findFirst({
            where: {
                name: payload.name,
                NOT: {
                    id,
                },
            },
        });
        if (existingRole) {
            throw new ApiError(HTTP_STATUS.CONFLICT, "Role name already exists");
        }
    }
    return prisma.role.update({
        where: {
            id,
        },
        data: payload,
    });
};
export const deleteRole = async (id) => {
    const role = await prisma.role.findUnique({
        where: {
            id,
        },
    });
    if (!role) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }
    await prisma.role.delete({
        where: {
            id,
        },
    });
    return;
};
export const assignPermissions = async (roleId, payload) => {
    const role = await prisma.role.findUnique({
        where: {
            id: roleId,
        },
    });
    if (!role) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }
    const permissions = await prisma.permission.findMany({
        where: {
            id: {
                in: payload.permissionIds,
            },
        },
    });
    if (permissions.length !== payload.permissionIds.length) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "One or more permissions not found");
    }
    await prisma.rolePermission.createMany({
        data: payload.permissionIds.map((permissionId) => ({
            roleId,
            permissionId,
        })),
        skipDuplicates: true,
    });
    return prisma.role.findUnique({
        where: {
            id: roleId,
        },
        include: {
            permissions: {
                include: {
                    permission: true,
                },
            },
        },
    });
};
