import { Router } from "express";
import * as permissionController from "./permission.controller.js";

const router = Router();

router.post("/", permissionController.createPermission);
router.get("/", permissionController.getPermissions);

router.get("/:id", permissionController.getPermissionById);

export default router;
