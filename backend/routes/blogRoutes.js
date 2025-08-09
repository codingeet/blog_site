const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlogById,
} = require("../controllers/blogController");
const { upload } = require("../middlewares/multer.js");
const protect = require("../middlewares/protect.js");

router.route("/").get(getBlogs).post(protect, upload.single("image"), createBlog);
router.route("/:id").get(getBlogById);

module.exports = router;
