const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlogById,
} = require("../controllers/blogController");

router.route("/").get(getBlogs).post(createBlog);
router.route("/:id").get(getBlogById);

module.exports = router;
