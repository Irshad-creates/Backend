const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    username :{
        type : String,
        unique : [ true, "username already exist"],
        required : [true, "username is required"]
    },
    email :{
        type :String,
        unique : [true ,"email already exist"],
        required :[true, "email is required"]
    },
    password:{
        type :String,
        required :[true, "password is required"]
    },
    bio :String,
    profileImage :{
        type : "string",
        default :"https://ik.imagekit.io/irshadAssets/default-avatar-profile-icon-of-social-media-user-vector.webp"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel