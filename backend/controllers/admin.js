const blogs = require('../models/blog');

// Delete blog
exports.adminPermission = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await blogs.deleteOne({ _id: id });
    res.json({ message: 'Blog deleted successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete blog', error: err.message });
  }
};

// Get blog by ID (for editing)
exports.editBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await blogs.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch blog', error: err.message });
  }
};

// Update blog
exports.editBlogs = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedBlog = await blogs.findByIdAndUpdate(id, data, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update blog', error: err.message });
  }
};
