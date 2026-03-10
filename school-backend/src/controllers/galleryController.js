import path from "path";
import fs from "fs";

class GalleryController {
  constructor(Gallery) {
    this.Gallery = Gallery;
  }

  /**
   * Handles the bulk upload of media files (images and videos).
   */
  async uploadMedia(req, res) {
    try {
      // Check if files were uploaded
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No files were uploaded." });
      }

      // 'files' can be a single file object or an array of file objects.
      // Ensure we are always working with an array.
      const files = Array.isArray(req.files.files)
        ? req.files.files
        : [req.files.files];

      const mediaToCreate = [];

      for (const file of files) {
        // Determine media type from MIME type
        let mediaType;
        if (file.mimetype.startsWith("image/")) {
          mediaType = "image";
        } else if (file.mimetype.startsWith("video/")) {
          mediaType = "video";
        } else {
          // Skip unsupported file types
          console.warn(
            `Unsupported file type skipped: ${file.name} (${file.mimetype})`
          );
          continue;
        }

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

        const uploadDir = path.dirname(uploadPath);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Move the file to the target directory
        await file.mv(uploadPath);

        const mediaUrl = `/uploads/gallery/${fileName}`;

        // Add the new media's data to our array
        mediaToCreate.push({
          mediaUrl,
          mediaType,
        });
      }

      // Perform a bulk create operation with all the new media data
      const newGalleryEntries = await this.Gallery.bulkCreate(mediaToCreate);

      res.status(201).json({
        message: "Media uploaded successfully!",
        data: newGalleryEntries,
      });
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
      const galleries = await this.Gallery.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(galleries);
    } catch (error) {
      console.error("❌ Error getting galleries:", error);
      res.status(500).json({ message: "Error retrieving galleries", error });
    }
  }

  async getAllGalleriesWithDeleted(req, res) {
    try {
      const galleries = await this.Gallery.scope("withDeleted").findAll();
      res.status(200).json(galleries);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving galleries", error });
    }
  }

  async getDeletedGalleries(req, res) {
    try {
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
      const { id } = req.params;
      const gallery = await this.Gallery.findByPk(id);

      if (!gallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      res.status(200).json(gallery);
    } catch (error) {
      console.error("❌ Error getting gallery:", error);
      res.status(500).json({ message: "Error retrieving gallery", error });
    }
  }

  async updateGallery(req, res) {
    try {
      const { id } = req.params;
      const existingGallery = await this.Gallery.findByPk(id);
      if (!existingGallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }

      let mediaUrl = existingGallery.mediaUrl;
      let mediaType = existingGallery.mediaType; // Keep existing mediaType unless a new file is uploaded

      if (req.files && req.files.file) {
        const file = req.files.file;

        // Determine new mediaType
        if (file.mimetype.startsWith("image/")) {
          mediaType = "image";
        } else if (file.mimetype.startsWith("video/")) {
          mediaType = "video";
        } else {
          return res
            .status(400)
            .json({ message: `Unsupported file type: ${file.mimetype}` });
        }

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

        // Ensure directory exists
        const uploadDir = path.dirname(uploadPath);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Delete the old file if it exists
        if (existingGallery.mediaUrl) {
          const oldFilePath = path.join(
            process.cwd(),
            existingGallery.mediaUrl.substring(1)
          );
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }

        // Save the new file
        await file.mv(uploadPath);
        mediaUrl = `/uploads/gallery/${fileName}`;
      }

      const [updated] = await this.Gallery.update(
        { mediaUrl, mediaType, updatedAt: new Date() },
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
      const galleryItem = await this.Gallery.scope("withDeleted").findOne({
        where: { id },
      });

      if (!galleryItem) {
        return res.status(404).json({ message: "Gallery not found" });
      }

      // Delete the associated file from the server
      if (galleryItem.mediaUrl) {
        const filePath = path.join(
          process.cwd(),
          galleryItem.mediaUrl.substring(1)
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // Delete the record from the database
      await galleryItem.destroy();

      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error permanently deleting gallery", error });
    }
  }
}

export default GalleryController;
