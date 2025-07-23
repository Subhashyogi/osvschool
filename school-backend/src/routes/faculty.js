import express from "express";
import FacultyController from "../controllers/facultyController.js";
import {
  validateFaculty,
  validateFacultyUpdate,
  validateFacultyFormData,
} from "../middleware/validation.js";
import rateLimiter from "../middleware/rateLimiter.js";
import authMiddleware from "../middleware/auth.js";
import models from "../models/index.js";

const router = express.Router();
const facultyController = new FacultyController(models.Faculty);

// PUBLIC ROUTES (No authentication required)
// GET /api/faculty - Get all faculty members (with pagination, search, filter)
router.get("/", facultyController.getAllFaculty.bind(facultyController));

// GET /api/faculty/departments - Get all unique departments
router.get(
  "/departments",
  facultyController.getDepartments.bind(facultyController)
);

// GET /api/faculty/:id - Get a specific faculty member
router.get("/:id", facultyController.getFacultyById.bind(facultyController));

// PROTECTED ROUTES (Authentication required)
// POST /api/faculty - Create a new faculty member
router.post(
  "/",
  authMiddleware,
  rateLimiter,
  validateFacultyFormData,
  facultyController.createFaculty.bind(facultyController)
);

// PUT /api/faculty/:id - Update a faculty member
router.put(
  "/:id",
  authMiddleware,
  rateLimiter,
  validateFacultyFormData,
  facultyController.updateFaculty.bind(facultyController)
);

// DELETE /api/faculty/:id - Soft delete a faculty member
router.delete(
  "/:id",
  authMiddleware,
  facultyController.deleteFaculty.bind(facultyController)
);

// PUT /api/faculty/:id/restore - Restore a soft-deleted faculty member
router.put(
  "/:id/restore",
  authMiddleware,
  facultyController.restoreFaculty.bind(facultyController)
);

export default router;
