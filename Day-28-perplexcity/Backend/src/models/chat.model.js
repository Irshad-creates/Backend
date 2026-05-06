import mongoose from 'mongoose'

const chatSchema =  new mongoose.Schema({
        user:{
            type:String,
            ref:"users",
            required:true
        },
        title:{
            type:String,
            required:true,
            default: 'New Chat',
            trim:true
        }
    },{ timestamps:true }
)

const chatModel = mongoose.model("chats", chatSchema)

export default chatModel