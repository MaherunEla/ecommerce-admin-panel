import prisma from "../../lib/prisma.js";
import { hashPassword } from "../../utils/password.js";
import { ApiError } from "../../errors/ApiError.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { CreateUserInput } from "./user.validation.js";

export const createUser = async (payload: CreateUserInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "User already exists");
  }

  const role = await prisma.role.findUnique({
    where: {
      id: payload.roleId,
    },
  });

  if (!role) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
  }

  const hashedPassword = await hashPassword(payload.password);

  return prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      roleId: payload.roleId,
    },
    select: {
      id: true,
      email: true,
      isActive: true,
      createdAt: true,
      role: true,
    },
  });
};
