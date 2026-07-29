import prisma from "../../lib/prisma.js";
import { ApiError } from "../../errors/ApiError.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { CreateRoleInput } from "./role.validation.js";

export const createRole = async (payload: CreateRoleInput) => {
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
