import { Router } from "express";
import authRoutes from "../modules/auth/auth.route.js";
import permissionRoutes from "../modules/permission/permission.route.js";
const router = Router();
router.use("/auth", authRoutes);
router.use("/permissions", permissionRoutes);
export default router;
