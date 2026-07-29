import { z } from "zod";

export const createPermissionSchema = z.object({
  name: z.string().min(1, "Permission name is required"),
  module: z.string().min(1, "Module name is required"),
  description: z.string().optional(),
});

export const updatePermissionSchema = createPermissionSchema.partial();

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;

export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;
