import express from "express";
import PrincipalMessageController from "../controllers/principalMessageController.js";
import { authenticate } from "../middleware/auth.js";
import models from "../models/index.js";

const router = express.Router();
const controller = new PrincipalMessageController(models.PrincipalMessage);

// Public: Get principal message
router.get("/", controller.get.bind(controller));

// Admin: Create or update principal message
router.post("/", authenticate, controller.upsert.bind(controller));

export default router;
