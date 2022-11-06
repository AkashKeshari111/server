const mongoose = require("mongoose");


const postBlogSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    user_id:{type:String,required:true},
 
},{
    timestamps:true
})
const PostBlogModel=mongoose.model("postblog",postBlogSchema)

module.exports={PostBlogModel}