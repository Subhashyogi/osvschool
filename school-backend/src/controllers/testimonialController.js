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
      console.log("📋 Getting all testimonials...");
      console.log("Query params:", req.query);

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

      // Use appropriate scope based on includeDeleted parameter
      const scope = includeDeleted === "true" ? "withDeleted" : "defaultScope";

      const { count, rows } = await this.testimonialModel
        .scope(scope)
        .findAndCountAll({
          where: searchCondition,
          order: [[sortBy, sortOrder.toUpperCase()]],
          limit: parseInt(limit),
          offset: parseInt(offset),
        });

      console.log(`Found ${count} testimonials in database`);

      // Process testimonials to include full avatar URLs
      const processedTestimonials = rows.map((testimonial) => {
        const testimonialData = testimonial.toJSON();
        if (testimonialData.avtar) {
          testimonialData.avtar = `https://osvschool-backend.onrender.com/uploads/testimonials/${testimonialData.avtar}`;
        }
        return testimonialData;
      });

      const response = {
        testimonials: processedTestimonials,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit),
        },
      };

      console.log("✅ Successfully retrieved testimonials");
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
      console.log(`📋 Getting testimonial with ID: ${req.params.id}`);

      const testimonial = await this.testimonialModel.findByPk(req.params.id);

      if (!testimonial) {
        console.log("❌ Testimonial not found");
        return res.status(404).json({ error: "Testimonial not found" });
      }

      const testimonialData = testimonial.toJSON();
      if (testimonialData.avtar) {
        testimonialData.avtar = `https://osvschool-backend.onrender.com/uploads/testimonials/${testimonialData.avtar}`;
      }

      console.log("✅ Successfully retrieved testimonial");
      res.json(testimonialData);
    } catch (error) {
      console.error("❌ Error getting testimonial:", error);
      res.status(500).json({
        error: "Failed to retrieve testimonial",
        details: error.message,
      });
    }
  };

  // Get all active testimonials for public display (no authentication required)
  getPublicTestimonials = async (req, res) => {
    try {
      // Get all active (non-deleted) testimonials, ordered by creation date
      const testimonials = await this.testimonialModel.findAll({
        where: {
          is_deleted: false,
        },
        order: [["created_at", "DESC"]],
      });

      // Process testimonials to include full avatar URLs
      const processedTestimonials = testimonials.map((testimonial) => {
        const testimonialData = testimonial.toJSON();
        if (testimonialData.avtar) {
          testimonialData.avtar = `https://osvschool-backend.onrender.com/uploads/testimonials/${testimonialData.avtar}`;
        }
        return testimonialData;
      });

      res.json(processedTestimonials);
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
      console.log("📝 Creating new testimonial...");
      console.log("Request body:", req.body);
      console.log("Files:", req.files);

      let testimonialData = { ...req.body };
      let avatarFileName = null;

      // Handle file upload if present
      if (req.files && req.files.avtar) {
        const avatarFile = req.files.avtar;
        console.log("Processing avatar file:", avatarFile.name);

        // Create unique filename
        const fileExtension = path.extname(avatarFile.name);
        avatarFileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "testimonials");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Save file
        const filePath = path.join(uploadDir, avatarFileName);
        await avatarFile.mv(filePath);

        testimonialData.avtar = avatarFileName;
        console.log("✅ Avatar uploaded successfully:", avatarFileName);
      }

      // Create testimonial in database
      const testimonial = await this.testimonialModel.create(testimonialData);

      const responseData = testimonial.toJSON();
      if (responseData.avtar) {
        responseData.avtar = `https://osvschool-backend.onrender.com/uploads/testimonials/${responseData.avtar}`;
      }

      console.log(
        "✅ Testimonial created successfully with ID:",
        testimonial.id
      );
      res.status(201).json({
        message: "Testimonial created successfully",
        testimonial: responseData,
      });
    } catch (error) {
      console.error("❌ Error creating testimonial:", error);

      // Clean up uploaded file if testimonial creation failed
      if (req.files && req.files.avtar && avatarFileName) {
        const filePath = path.join(
          process.cwd(),
          "uploads",
          "testimonials",
          avatarFileName
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("🧹 Cleaned up uploaded file due to creation failure");
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
      console.log(`📝 Updating testimonial with ID: ${req.params.id}`);
      console.log("Request body:", req.body);
      console.log("Files:", req.files);

      const testimonial = await this.testimonialModel.findByPk(req.params.id);

      if (!testimonial) {
        console.log("❌ Testimonial not found");
        return res.status(404).json({ error: "Testimonial not found" });
      }

      let updateData = { ...req.body };
      let oldAvatarFileName = testimonial.avtar;

      // Handle file upload if present
      if (req.files && req.files.avtar) {
        const avatarFile = req.files.avtar;
        console.log("Processing new avatar file:", avatarFile.name);

        // Create unique filename
        const fileExtension = path.extname(avatarFile.name);
        const newAvatarFileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "testimonials");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Save new file
        const filePath = path.join(uploadDir, newAvatarFileName);
        await avatarFile.mv(filePath);

        updateData.avtar = newAvatarFileName;
        console.log("✅ New avatar uploaded successfully:", newAvatarFileName);
      }

      // Update testimonial in database
      await testimonial.update(updateData);

      // Delete old avatar file if a new one was uploaded
      if (req.files && req.files.avtar && oldAvatarFileName) {
        const oldFilePath = path.join(
          process.cwd(),
          "uploads",
          "testimonials",
          oldAvatarFileName
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log("🗑️ Deleted old avatar file:", oldAvatarFileName);
        }
      }

      const responseData = testimonial.toJSON();
      if (responseData.avtar) {
        responseData.avtar = `https://osvschool-backend.onrender.com/uploads/testimonials/${responseData.avtar}`;
      }

      console.log("✅ Testimonial updated successfully");
      res.json({
        message: "Testimonial updated successfully",
        testimonial: responseData,
      });
    } catch (error) {
      console.error("❌ Error updating testimonial:", error);
      res.status(500).json({
        error: "Failed to update testimonial",
        details: error.message,
      });
    }
  };

  // Soft delete a testimonial
  deleteTestimonial = async (req, res) => {
    try {
      console.log(`🗑️ Soft deleting testimonial with ID: ${req.params.id}`);

      const testimonial = await this.testimonialModel
        .scope("withDeleted")
        .findByPk(req.params.id);

      if (!testimonial) {
        console.log("❌ Testimonial not found");
        return res.status(404).json({ error: "Testimonial not found" });
      }

      if (testimonial.isDeleted) {
        console.log("⚠️ Testimonial already deleted");
        return res.status(400).json({ error: "Testimonial already deleted" });
      }

      await testimonial.update({ isDeleted: true });

      console.log("✅ Testimonial soft deleted successfully");
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

  // Restore a soft-deleted testimonial
  restoreTestimonial = async (req, res) => {
    try {
      console.log(`♻️ Restoring testimonial with ID: ${req.params.id}`);

      const testimonial = await this.testimonialModel
        .scope("withDeleted")
        .findByPk(req.params.id);

      if (!testimonial) {
        console.log("❌ Testimonial not found");
        return res.status(404).json({ error: "Testimonial not found" });
      }

      if (!testimonial.isDeleted) {
        console.log("⚠️ Testimonial is not deleted");
        return res.status(400).json({ error: "Testimonial is not deleted" });
      }

      await testimonial.update({ isDeleted: false });

      const responseData = testimonial.toJSON();
      if (responseData.avtar) {
        responseData.avtar = `https://osvschool-backend.onrender.com/uploads/testimonials/${responseData.avtar}`;
      }

      console.log("✅ Testimonial restored successfully");
      res.json({
        message: "Testimonial restored successfully",
        testimonial: responseData,
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
