const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower : {
        type : mongoose.Schema.types.objectId,
        ref : "users",
        required : [true, "followers is required"]
    },
    followee : {
        type : mongoose.Schema.types.objectId,
        ref : "users",
        required: [true, "followee is required"]
    }
})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel