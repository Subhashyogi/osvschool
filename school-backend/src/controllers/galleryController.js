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

        const uploadDir = path.dirname(uploadPath);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        await file.mv(uploadPath);
        // FIX 1: URL path is now correct and root-relative.
        mediaUrl = `/uploads/gallery/${fileName}`;
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
      const galleries = await this.Gallery.findAll({
        order: [["createdAt", "DESC"]],
      });
      // FIX 2: Removed the hardcoded onrender.com URL logic.
      res.status(200).json(galleries);
    } catch (error) {
      console.error("❌ Error getting galleries:", error);
      res.status(500).json({ message: "Error retrieving galleries", error });
    }
  }

  // RESTORED: This function is now present.
  async getAllGalleriesWithDeleted(req, res) {
    try {
      const galleries = await this.Gallery.scope("withDeleted").findAll();
      res.status(200).json(galleries);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving galleries", error });
    }
  }

  // RESTORED: This function is now present.
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
      const { title, description, mediaType } = req.body;
      const existingGallery = await this.Gallery.findByPk(id);
      if (!existingGallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      let mediaUrl = existingGallery.mediaUrl;
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
        const uploadDir = path.dirname(uploadPath);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        if (existingGallery.mediaUrl) {
          const oldFilePath = path.join(
            process.cwd(),
            existingGallery.mediaUrl.substring(1)
          );
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
        await file.mv(uploadPath);
        mediaUrl = `/uploads/gallery/${fileName}`;
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
