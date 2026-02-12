const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : String,
    email:{
        type : String,
        unique : [true, "this email has already registered user"]
    },
    password : String
})

const userModel =  mongoose.model('users',userSchema)

module.exports = userModel