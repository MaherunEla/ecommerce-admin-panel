import { Router } from "express";
import * as mediaController from "./media.controller.js";
import { createMediaSchema } from "./media.validation.js";

const router = Router();

router.post("/", mediaController.createMedia);

router.get("/", mediaController.getMedia);

router.get("/:id", mediaController.getMediaById);

router.patch("/:id", mediaController.updateMedia);

router.delete("/:id", mediaController.deleteMedia);

export default router;
