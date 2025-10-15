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
    const { category } = req.query; // get category from query string
   
    let data;

    if (category) {
      // ✅ If category is provided, filter by category
      data = await blogs.find({ categories: category });
    } else {
      // ✅ Otherwise, fetch all blogs
      data = await blogs.find();
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching blogs" });
  }
};

exports.showBlog=async(req,res,next)=>{
  const id=req.params.id;
  const data=await blogs.findOne({_id:id});
  res.json(data);
}
