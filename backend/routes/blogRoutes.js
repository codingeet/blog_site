const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlogById,
} = require("../controllers/blogController");
const { upload } = require("../middlewares/multer.js");

router.route("/").get(getBlogs).post(upload.single("image"), createBlog);
router.route("/:id").get(getBlogById);

module.exports = router;
