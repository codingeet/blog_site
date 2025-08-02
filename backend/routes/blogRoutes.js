const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlogById,
} = require("../controllers/blogController");

router.route("/").get(getBlogs).post(upload.single("thumbnail"), createBlog);
router.route("/:id").get(getBlogById);

module.exports = router;
