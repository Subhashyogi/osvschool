import express from "express";
import GalleryController from "../controllers/galleryController.js";
import { authenticate } from "../middleware/auth.js";
// import { validateGallery } from "../middleware/validation.js"; // This is likely no longer needed
import models from "../models/index.js";

const router = express.Router();
const galleryController = new GalleryController(models.Gallery);

// --- PUBLIC ROUTES (No authentication required) ---

// Get all active galleries (not deleted) - Public access for website
router.get("/", galleryController.getAllGalleries.bind(galleryController));

// Get gallery by ID - Public access for website
router.get("/:id", galleryController.getGalleryById.bind(galleryController));

// --- PROTECTED ADMIN ROUTES (Authentication required) ---

// Upload one or more media files (images/videos)
// UPDATED: Changed from createGallery to uploadMedia and removed validateGallery middleware.
router.post(
  "/",
  authenticate,
  galleryController.uploadMedia.bind(galleryController)
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

// Update a specific gallery item (e.g., replace the image/video)
// UPDATED: Removed validateGallery middleware as it's no longer relevant.
router.put(
  "/:id",
  authenticate,
  galleryController.updateGallery.bind(galleryController)
);

// Soft delete a gallery item
router.delete(
  "/:id",
  authenticate,
  galleryController.deleteGallery.bind(galleryController)
);

// Restore a soft-deleted gallery item
router.patch(
  "/:id/restore",
  authenticate,
  galleryController.restoreGallery.bind(galleryController)
);

// Permanently delete a gallery item and its associated file
router.delete(
  "/:id/permanent",
  authenticate,
  galleryController.permanentDeleteGallery.bind(galleryController)
);

export default router;
