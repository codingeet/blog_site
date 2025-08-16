const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes.js");
const authRoutes = require('./routes/authRoutes.js');
const path = require("path");
const cookieParser = require("cookie-parser");

connectDB();
const app = express();
// Allow requests from frontend

// 1️⃣ CORS first
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
// 2️⃣ Parse JSON & URL-encoded (for regular requests)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3️⃣ Static files (images, uploads, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 4️⃣ Routes
app.use("/api/auth", authRoutes); // JSON-based
app.use("/api/blogs", blogRoutes); // multer will handle FormData inside this route

// 5️⃣ Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
