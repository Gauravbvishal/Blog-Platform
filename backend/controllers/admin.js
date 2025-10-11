const blogs = require('../models/blog')

//delete blog
exports.adminPermission = async (req, res, next) => {
    const id = req.params.id;
    const data = await blogs.deleteOne({ _id: id });
    res.json(data);
}

// edit blog
exports.editBlog =async(req, res, next) => {
    const id = req.params.id;
    const data =await blogs.findById({ _id: id });
    console.log(data);
}



