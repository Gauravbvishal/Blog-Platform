const express=require('express');
const router=express.Router();
const adminController=require('../../controllers/admin')


router.use('/blog/delete/:id',adminController.adminPermission);


module.exports=router;