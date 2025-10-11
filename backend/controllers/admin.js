 
const blogs = require('../models/blog')
exports.adminPermission = async (req, res, next) => {
    const id = req.params.id;
    const data = await blogs.deleteOne({_id:id });
    res.json(data);
}
 


