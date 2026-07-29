import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.post("/", userController.createUser);

export default router;
