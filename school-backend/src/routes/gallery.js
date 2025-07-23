import express from "express";
import GalleryController from "../controllers/galleryController.js";
import { authenticate } from "../middleware/auth.js";
import { validateGallery } from "../middleware/validation.js";
import models from "../models/index.js";

const router = express.Router();
const galleryController = new GalleryController(models.Gallery);

// PUBLIC ROUTES (No authentication required)
// Get all active galleries (not deleted) - Public access for website
router.get("/", galleryController.getAllGalleries.bind(galleryController));

// Get gallery by ID - Public access for website
router.get("/:id", galleryController.getGalleryById.bind(galleryController));

// PROTECTED ROUTES (Authentication required)
// Create gallery
router.post(
  "/",
  authenticate,
  validateGallery,
  galleryController.createGallery.bind(galleryController)
);

// Get all galleries including deleted ones
router.get(
  "/all",
  authenticate,
  galleryController.getAllGalleriesWithDeleted.bind(galleryController)
);

// Get only deleted galleries
router.get(
  "/deleted",
  authenticate,
  galleryController.getDeletedGalleries.bind(galleryController)
);

// Update gallery
router.put(
  "/:id",
  authenticate,
  validateGallery,
  galleryController.updateGallery.bind(galleryController)
);

// Soft delete gallery
router.delete(
  "/:id",
  authenticate,
  galleryController.deleteGallery.bind(galleryController)
);

// Restore deleted gallery
router.patch(
  "/:id/restore",
  authenticate,
  galleryController.restoreGallery.bind(galleryController)
);

// Permanently delete gallery (admin only)
router.delete(
  "/:id/permanent",
  authenticate,
  galleryController.permanentDeleteGallery.bind(galleryController)
);

export default router;
