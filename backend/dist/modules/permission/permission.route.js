import { Router } from "express";
import * as permissionController from "./permission.controller.js";
const router = Router();
router.post("/", permissionController.createPermission);
export default router;
