const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    mobile_no:{type:Number},
    user_role:{type:String ,default:"reader",required:true},
    user_id:{type:String}
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}