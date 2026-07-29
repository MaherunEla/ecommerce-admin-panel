import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleId: z.string().min(1, "Role is required"),
});

export const updateUserSchema = z.object({
  email: z.email().optional(),
  password: z.string().min(6).optional(),
  roleId: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type CreateUserInput = z.infer<typeof createUserSchema>;
