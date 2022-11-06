const express=require("express");
const connect  = require("./config/db");
const { authentication } = require("./Middleware/authentication");
const { UserModel } = require("./users/user.model");
const dotenv=require("dotenv").config();
const userRouter=require("./users/user.router")
const userPostBlog=require("./postBlog/postblog.router");
const cors=require("cors")

const app=express();
app.use(cors());
app.use(express.json());

app.use("/users",userRouter)
app.use("/blogs",userPostBlog)


app.get("/",async(req,res)=>{

    console.log(req.body);
    const user_id=req.body.user_id;
    const user=await UserModel.find({user_id});
    res.send("Home Page");

})

const PORT=process.env.PORT || 8080;
app.listen(PORT,async()=>{
    try{
     await connect
     console.log("Server connected to database")
    }
    catch(err){
     console.log("Something error")
     console.log(err)
    }
    console.log(`Listen to the PORT number => ${PORT}`)
})