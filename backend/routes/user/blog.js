const express=require('express');
const router=express.Router();
const blogController=require('../../controllers/blogController')


router.post('/blog',blogController.createblog)
router.get('/blogshow',blogController.blogShow)
router.get('/show/:id',blogController.showBlog);


module.exports=router;