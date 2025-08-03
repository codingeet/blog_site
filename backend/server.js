 const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const path = require("path");

dotenv.config();
connectDB();
const app = express();
// Allow requests from frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // if using cookies or authentication
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/blogs", blogRoutes);
// ✅ now add json parsing for other APIs
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
