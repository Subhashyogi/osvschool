import { Op } from "sequelize";

class FacultyController {
  constructor(FacultyModel) {
    this.FacultyModel = FacultyModel;
  }

  // GET /api/faculty - Get all active faculty members
  async getAllFaculty(req, res) {
    try {
      const { page = 1, limit = 10, search, department } = req.query;
      const offset = (page - 1) * limit;

      // Build where conditions
      const whereConditions = {
        isDeleted: false,
      };

      if (search) {
        whereConditions[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } },
          { department: { [Op.like]: `%${search}%` } },
        ];
      }

      if (department) {
        whereConditions.department = { [Op.like]: `%${department}%` };
      }

      // console.log(
      //   "Final where conditions:",
      //   JSON.stringify(whereConditions, null, 2)
      // );

      const { count, rows } = await this.FacultyModel.findAndCountAll({
        where: whereConditions,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["created_at", "DESC"]],
      });

      res.status(200).json({
        message: "Faculty members retrieved successfully",
        data: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit),
        },
      });
    } catch (error) {
      console.error("Error fetching faculty members:", error);
      res.status(500).json({
        message: "Error retrieving faculty members",
        error: error.message,
      });
    }
  }

  // GET /api/faculty/:id - Get a specific faculty member
  async getFacultyById(req, res) {
    try {
      const { id } = req.params;

      const faculty = await this.FacultyModel.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });

      if (!faculty) {
        return res.status(404).json({
          message: "Faculty member not found",
        });
      }

      res.status(200).json({
        message: "Faculty member retrieved successfully",
        data: faculty,
      });
    } catch (error) {
      console.error("Error fetching faculty member:", error);
      res.status(500).json({
        message: "Error retrieving faculty member",
        error: error.message,
      });
    }
  }

  // POST /api/faculty - Create a new faculty member
  async createFaculty(req, res) {
    try {
      const { name, title, department } = req.body;
      let imagePath = null;

      // Handle file upload
      if (req.files && req.files.image) {
        const imageFile = req.files.image;
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
        ];

        if (!allowedTypes.includes(imageFile.mimetype)) {
          return res.status(400).json({
            message:
              "Invalid file type. Only JPEG, PNG, and GIF images are allowed.",
          });
        }

        // Create unique filename
        const fileExtension = imageFile.name.split(".").pop();
        const uniqueFilename = `faculty_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}.${fileExtension}`;

        // Ensure uploads directory exists
        const uploadDir = "uploads/faculty";
        const fs = await import("fs");
        const path = await import("path");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Move file to uploads directory
        const filePath = path.join(uploadDir, uniqueFilename);
        await imageFile.mv(filePath);

        imagePath = `/uploads/faculty/${uniqueFilename}`;
      }

      // Check if faculty member with same name already exists
      const existingFaculty = await this.FacultyModel.findOne({
        where: {
          name: name,
          isDeleted: false,
        },
      });

      if (existingFaculty) {
        return res.status(409).json({
          message: "Faculty member with this name already exists",
        });
      }

      const faculty = await this.FacultyModel.create({
        name,
        title,
        department,
        image: imagePath,
        isDeleted: false,
      });

      res.status(201).json({
        message: "Faculty member created successfully",
        data: faculty,
      });
    } catch (error) {
      console.error("Error creating faculty member:", error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors.map((err) => ({
            field: err.path,
            message: err.message,
          })),
        });
      }
      res.status(500).json({
        message: "Error creating faculty member",
        error: error.message,
      });
    }
  }

  // PUT /api/faculty/:id - Update a faculty member
  async updateFaculty(req, res) {
    try {
      const { id } = req.params;
      const { name, title, department } = req.body;
      let imagePath = null;

      const faculty = await this.FacultyModel.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });

      if (!faculty) {
        return res.status(404).json({
          message: "Faculty member not found",
        });
      }

      // Handle file upload
      if (req.files && req.files.image) {
        const imageFile = req.files.image;
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
        ];

        if (!allowedTypes.includes(imageFile.mimetype)) {
          return res.status(400).json({
            message:
              "Invalid file type. Only JPEG, PNG, and GIF images are allowed.",
          });
        }

        // Delete old image if exists
        if (faculty.image) {
          const fs = await import("fs");
          const path = await import("path");
          const oldImagePath = path.join(
            process.cwd(),
            faculty.image.replace("/", path.sep)
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        // Create unique filename
        const fileExtension = imageFile.name.split(".").pop();
        const uniqueFilename = `faculty_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}.${fileExtension}`;

        // Ensure uploads directory exists
        const uploadDir = "uploads/faculty";
        const fs = await import("fs");
        const path = await import("path");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Move file to uploads directory
        const filePath = path.join(uploadDir, uniqueFilename);
        await imageFile.mv(filePath);

        imagePath = `/uploads/faculty/${uniqueFilename}`;
      }

      // Check if another faculty member with same name exists (excluding current one)
      if (name && name !== faculty.name) {
        const existingFaculty = await this.FacultyModel.findOne({
          where: {
            name: name,
            id: { [Op.ne]: id },
            isDeleted: false,
          },
        });

        if (existingFaculty) {
          return res.status(409).json({
            message: "Faculty member with this name already exists",
          });
        }
      }

      const updatedFaculty = await faculty.update({
        name: name || faculty.name,
        title: title !== undefined ? title : faculty.title,
        department: department !== undefined ? department : faculty.department,
        image: imagePath !== null ? imagePath : faculty.image,
      });

      res.status(200).json({
        message: "Faculty member updated successfully",
        data: updatedFaculty,
      });
    } catch (error) {
      console.error("Error updating faculty member:", error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors.map((err) => ({
            field: err.path,
            message: err.message,
          })),
        });
      }
      res.status(500).json({
        message: "Error updating faculty member",
        error: error.message,
      });
    }
  }

  // DELETE /api/faculty/:id - Soft delete a faculty member
  async deleteFaculty(req, res) {
    try {
      const { id } = req.params;

      const faculty = await this.FacultyModel.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });

      if (!faculty) {
        return res.status(404).json({
          message: "Faculty member not found",
        });
      }

      // Note: We don't delete the image file for soft delete
      // so it can be restored if needed. Image will be deleted on hard delete.

      // Soft delete - update isDeleted to true
      await faculty.update({
        isDeleted: true,
      });

      res.status(200).json({
        message: "Faculty member deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting faculty member:", error);
      res.status(500).json({
        message: "Error deleting faculty member",
        error: error.message,
      });
    }
  }

  // PUT /api/faculty/:id/restore - Restore a soft-deleted faculty member
  async restoreFaculty(req, res) {
    try {
      const { id } = req.params;

      const faculty = await this.FacultyModel.scope("onlyDeleted").findOne({
        where: {
          id: id,
        },
      });

      if (!faculty) {
        return res.status(404).json({
          message: "Deleted faculty member not found",
        });
      }

      // Restore - update isDeleted to false
      await faculty.update({
        isDeleted: false,
      });

      res.status(200).json({
        message: "Faculty member restored successfully",
        data: faculty,
      });
    } catch (error) {
      console.error("Error restoring faculty member:", error);
      res.status(500).json({
        message: "Error restoring faculty member",
        error: error.message,
      });
    }
  }

  // GET /api/faculty/departments - Get all unique departments
  async getDepartments(req, res) {
    try {
      const departments = await this.FacultyModel.findAll({
        attributes: ["department"],
        where: {
          isDeleted: false,
          department: { [Op.ne]: null },
        },
        group: ["department"],
        order: [["department", "ASC"]],
      });

      const departmentList = departments
        .map((d) => d.department)
        .filter((dept) => dept && dept.trim() !== "");

      res.status(200).json({
        message: "Departments retrieved successfully",
        data: departmentList,
      });
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({
        message: "Error retrieving departments",
        error: error.message,
      });
    }
  }
}

export default FacultyController;
