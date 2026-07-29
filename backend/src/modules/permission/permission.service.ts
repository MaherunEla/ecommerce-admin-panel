import prisma from "../../lib/prisma.js";
import { CreatePermissionInput } from "./permission.validation.js";
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
