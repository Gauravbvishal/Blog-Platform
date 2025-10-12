const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
      title: String,
      authorName: String,
      blogDate: {
            type: String,
            required: true,
            default: () => new Date().toISOString().split("T")[0] // yyyy-MM-dd
      },
      content: String,
      categories: String
});

module.exports = mongoose.model('blogs', blogSchema);