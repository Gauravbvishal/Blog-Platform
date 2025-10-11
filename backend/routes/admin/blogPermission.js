const express=require('express');
const router=express.Router();
const adminController=require('../../controllers/admin')


router.use('/blog/delete/:id',adminController.adminPermission);
router.use('/blog/edit/:id',adminController.editBlog);

module.exports=router;