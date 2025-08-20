import express from "express";
import TestimonialController from "../controllers/testimonialController.js";
import {
  validateTestimonial,
  validateTestimonialUpdate,
  validateTestimonialFormData,
} from "../middleware/validation.js";
import rateLimiter from "../middleware/rateLimiter.js";
import authMiddleware from "../middleware/auth.js";
import models from "../models/index.js";

const router = express.Router();
const testimonialController = new TestimonialController(models.Testimonial);

// PUBLIC ROUTES (no authentication required) - for website display
// GET /api/testimonials/public - Get all active testimonials for public display
router.get(
  "/public",
  testimonialController.getPublicTestimonials.bind(testimonialController)
);

// ADMIN ROUTES (authentication required)
// Apply authentication middleware to admin routes
router.use(authMiddleware);

// GET /api/testimonials - Get all testimonials (with pagination, search, filter)
router.get(
  "/",
  testimonialController.getAllTestimonials.bind(testimonialController)
);

// POST /api/testimonials - Create a new testimonial
router.post(
  "/",
  rateLimiter,
  validateTestimonialFormData,
  testimonialController.createTestimonial.bind(testimonialController)
);

// PUT /api/testimonials/restore/:id - Restore a soft-deleted testimonial
router.put(
  "/restore/:id",
  testimonialController.restoreTestimonial.bind(testimonialController)
);

// GET /api/testimonials/:id - Get a specific testimonial
router.get(
  "/:id",
  testimonialController.getTestimonialById.bind(testimonialController)
);

// PUT /api/testimonials/:id - Update a testimonial
router.put(
  "/:id",
  rateLimiter,
  validateTestimonialFormData,
  testimonialController.updateTestimonial.bind(testimonialController)
);

// DELETE /api/testimonials/:id - Soft delete a testimonial
router.delete(
  "/:id",
  testimonialController.deleteTestimonial.bind(testimonialController)
);

export default router;
