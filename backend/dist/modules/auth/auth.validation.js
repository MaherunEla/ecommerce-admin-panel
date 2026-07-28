import { z } from "zod";
export const loginSchema = z.object({
    email: z.string().trim().email("Please provide a valid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password is too long"),
});
