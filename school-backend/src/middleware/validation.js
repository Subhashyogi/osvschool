import express from "express";
import AuthController from "../controllers/authController.js";

import rateLimiter from "../middleware/rateLimiter.js";
import { body, validationResult } from "express-validator";

const router = express.Router();
const authController = new AuthController();

// Alternative simpler validation without express-validator
const validateGallerySimple = (req, res, next) => {
  const errors = [];

  // Get the form data
  const { title, mediaType, description } = req.body;

  // Basic validation
  if (!title) {
    errors.push({
      type: "field",
      msg: "Title is required",
      path: "title",
      location: "body",
    });
  }

  if (!mediaType || !["image", "video"].includes(mediaType)) {
    errors.push({
      type: "field",
      msg: "Media type must be either image or video",
      path: "mediaType",
      location: "body",
    });
  }

  if (!description) {
    errors.push({
      type: "field",
      msg: "Description is required",
      path: "description",
      location: "body",
    });
  }

  if (req.method === "POST" && (!req.files || !req.files.file)) {
    errors.push({
      type: "field",
      msg: "File is required",
      path: "file",
      location: "files",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Faculty validation for FormData uploads
const validateFacultyFormData = (req, res, next) => {
  const errors = [];

  // Get the form data
  const { name, title, department } = req.body;

  // Basic validation
  if (!name || name.trim().length === 0) {
    errors.push({
      type: "field",
      msg: "Name is required",
      path: "name",
      location: "body",
    });
  }

  if (name && name.length > 255) {
    errors.push({
      type: "field",
      msg: "Name must not exceed 255 characters",
      path: "name",
      location: "body",
    });
  }

  if (title && title.length > 255) {
    errors.push({
      type: "field",
      msg: "Title must not exceed 255 characters",
      path: "title",
      location: "body",
    });
  }

  if (department && department.length > 255) {
    errors.push({
      type: "field",
      msg: "Department must not exceed 255 characters",
      path: "department",
      location: "body",
    });
  }

  // Image validation if file is uploaded
  if (req.files && req.files.image) {
    const imageFile = req.files.image;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (!allowedTypes.includes(imageFile.mimetype)) {
      errors.push({
        type: "field",
        msg: "Invalid file type. Only JPEG, PNG, and GIF images are allowed",
        path: "image",
        location: "files",
      });
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      // 5MB limit
      errors.push({
        type: "field",
        msg: "Image file size must be less than 5MB",
        path: "image",
        location: "files",
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Faculty validation functions
const validateFaculty = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters")
    .matches(/^[a-zA-Z\s\.]+$/)
    .withMessage("Name can only contain letters, spaces, and periods"),
  body("title")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),
  body("department")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Department must not exceed 255 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateFacultyUpdate = [
  body("name")
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters")
    .matches(/^[a-zA-Z\s\.]+$/)
    .withMessage("Name can only contain letters, spaces, and periods"),
  body("title")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),
  body("department")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Department must not exceed 255 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateRegistration = [
  body("username")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("username").notEmpty().withMessage("Username or email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Testimonial validation for FormData uploads
const validateTestimonialFormData = (req, res, next) => {
  const errors = [];

  // Get the form data
  const { name, title, quote } = req.body;

  // Basic validation
  if (!name || name.trim().length === 0) {
    errors.push({
      type: "field",
      msg: "Name is required",
      path: "name",
      location: "body",
    });
  }

  if (name && name.length > 255) {
    errors.push({
      type: "field",
      msg: "Name must not exceed 255 characters",
      path: "name",
      location: "body",
    });
  }

  if (!quote || quote.trim().length === 0) {
    errors.push({
      type: "field",
      msg: "Quote is required",
      path: "quote",
      location: "body",
    });
  }

  if (quote && quote.length > 1000) {
    errors.push({
      type: "field",
      msg: "Quote must not exceed 1000 characters",
      path: "quote",
      location: "body",
    });
  }

  if (title && title.length > 255) {
    errors.push({
      type: "field",
      msg: "Title must not exceed 255 characters",
      path: "title",
      location: "body",
    });
  }

  // Validate avatar file if uploaded
  if (req.files && req.files.avtar) {
    const avatarFile = req.files.avtar;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(avatarFile.mimetype)) {
      errors.push({
        type: "field",
        msg: "Avatar must be a valid image file (JPEG, JPG, PNG, or GIF)",
        path: "avtar",
        location: "files",
      });
    }

    if (avatarFile.size > maxSize) {
      errors.push({
        type: "field",
        msg: "Avatar file size must not exceed 5MB",
        path: "avtar",
        location: "files",
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Testimonial validation functions
const validateTestimonial = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters")
    .matches(/^[a-zA-Z\s\.]+$/)
    .withMessage("Name can only contain letters, spaces, and periods"),
  body("title")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),
  body("quote")
    .notEmpty()
    .withMessage("Quote is required")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Quote must be between 1 and 1000 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateTestimonialUpdate = [
  body("name")
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters")
    .matches(/^[a-zA-Z\s\.]+$/)
    .withMessage("Name can only contain letters, spaces, and periods"),
  body("title")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),
  body("quote")
    .optional()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Quote must be between 1 and 1000 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

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

export default router;

export {
  validateGallerySimple as validateGallery,
  validateRegistration,
  validateLogin,
  validateFaculty,
  validateFacultyUpdate,
  validateFacultyFormData,
  validateTestimonial,
  validateTestimonialUpdate,
  validateTestimonialFormData,
};
