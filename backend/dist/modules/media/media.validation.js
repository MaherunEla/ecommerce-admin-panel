import { z } from "zod";
export const createMediaSchema = z.object({
    url: z.url("Invalid media URL"),
    altText: z.string().optional(),
});
export const updateMediaSchema = z.object({
    url: z.url("Invalid media URL").optional(),
    altText: z.string().optional(),
});
