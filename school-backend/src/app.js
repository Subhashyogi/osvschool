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
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

const app = express();

// --- CORRECT CORS CONFIGURATION START ---

const allowedOrigins = [
  "http://localhost:5173", // For your local development
  "https://osvschool.in", // For your live production site
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        // If the origin is in our whitelist, allow it
        return callback(null, true);
      } else {
        // Otherwise, block it
        console.error(`CORS Error: The origin '${origin}' was blocked.`);
        return callback(
          new Error("This origin is not allowed by CORS policy.")
        );
      }
    },
    credentials: true,
  })
);

// --- CORRECT CORS CONFIGURATION END ---

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
} else {
  app.set("trust proxy", false);
}

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

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/testimonials", testimonialRoutes);

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await sequelize.sync();
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.log("Starting server without database connection...");
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (!sequelize.authenticate) {
      console.log("⚠️  Server running in limited mode - database unavailable");
    }
  });
};

startServer();
