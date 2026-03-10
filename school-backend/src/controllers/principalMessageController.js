import path from "path";
import fs from "fs";

class PrincipalMessageController {
  constructor(PrincipalMessageModel) {
    this.PrincipalMessage = PrincipalMessageModel;
  }

  // Public: Get the current principal message
  async get(req, res) {
    try {
      const message = await this.PrincipalMessage.findOne({
        order: [["updatedAt", "DESC"]],
      });

      if (!message) {
        return res.status(404).json({ message: "No principal message found" });
      }

      res.status(200).json(message);
    } catch (error) {
      console.error("Error fetching principal message:", error);
      res.status(500).json({
        message: "Error fetching principal message",
        error: error.message,
      });
    }
  }

  // Admin: Create or update principal message (upsert - only one record)
  async upsert(req, res) {
    try {
      const { name, title, welcomeMessage } = req.body;

      if (!name || !welcomeMessage) {
        return res
          .status(400)
          .json({ message: "Name and welcome message are required" });
      }

      let imageUrl = null;

      // Handle image upload
      if (req.files && req.files.image) {
        const file = req.files.image;
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
        ];

        if (!allowedTypes.includes(file.mimetype)) {
          return res.status(400).json({
            message:
              "Invalid image type. Only JPEG, PNG, GIF, and WEBP are allowed.",
          });
        }

        if (file.size > 5 * 1024 * 1024) {
          return res
            .status(400)
            .json({ message: "Image size must be less than 5MB" });
        }

        const fileExtension = path.extname(file.name);
        const fileName = `principal_${Date.now()}${fileExtension}`;
        const uploadDir = path.join(process.cwd(), "uploads", "principal");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const uploadPath = path.join(uploadDir, fileName);
        await file.mv(uploadPath);
        imageUrl = `/uploads/principal/${fileName}`;
      }

      // Check if a record already exists
      const existing = await this.PrincipalMessage.findOne();

      if (existing) {
        // Delete old image if a new one is uploaded
        if (imageUrl && existing.imageUrl) {
          const oldFilePath = path.join(
            process.cwd(),
            existing.imageUrl.substring(1)
          );
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }

        await existing.update({
          name,
          title: title || null,
          welcomeMessage,
          ...(imageUrl && { imageUrl }),
          updatedAt: new Date(),
        });

        const updated = await this.PrincipalMessage.findByPk(existing.id);
        return res.status(200).json(updated);
      } else {
        // Create new
        const newMsg = await this.PrincipalMessage.create({
          name,
          title: title || null,
          welcomeMessage,
          imageUrl: imageUrl || null,
        });

        return res.status(201).json(newMsg);
      }
    } catch (error) {
      console.error("Error saving principal message:", error);
      res.status(500).json({
        message: "Error saving principal message",
        error: error.message,
      });
    }
  }
}

export default PrincipalMessageController;
