import { Router } from "express";
import * as roleController from "./role.controller.js";

const router = Router();

router.post("/", roleController.createRole);

router.get("/", roleController.getRoles);

router.get("/:id", roleController.getRoleById);

export default router;
