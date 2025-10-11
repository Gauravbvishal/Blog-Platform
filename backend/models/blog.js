const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
      title:String,
      authorName:String,
      blogDate:Date,
      content:String,
      categories:String
});

module.exports=mongoose.model('blogs', blogSchema);