const dotenv=require("dotenv").config()
const jwt = require('jsonwebtoken');
const { UserModel } = require("../users/user.model");


const authorization = (permitted_role) => {
    return async (req, res, next) => 
    {
    const {user_id}= req.body;
   
    const user = await UserModel.findOne({_id:user_id})
    // console.log(user)
    const role = user.user_role;
    // console.log(role)
        if(permitted_role.includes(role)){
            next()
        }
        else{
            res.send("Denied Permission")
        }
    }
}

module.exports={authorization}