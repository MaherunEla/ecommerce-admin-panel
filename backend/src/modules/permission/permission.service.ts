import prisma from "../../lib/prisma.js";
import {
  CreatePermissionInput,
  UpdatePermissionInput,
} from "./permission.validation.js";
import { ApiError } from "../../errors/ApiError.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

export const createPermission = async (payload: CreatePermissionInput) => {
  const exists = await prisma.permission.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (exists) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Permission already exists");
  }

  return prisma.permission.create({
    data: payload,
  });
};

export const getPermissions = async () => {
  return prisma.permission.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPermissionById = async (id: string) => {
  const permission = await prisma.permission.findUnique({
    where: {
      id,
    },
  });

  if (!permission) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Permission not found");
  }

  return permission;
};

export const updatePermission = async (
  id: string,
  payload: UpdatePermissionInput,
) => {
  const permission = await prisma.permission.findUnique({
    where: {
      id,
    },
  });

  if (!permission) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Permission not found");
  }

  return prisma.permission.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deletePermission = async (id: string) => {
  const permission = await prisma.permission.findUnique({
    where: {
      id,
    },
  });

  if (!permission) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Permission not found");
  }

  await prisma.permission.delete({
    where: {
      id,
    },
  });

  return;
};
