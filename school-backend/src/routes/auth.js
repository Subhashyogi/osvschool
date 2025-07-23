import express from "express";
import AuthController from "../controllers/authController.js";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validation.js";
import rateLimiter from "../middleware/rateLimiter.js";
import models from "../models/index.js";

const router = express.Router();
const authController = new AuthController(models.User);

router.post(
  "/register",
  rateLimiter,
  ...validateRegistration,
  authController.register.bind(authController)
);

router.post(
  "/login",
  rateLimiter,
  ...validateLogin,
  authController.login.bind(authController)
);

router.get("/verify", authController.verify.bind(authController));

export default router;
