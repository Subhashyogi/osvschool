import { Op } from "sequelize";
import fs from "fs";
import path from "path";

class TestimonialController {
  constructor(testimonialModel) {
    this.testimonialModel = testimonialModel;
  }

  // Get all testimonials with pagination, search, and filter
  getAllTestimonials = async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "created_at",
        sortOrder = "DESC",
        includeDeleted = false,
      } = req.query;

      const offset = (page - 1) * limit;
      const searchCondition = search
        ? {
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { title: { [Op.like]: `%${search}%` } },
              { quote: { [Op.like]: `%${search}%` } },
            ],
          }
        : {};

      const scope = includeDeleted === "true" ? "withDeleted" : "defaultScope";

      const { count, rows } = await this.testimonialModel
        .scope(scope)
        .findAndCountAll({
          where: searchCondition,
          order: [[sortBy, sortOrder.toUpperCase()]],
          limit: parseInt(limit),
          offset: parseInt(offset),
        });

      // CHANGE 1: Removed the logic that added the old render.com URL.
      const response = {
        testimonials: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit),
        },
      };

      res.json(response);
    } catch (error) {
      console.error("❌ Error getting testimonials:", error);
      res.status(500).json({
        error: "Failed to retrieve testimonials",
        details: error.message,
      });
    }
  };

  // Get a specific testimonial by ID
  getTestimonialById = async (req, res) => {
    try {
      const testimonial = await this.testimonialModel.findByPk(req.params.id);

      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      // CHANGE 2: Removed the logic that added the old render.com URL.
      res.json(testimonial);
    } catch (error) {
      console.error("❌ Error getting testimonial:", error);
      res.status(500).json({
        error: "Failed to retrieve testimonial",
        details: error.message,
      });
    }
  };

  // Get all active testimonials for public display
  getPublicTestimonials = async (req, res) => {
    try {
      const testimonials = await this.testimonialModel.findAll({
        where: {
          is_deleted: false,
        },
        order: [["created_at", "DESC"]],
      });

      // CHANGE 3: Removed the logic that added the old render.com URL.
      res.json(testimonials);
    } catch (error) {
      console.error("❌ Error getting public testimonials:", error);
      res.status(500).json({
        error: "Failed to retrieve testimonials",
        details: error.message,
      });
    }
  };

  // Create a new testimonial
  createTestimonial = async (req, res) => {
    try {
      let testimonialData = { ...req.body };
      let avatarFileName = null;

      if (req.files && req.files.avtar) {
        const avatarFile = req.files.avtar;
        const fileExtension = path.extname(avatarFile.name);
        avatarFileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}${fileExtension}`;

        const uploadDir = path.join(process.cwd(), "uploads", "testimonials");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, avatarFileName);
        await avatarFile.mv(filePath);

        // CHANGE 4: Saving the full, correct relative path to the database.
        testimonialData.avtar = `/uploads/testimonials/${avatarFileName}`;
      }

      const testimonial = await this.testimonialModel.create(testimonialData);

      // CHANGE 5: Removed the logic that added the old render.com URL to the response.
      res.status(201).json({
        message: "Testimonial created successfully",
        testimonial: testimonial,
      });
    } catch (error) {
      console.error("❌ Error creating testimonial:", error);
      if (req.files && req.files.avtar && avatarFileName) {
        const filePath = path.join(
          process.cwd(),
          "uploads",
          "testimonials",
          avatarFileName
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      res.status(500).json({
        error: "Failed to create testimonial",
        details: error.message,
      });
    }
  };

  // Update a testimonial
  updateTestimonial = async (req, res) => {
    try {
      const testimonial = await this.testimonialModel.findByPk(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      let updateData = { ...req.body };
      let oldAvatarFileName = testimonial.avtar;

      if (req.files && req.files.avtar) {
        const avatarFile = req.files.avtar;
        const fileExtension = path.extname(avatarFile.name);
        const newAvatarFileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}${fileExtension}`;
        const uploadDir = path.join(process.cwd(), "uploads", "testimonials");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, newAvatarFileName);
        await avatarFile.mv(filePath);

        // CHANGE 6: Saving the full, correct relative path.
        updateData.avtar = `/uploads/testimonials/${newAvatarFileName}`;
      }

      await testimonial.update(updateData);

      if (req.files && req.files.avtar && oldAvatarFileName) {
        // Remove leading slash for local file system path
        const oldFilePath = path.join(
          process.cwd(),
          oldAvatarFileName.substring(1)
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // CHANGE 7: Removed the logic that added the old render.com URL to the response.
      res.json({
        message: "Testimonial updated successfully",
        testimonial: testimonial,
      });
    } catch (error) {
      console.error("❌ Error updating testimonial:", error);
      res.status(500).json({
        error: "Failed to update testimonial",
        details: error.message,
      });
    }
  };

  // Your original delete and restore functions are preserved below.
  deleteTestimonial = async (req, res) => {
    try {
      const testimonial = await this.testimonialModel
        .scope("withDeleted")
        .findByPk(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      if (testimonial.isDeleted) {
        return res.status(400).json({ error: "Testimonial already deleted" });
      }
      await testimonial.update({ isDeleted: true });
      res.json({
        message: "Testimonial deleted successfully",
        testimonial: testimonial.toJSON(),
      });
    } catch (error) {
      console.error("❌ Error deleting testimonial:", error);
      res.status(500).json({
        error: "Failed to delete testimonial",
        details: error.message,
      });
    }
  };

  restoreTestimonial = async (req, res) => {
    try {
      const testimonial = await this.testimonialModel
        .scope("withDeleted")
        .findByPk(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      if (!testimonial.isDeleted) {
        return res.status(400).json({ error: "Testimonial is not deleted" });
      }
      await testimonial.update({ isDeleted: false });

      // CHANGE 8: Removed the logic that added the old render.com URL to the response.
      res.json({
        message: "Testimonial restored successfully",
        testimonial: testimonial,
      });
    } catch (error) {
      console.error("❌ Error restoring testimonial:", error);
      res.status(500).json({
        error: "Failed to restore testimonial",
        details: error.message,
      });
    }
  };
}

export default TestimonialController;
