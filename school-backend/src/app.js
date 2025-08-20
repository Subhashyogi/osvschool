// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import rateLimit from "express-rate-limit";
// import fileUpload from "express-fileupload";
// import path from "path";
// import { sequelize } from "./models/index.js";
// import authRoutes from "./routes/auth.js";
// import galleryRoutes from "./routes/gallery.js";
// import facultyRoutes from "./routes/faculty.js";
// import testimonialRoutes from "./routes/testimonials.js";
// import dotenv from "dotenv";
// dotenv.config({ quiet: true });

// console.log("MYSQL_USERNAME: ", process.env.MYSQL_USERNAME);
// console.log("MYSQL_PASSWORD: ", process.env.MYSQL_PASSWORD);
// console.log("MYSQL_HOST: ", process.env.MYSQL_HOST);
// console.log("MYSQL_DATABASE: ", process.env.MYSQL_DATABASE);
// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://osvschool.netlify.app", // replace with your real Netlify URL
//   "http://osvschool.in/",
//   "https://osvschool.in/",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like curl, Postman)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         console.error("Blocked by CORS:", origin);
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );
// app.options(
//   "*",
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.set("trust proxy", true);

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   fileUpload({
//     createParentPath: true,
//     limits: {
//       fileSize: 50 * 1024 * 1024, // 50MB max file size
//     },
//   })
// );

// // Serve static files from uploads directory
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );

// // Health check endpoint
// app.get("/", (req, res) => {
//   res.json({
//     status: "Server is running",
//     timestamp: new Date().toISOString(),
//   });
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/gallery", galleryRoutes);
// app.use("/api/faculty", facultyRoutes);
// app.use("/api/testimonials", testimonialRoutes);

// // Sync database and start server
// const startServer = async () => {
//   const PORT = process.env.PORT || 5000;

//   try {
//     await sequelize.sync(); // Sync database
//     console.log("Database synchronized successfully");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//     console.log("Starting server without database connection...");
//   }

//   // Start server regardless of database connection
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     if (!sequelize.authenticate) {
//       console.log("⚠️  Server running in limited mode - database unavailable");
//     }
//   });
// };

// startServer();

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

console.log("MYSQL_USERNAME: ", process.env.MYSQL_USERNAME);
console.log("MYSQL_PASSWORD: ", process.env.MYSQL_PASSWORD);
console.log("MYSQL_HOST: ", process.env.MYSQL_HOST);
console.log("MYSQL_DATABASE: ", process.env.MYSQL_DATABASE);

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://osvschool.netlify.app", // legacy preview URL
  "https://osvschool.in",
  "https://www.osvschool.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Trust proxy only in production (behind Nginx); disable in local dev to satisfy express-rate-limit
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

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Sync database and start server
const startServer = async () => {
  const PORT = process.env.PORT || 5000;

  try {
    await sequelize.sync(); // Sync database
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.log("Starting server without database connection...");
  }

  // Start server regardless of database connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (!sequelize.authenticate) {
      console.log("⚠️  Server running in limited mode - database unavailable");
    }
  });
};

startServer();
