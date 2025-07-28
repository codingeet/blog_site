const Blog = require("../models/Blog");

// @desc    Get all blogs
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

// @desc    Create a blog
exports.createBlog = async (req, res) => {
  const { title, content, author } = req.body;
  const blog = new Blog({ title, content, author });
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
};

// @desc    Get single blog by ID
exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) res.json(blog);
  else res.status(404).json({ message: "Blog not found" });
};
