const multer = require("multer");
// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    const thumbnail = Date.now() + "-" + file.originalname;
    cb(null, thumbnail);
  },
});
exports.upload = multer({ storage: storage , limits: { fileSize: 10 * 1024 * 1024 }}); // 10MB max file size);