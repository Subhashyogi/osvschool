import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";
import path from "path";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.js";
import galleryRoutes from "./routes/gallery.js";
import facultyRoutes from "./routes/faculty.js";
import testimonialRoutes from "./routes/testimonials.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB max file size
    },
  })
);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Sync database and start server
const startServer = async () => {
  try {
    await sequelize.sync(); // Sync database
    console.log("Database synchronized successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
