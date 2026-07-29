import prisma from "../../lib/prisma.js";
import { hashPassword } from "../../utils/password.js";
import { ApiError } from "../../errors/ApiError.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { CreateUserInput } from "./user.validation.js";
import { UpdateUserInput } from "./user.validation.js";

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

export const getUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
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

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      isActive: true,
      createdAt: true,
      role: true,
    },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return user;
};

export const updateUser = async (id: string, payload: UpdateUserInput) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  if (payload.email) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (existingUser && existingUser.id !== id) {
      throw new ApiError(HTTP_STATUS.CONFLICT, "Email already exists");
    }
  }

  if (payload.roleId) {
    const role = await prisma.role.findUnique({
      where: {
        id: payload.roleId,
      },
    });

    if (!role) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }
  }

  let hashedPassword: string | undefined;

  if (payload.password) {
    hashedPassword = await hashPassword(payload.password);
  }

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      email: payload.email,
      roleId: payload.roleId,
      isActive: payload.isActive,
      ...(hashedPassword && {
        password: hashedPassword,
      }),
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

export const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return;
};
