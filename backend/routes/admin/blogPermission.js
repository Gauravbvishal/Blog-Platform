const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin');

// Delete a blog
router.delete('/blog/delete/:id', adminController.adminPermission);

// Get a blog by ID (for editing)
router.get('/blog/edit/:id', adminController.editBlog);

// Update a blog
router.put('/blog/edit/:id', adminController.editBlogs);

module.exports = router;
