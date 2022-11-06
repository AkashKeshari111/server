const mongoose  = require("mongoose");
const dotenv=require("dotenv").config();

const connect=mongoose.connect(process.env.MONGO_URL);


module.exports=connect;
