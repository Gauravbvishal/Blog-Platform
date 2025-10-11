const blogs = require('../models/blog')
exports.createblog = async (req, res, next) => {
    try {
        const { title, authorName, blogDate, content, categories } = req.body;
        const blog = new blogs({ title, authorName, blogDate, content, categories });
        console.log(blog);
        await blog.save();
        res.status(201).json({
            message: "Blog created successfully"
        });
    }
    catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.blogShow = async (req, res, next) => {
    try {
        const data = await blogs.find();
        res.json(data);
        // console.log(data)
    }
    catch (err) {
        console.error(err);
    }
}