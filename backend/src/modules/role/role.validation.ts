import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  description: z.string().optional(),
});

export const updateRoleSchema = createRoleSchema.partial();

export const assignPermissionSchema = z.object({
  permissionIds: z.array(z.string()).min(1),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;

export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;

export type AssignPermissionInput = z.infer<typeof assignPermissionSchema>;
