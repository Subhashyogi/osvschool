import path from "path";
import fs from "fs";

class GalleryController {
  constructor(Gallery) {
    this.Gallery = Gallery;
  }

  async createGallery(req, res) {
    try {
      const { title, description, mediaType } = req.body;
      let mediaUrl = "";

      // Handle file upload if present
      if (req.files && req.files.file) {
        const file = req.files.file;
        const fileExtension = path.extname(file.name);
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}${fileExtension}`;
        const uploadPath = path.join(
          process.cwd(),
          "uploads",
          "gallery",
          fileName
        );

        // Ensure upload directory exists
        const uploadDir = path.dirname(uploadPath);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Move the file
        await file.mv(uploadPath);
        mediaUrl = `uploads/gallery/${fileName}`;
      }

      const newGallery = await this.Gallery.create({
        title,
        description,
        mediaUrl,
        mediaType,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json(newGallery);
    } catch (error) {
      console.error("Error creating gallery entry:", error);
      res.status(500).json({
        message: "Error creating gallery entry",
        error: error.message,
      });
    }
  }

  async getAllGalleries(req, res) {
    try {
      // By default, this will only return non-deleted galleries due to defaultScope
      const galleries = await this.Gallery.findAll({
        order: [["createdAt", "DESC"]], // Show newest first
      });

      // Process galleries to include full media URLs
      const processedGalleries = galleries.map((gallery) => {
        const galleryData = gallery.toJSON();
        if (galleryData.mediaUrl) {
          // Add full URL if it's just a relative path
          if (!galleryData.mediaUrl.startsWith("http")) {
            galleryData.mediaUrl = `https://osvschool-backend.onrender.com/${galleryData.mediaUrl}`;
          }
        }
        return galleryData;
      });

      res.status(200).json(processedGalleries);
    } catch (error) {
      console.error("❌ Error getting galleries:", error);
      res.status(500).json({ message: "Error retrieving galleries", error });
    }
  }

  async getAllGalleriesWithDeleted(req, res) {
    try {
      // Get all galleries including deleted ones
      const galleries = await this.Gallery.scope("withDeleted").findAll();
      res.status(200).json(galleries);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving galleries", error });
    }
  }

  async getDeletedGalleries(req, res) {
    try {
      // Get only deleted galleries
      const galleries = await this.Gallery.scope("deletedOnly").findAll();
      res.status(200).json(galleries);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving deleted galleries", error });
    }
  }

  async getGalleryById(req, res) {
    try {
      console.log(`📋 Getting gallery with ID: ${req.params.id}`);

      const { id } = req.params;
      const gallery = await this.Gallery.findByPk(id);

      if (!gallery) {
        console.log("❌ Gallery not found");
        return res.status(404).json({ message: "Gallery not found" });
      }

      const galleryData = gallery.toJSON();
      if (galleryData.mediaUrl && !galleryData.mediaUrl.startsWith("http")) {
        galleryData.mediaUrl = `https://osvschool-backend.onrender.com/${galleryData.mediaUrl}`;
      }

      console.log("✅ Successfully retrieved gallery");
      res.status(200).json(galleryData);
    } catch (error) {
      console.error("❌ Error getting gallery:", error);
      res.status(500).json({ message: "Error retrieving gallery", error });
    }
  }

  async updateGallery(req, res) {
    try {
      const { id } = req.params;
      const { title, description, mediaType } = req.body;

      // Get existing gallery item
      const existingGallery = await this.Gallery.findByPk(id);
      if (!existingGallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }

      let mediaUrl = existingGallery.mediaUrl; // Keep existing media URL by default

      // Handle file upload if present (optional for updates)
      if (req.files && req.files.file) {
        const file = req.files.file;
        const fileExtension = path.extname(file.name);
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}${fileExtension}`;
        const uploadPath = path.join(
          process.cwd(),
          "uploads",
          "gallery",
          fileName
        );

        // Ensure upload directory exists
        const uploadDir = path.dirname(uploadPath);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Delete old file if it exists
        if (existingGallery.mediaUrl) {
          const oldFilePath = path.join(
            process.cwd(),
            existingGallery.mediaUrl
          );
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }

        // Move the new file
        await file.mv(uploadPath);
        mediaUrl = `uploads/gallery/${fileName}`;
      }

      const [updated] = await this.Gallery.update(
        { title, description, mediaUrl, mediaType, updatedAt: new Date() },
        { where: { id, isDeleted: false } }
      );
      if (!updated) {
        return res
          .status(404)
          .json({ message: "Gallery not found or already deleted" });
      }
      const updatedGallery = await this.Gallery.findByPk(id);
      res.status(200).json(updatedGallery);
    } catch (error) {
      console.error("Error updating gallery:", error);
      res
        .status(500)
        .json({ message: "Error updating gallery", error: error.message });
    }
  }

  async deleteGallery(req, res) {
    try {
      const { id } = req.params;
      // Soft delete: set isDeleted to true instead of destroying
      const [updated] = await this.Gallery.update(
        { isDeleted: true, updatedAt: new Date() },
        { where: { id, isDeleted: false } }
      );
      if (!updated) {
        return res
          .status(404)
          .json({ message: "Gallery not found or already deleted" });
      }
      res.status(200).json({ message: "Gallery soft deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting gallery", error });
    }
  }

  async restoreGallery(req, res) {
    try {
      const { id } = req.params;
      // Restore deleted gallery
      const [updated] = await this.Gallery.update(
        { isDeleted: false, updatedAt: new Date() },
        { where: { id, isDeleted: true } }
      );
      if (!updated) {
        return res
          .status(404)
          .json({ message: "Gallery not found or not deleted" });
      }
      const restoredGallery = await this.Gallery.findByPk(id);
      res.status(200).json({
        message: "Gallery restored successfully",
        gallery: restoredGallery,
      });
    } catch (error) {
      res.status(500).json({ message: "Error restoring gallery", error });
    }
  }

  async permanentDeleteGallery(req, res) {
    try {
      const { id } = req.params;
      // Permanently delete from database
      const deleted = await this.Gallery.scope("withDeleted").destroy({
        where: { id },
      });
      if (!deleted) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error permanently deleting gallery", error });
    }
  }
}

export default GalleryController;
