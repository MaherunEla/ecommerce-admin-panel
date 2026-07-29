import { Router } from "express";
import * as userController from "./user.controller.js";
const router = Router();
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
export default router;
