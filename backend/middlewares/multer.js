const multer = require("multer");
// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    const thumbnailPath = `http://localhost:5000/uploads/${Date.now() + "-" + file.originalname}`;
    cb(null, thumbnailPath);
  },
});
exports.upload = multer({ storage: storage , limits: { fileSize: 10 * 1024 * 1024 }}); // 10MB max file size);